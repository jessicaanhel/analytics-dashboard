from flask import Blueprint, jsonify

from data import mock_data
from services import live_data

smart_money_bp = Blueprint("smart_money", __name__, url_prefix="/api/smart-money")


@smart_money_bp.route("/institutional")
def institutional():
    return jsonify(mock_data.INSTITUTIONAL_FLOWS)


@smart_money_bp.route("/whale-transfers")
def whale_transfers():
    return jsonify(
        {
            "threshold_usd": mock_data.WHALE_ALERT_THRESHOLD_USD,
            "transfers": mock_data.WHALE_TRANSFERS,
        }
    )


@smart_money_bp.route("/exchange-flows")
def exchange_flows():
    return jsonify(mock_data.EXCHANGE_FLOWS)


@smart_money_bp.route("/futures")
def futures():
    return jsonify(live_data.get_futures())


@smart_money_bp.route("/etf-flows")
def etf_flows():
    return jsonify(mock_data.ETF_FLOWS)
