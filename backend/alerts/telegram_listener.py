import os

import dotenv
import requests

from services import telegram_links

dotenv.load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"

_last_update_id = 0


def poll_telegram_updates():
    global _last_update_id
    if not BOT_TOKEN:
        return
    resp = requests.get(
        f"{API_BASE}/getUpdates",
        params={"offset": _last_update_id + 1, "timeout": 0},
        timeout=10,
    )
    resp.raise_for_status()
    for update in resp.json().get("result", []):
        _last_update_id = update["update_id"]
        message = update.get("message") or {}
        text = (message.get("text") or "").strip()
        chat_id = message.get("chat", {}).get("id")
        if not chat_id or not text:
            continue
        code = text.split()[-1] if text.startswith("/start") else text
        telegram_links.consume_link_code(code, chat_id)
