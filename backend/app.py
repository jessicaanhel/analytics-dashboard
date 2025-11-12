from flask import Flask, jsonify
from flask_cors import CORS
import requests
import datetime

from apis.coingeco import get_bitcoin_metrics, get_blackrock_savings
from scrapers.millenium import get_millennium_rates
from scrapers.privatbank import get_privat24_rates
from scrapers.velobank import get_velobank_rates

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "API is running"})

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

@app.get("/api/test_btc")
def test_btc():
    data = get_bitcoin_metrics(days=2)
    print("DEBUG BTC DATA:", data)
    return jsonify(data)

@app.route("/api/blackrock")
def blackrock_savings():
    try:
        blackrock_savings = get_blackrock_savings()
        return jsonify(blackrock_savings)
    except Exception as e:
        print(f"[WARN] Failed to fetch: {e}")
        return []

@app.route("/api/bitcoin_market_cap")
def bitcoin_metrics():
    try:
        data = get_bitcoin_metrics()
        return jsonify(data)
    except Exception as e:
        print(f"[WARN] Failed to fetch: {e}")
        return []


@app.route('/api/automation/autotab2/')
def automation_tab2():
    return jsonify({"data": "CryptoData Tab 2 details"})

@app.route('/api/automation/autotab3/')
def automation_tab3():
    return jsonify({"data": "CryptoData Tab 3 details"})


# --- Analitics Tabs ---
@app.route('/api/analytics/analyticstab1/')
def analytics_tab1():
    return jsonify({"data": "Analytics Tab 1 details"})

@app.route('/api/analytics/analyticstab2/')
def analytics_tab2():
    return jsonify({"data": "Analytics Tab 2 details"})

@app.route('/api/analytics/analyticstab3/')
def analytics_tab3():
    return jsonify({"data": "Analytics Tab 3 details"})



# --- Fiat Currencies ---
@app.route("/refresh", methods=["GET"])
def refresh_rates():
    #polish banks
    millenium_actual_rates = get_millennium_rates()
    velobank_actual_rates = get_velobank_rates()

    #ukrainian banks TODO: pumb_actual_rates
    privatbank_actual_rates = get_privat24_rates()

    return jsonify({
        "Millenium": millenium_actual_rates,
        "VeloBank": velobank_actual_rates,
        "PrivatBank": privatbank_actual_rates,
    })
@app.route('/api/custom/customtab2/')
def custom_tab2():
    return jsonify({"data": "Fiat Tab 2 details"})

@app.route('/api/custom/customtab3/')
def custom_tab3():
    return jsonify({"data": "Fiat Tab 3 details"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
