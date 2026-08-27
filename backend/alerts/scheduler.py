import os
from datetime import datetime, timedelta, timezone

import dotenv
from apscheduler.schedulers.background import BackgroundScheduler

from alerts.send_telegram_message import send_telegram_message
from alerts.telegram_listener import poll_telegram_updates
from services import alerts_store, telegram_links
from services.live_data import get_crypto_markets

dotenv.load_dotenv()

NOTIFY_COOLDOWN = timedelta(hours=1)
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")


def evaluate_alerts():
    markets, _source = get_crypto_markets()
    prices = {m["symbol"]: m["price"] for m in markets if "price" in m}

    for alert in alerts_store.list_all_armed_alerts():
        price = prices.get(alert["asset"])
        if price is None:
            continue

        is_triggered = (
            price > alert["threshold"]
            if alert["operator"] == "above"
            else price < alert["threshold"]
        )
        should_notify = is_triggered and not alert["last_triggered_state"]

        if should_notify and alert["last_notified_at"]:
            last = datetime.fromisoformat(alert["last_notified_at"]).replace(tzinfo=timezone.utc)
            should_notify = datetime.now(timezone.utc) - last >= NOTIFY_COOLDOWN

        if should_notify:
            chat_id = telegram_links.get_chat_id(alert["user_id"])
            if chat_id and BOT_TOKEN:
                message = f"{alert['asset']} is now {alert['operator']} {alert['threshold']}"
                send_telegram_message(message, BOT_TOKEN, chat_id)
                alerts_store.mark_notified(alert["id"])

        alerts_store.update_triggered_state(alert["id"], is_triggered)


def _run_safely(app, fn):
    with app.app_context():
        try:
            fn()
        except Exception:
            app.logger.exception("scheduled job failed: %s", fn.__name__)


def start_scheduler(app):
    # Flask's debug reloader spawns a watchdog process that also imports app.py;
    # only the actual worker process should run background jobs.
    if app.debug and os.environ.get("WERKZEUG_RUN_MAIN") != "true":
        return None

    scheduler = BackgroundScheduler(daemon=True)
    scheduler.add_job(
        lambda: _run_safely(app, evaluate_alerts), "interval", seconds=60, id="evaluate_alerts"
    )
    scheduler.add_job(
        lambda: _run_safely(app, poll_telegram_updates),
        "interval",
        seconds=10,
        id="poll_telegram",
    )
    scheduler.start()
    return scheduler
