from flask import Blueprint, jsonify

from data import mock_data

watchlist_bp = Blueprint("watchlist", __name__)


@watchlist_bp.route("/api/watchlist")
def watchlist():
    return jsonify(mock_data.WATCHLIST)


@watchlist_bp.route("/api/watchlist/<int:item_id>/toggle", methods=["POST"])
def toggle(item_id):
    for item in mock_data.WATCHLIST:
        if item["id"] == item_id:
            item["armed"] = not item["armed"]
            return jsonify(item)
    return jsonify({"error": "not found"}), 404
