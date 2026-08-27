import datetime

from flask import Blueprint, jsonify

from data import mock_data
from services import live_data
from services.prices import get_btc_eth_prices

crypto_bp = Blueprint("crypto", __name__)


@crypto_bp.route("/api/crypto/markets")
def markets():
    return jsonify(live_data.get_crypto_markets())


@crypto_bp.route("/api/blackrock")
def blackrock_holdings():
    btc_price, eth_price = get_btc_eth_prices()

    btc_holdings = mock_data.INSTITUTIONS["blackrock"]["btc_holdings"]
    eth_holdings = mock_data.INSTITUTIONS["blackrock"]["eth_holdings"]

    return jsonify(
        {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "btc_holdings": btc_holdings,
            "eth_holdings": eth_holdings,
            "btc_price_usd": btc_price,
            "eth_price_usd": eth_price,
            "btc_value_usd": btc_holdings * btc_price,
            "eth_value_usd": eth_holdings * eth_price,
        }
    )
