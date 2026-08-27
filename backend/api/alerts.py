from flask import Blueprint, request

from services import alerts_store
from services.auth import current_user_id, login_required
from services.live_data import COINGECKO_IDS
from services.response import data_response

alerts_bp = Blueprint("alerts", __name__)


def _format_condition(asset, operator, threshold):
    word = "above" if operator == "above" else "below"
    return f"{asset} price {word} ${threshold:,.2f}".rstrip("0").rstrip(".")


def _serialize(row):
    return {
        "id": row["id"],
        "asset": row["asset"],
        "operator": row["operator"],
        "threshold": row["threshold"],
        "condition": _format_condition(row["asset"], row["operator"], row["threshold"]),
        "armed": bool(row["armed"]),
    }


@alerts_bp.route("/api/alerts")
@login_required
def list_alerts():
    rows = alerts_store.list_alerts(current_user_id())
    return data_response([_serialize(r) for r in rows], "live")


@alerts_bp.route("/api/alerts", methods=["POST"])
@login_required
def create_alert():
    body = request.get_json(silent=True) or {}
    asset = body.get("asset")
    operator = body.get("operator")
    threshold = body.get("threshold")
    if asset not in COINGECKO_IDS or operator not in ("above", "below"):
        return {"error": "invalid asset or operator"}, 400
    try:
        threshold = float(threshold)
    except (TypeError, ValueError):
        return {"error": "invalid threshold"}, 400
    row = alerts_store.create_alert(current_user_id(), asset, operator, threshold)
    return data_response(_serialize(row), "live"), 201


@alerts_bp.route("/api/alerts/<int:alert_id>/toggle", methods=["POST"])
@login_required
def toggle(alert_id):
    row = alerts_store.toggle_alert(current_user_id(), alert_id)
    if not row:
        return {"error": "not found"}, 404
    return data_response(_serialize(row), "live")
