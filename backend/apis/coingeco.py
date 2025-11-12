import requests
import time
from datetime import datetime

_cached_data = None
_cached_time = 0
_CACHE_TTL = 300  # seconds = 5 minutess
_cached_blackrock = None

def get_bitcoin_metrics(days: int = 2):
    global _cached_data, _cached_time
    if _cached_data and time.time() - _cached_time < _CACHE_TTL:
        return _cached_data

    market_url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
    params = {"vs_currency": "usd", "days": str(days)}

    response = requests.get(market_url, params=params, timeout=10)
    response.raise_for_status()
    market_data = response.json()

    market_caps = market_data.get("market_caps", [])
    if not market_caps:
        return []

    result = []
    last_date = None
    for timestamp, cap_value in market_caps:
        date = datetime.fromtimestamp(timestamp / 1000)
        # Only one data point per day
        if date.date() == last_date:
            continue
        last_date = date.date()
        simulated_ssr = 4.5  # you can vary this if needed
        result.append({
            "timeLabel": f"{date.month}/{date.day}",
            "values": [round(cap_value / 1e9, 2), simulated_ssr]
        })

    _cached_data = result
    _cached_time = time.time()
    return result

def get_blackrock_savings():
    global _cached_blackrock, _blackrock_time
    import time

    if _cached_blackrock and time.time() - _blackrock_time < _CACHE_TTL:
        return _cached_blackrock

    try:
        price_data = requests.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        ).json()
        btc_price = price_data["bitcoin"]["usd"]
        eth_price = price_data["ethereum"]["usd"]
    except Exception as e:
        print(f"⚠️ BlackRock savings fetch error: Missing price data: {e}")
        return _cached_blackrock or {
            "timestamp": datetime.utcnow().isoformat(),
            "btc_holdings": 0,
            "eth_holdings": 0,
            "btc_price_usd": 0,
            "eth_price_usd": 0,
            "btc_value_usd": 0,
            "eth_value_usd": 0,
        }

    btc_holdings = 25000
    eth_holdings = 150000
    _cached_blackrock = {
        "timestamp": datetime.utcnow().isoformat(),
        "btc_holdings": btc_holdings,
        "eth_holdings": eth_holdings,
        "btc_price_usd": btc_price,
        "eth_price_usd": eth_price,
        "btc_value_usd": btc_holdings * btc_price,
        "eth_value_usd": eth_holdings * eth_price,
    }
    _blackrock_time = time.time()
    return _cached_blackrock

if __name__ == "__main__":
    print(get_bitcoin_metrics())