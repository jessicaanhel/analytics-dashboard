import os

from flask import Blueprint

from data import mock_data
from services import telegram_links
from services.auth import current_user_id, login_required
from services.response import combine_sources, data_response

settings_bp = Blueprint("settings", __name__)


@settings_bp.route("/api/settings/connections")
@login_required
def connections():
    telegram_status = telegram_links.get_link_status(current_user_id())
    entries = list(mock_data.SETTINGS_CONNECTIONS) + [
        {
            "name": "Telegram",
            "type": "Alerts bot",
            "status": "connected" if telegram_status["linked"] else "not_connected",
        }
    ]
    sources = ["mock"] * len(mock_data.SETTINGS_CONNECTIONS) + ["live"]
    return data_response(entries, combine_sources(sources))


@settings_bp.route("/api/settings/telegram/link-code", methods=["POST"])
@login_required
def telegram_link_code():
    code, expires_at = telegram_links.generate_link_code(current_user_id())
    bot_username = os.getenv("TELEGRAM_BOT_USERNAME", "AngelCoin_Bot")
    return data_response(
        {"code": code, "expires_at": expires_at, "bot_username": bot_username}, "live"
    )


@settings_bp.route("/api/settings/telegram/status")
@login_required
def telegram_status():
    return data_response(telegram_links.get_link_status(current_user_id()), "live")
