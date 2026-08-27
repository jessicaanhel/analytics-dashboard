from flask import Blueprint, jsonify

from data import mock_data

settings_bp = Blueprint("settings", __name__)


@settings_bp.route("/api/settings/connections")
def connections():
    return jsonify(mock_data.SETTINGS_CONNECTIONS)
