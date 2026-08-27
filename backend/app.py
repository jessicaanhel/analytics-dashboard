import datetime

import requests
from flask import Flask, jsonify
from flask_cors import CORS

import mock_data
from scrapers.millenium import get_millennium_rates
from scrapers.privatbank import get_privat24_rates
from scrapers.velobank import get_velobank_rates

app = Flask(__name__)
CORS(app)


@app.route("/api/overview")
def overview():
    return jsonify(mock_data.OVERVIEW_KPIS)


@app.route("/api/smart-money/institutional")
def smart_money_institutional():
    return jsonify(mock_data.INSTITUTIONAL_FLOWS)


@app.route("/api/smart-money/whale-transfers")
def smart_money_whale_transfers():
    return jsonify(
        {
            "threshold_usd": mock_data.WHALE_ALERT_THRESHOLD_USD,
            "transfers": mock_data.WHALE_TRANSFERS,
        }
    )


@app.route("/api/smart-money/exchange-flows")
def smart_money_exchange_flows():
    return jsonify(mock_data.EXCHANGE_FLOWS)


@app.route("/api/smart-money/futures")
def smart_money_futures():
    return jsonify(mock_data.FUTURES)


@app.route("/api/smart-money/etf-flows")
def smart_money_etf_flows():
    return jsonify(mock_data.ETF_FLOWS)


@app.route("/api/crypto/markets")
def crypto_markets():
    return jsonify(mock_data.CRYPTO_MARKETS)


@app.route("/api/blackrock")
def api_holdings():
    price_data = requests.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    ).json()
    btc_price = price_data["bitcoin"]["usd"]
    eth_price = price_data["ethereum"]["usd"]

    # mocked blackRock - later Arkham
    btc_holdings = 25000
    eth_holdings = 150000

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


@app.route("/api/fiat/pairs")
def fiat_pairs():
    return jsonify(mock_data.FIAT_PAIRS)


@app.route("/refresh", methods=["GET"])
def refresh_rates():
    # polish banks
    millenium_actual_rates = get_millennium_rates()
    velobank_actual_rates = get_velobank_rates()

    # ukrainian banks TODO: pumb_actual_rates
    privatbank_actual_rates = get_privat24_rates()

    return jsonify(
        {
            "Millenium": millenium_actual_rates,
            "VeloBank": velobank_actual_rates,
            "PrivatBank": privatbank_actual_rates,
        }
    )


@app.route("/api/personal-pnl")
def personal_pnl():
    return jsonify({"platforms": mock_data.PERSONAL_PNL_PLATFORMS})


@app.route("/api/watchlist")
def watchlist():
    return jsonify(mock_data.WATCHLIST)


@app.route("/api/watchlist/<int:item_id>/toggle", methods=["POST"])
def watchlist_toggle(item_id):
    for item in mock_data.WATCHLIST:
        if item["id"] == item_id:
            item["armed"] = not item["armed"]
            return jsonify(item)
    return jsonify({"error": "not found"}), 404


@app.route("/api/settings/connections")
def settings_connections():
    return jsonify(mock_data.SETTINGS_CONNECTIONS)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
