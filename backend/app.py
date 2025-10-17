from flask import Flask, jsonify
from flask_cors import CORS
import requests
import datetime

app = Flask(__name__)
CORS(app)
@app.route('/api/overview/')
def overview():
    return jsonify({
        "metrics": {
            "total_runs": 120,
            "success_rate": "98%",
            "average_duration": "5m 12s",
        }
    })

# --- CryptoData Tabs ---
@app.route("/api/blackrock")
def api_holdings():
    # Actual prices from CoinGecko
    price_data = requests.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    ).json()
    btc_price = price_data["bitcoin"]["usd"]
    eth_price = price_data["ethereum"]["usd"]

    # mocked blackRock - later Arkham
    btc_holdings = 25000
    eth_holdings = 150000

    return jsonify({
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "btc_holdings": btc_holdings,
        "eth_holdings": eth_holdings,
        "btc_price_usd": btc_price,
        "eth_price_usd": eth_price,
        "btc_value_usd": btc_holdings * btc_price,
        "eth_value_usd": eth_holdings * eth_price,
    })

@app.route('/api/automation/autotab2/')
def automation_tab2():
    return jsonify({"data": "CryptoData Tab 2 details"})

@app.route('/api/automation/autotab3/')
def automation_tab3():
    return jsonify({"data": "CryptoData Tab 3 details"})


# --- Analytics Tabs ---
@app.route('/api/analytics/analyticstab1/')
def analytics_tab1():
    return jsonify({"data": "Analytics Tab 1 details"})

@app.route('/api/analytics/analyticstab2/')
def analytics_tab2():
    return jsonify({"data": "Analytics Tab 2 details"})

@app.route('/api/analytics/analyticstab3/')
def analytics_tab3():
    return jsonify({"data": "Analytics Tab 3 details"})


# --- Custom Tabs ---
@app.route('/api/custom/customtab1/')
def custom_tab1():
    return jsonify({"data": "Custom Tab 1 details"})

@app.route('/api/custom/customtab2/')
def custom_tab2():
    return jsonify({"data": "Custom Tab 2 details"})

@app.route('/api/custom/customtab3/')
def custom_tab3():
    return jsonify({"data": "Custom Tab 3 details"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
