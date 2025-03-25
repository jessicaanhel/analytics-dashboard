import requests

BITQUERY_API = "https://graphql.bitquery.io"
HEADERS = {"X-API-KEY": "BQYlCrvvpTcpOTt5NatfmOeIJtbKKfHm"}


query = """
query {
  ethereum {
    transactions(
      options: {desc: "block.timestamp.time", limit: 10}
      value: {gt: "100000000000000000000000000"}  # Порог для крупных транзакций (100,000 ETH)
    ) {
      block {
        timestamp {
          time
        }
      }
      hash
      from {
        address
      }
      to {
        address
      }
      value
      token {
        symbol
        price {
          usd
        }
      }
    }
  }
}
"""

# Выполнение запроса
response = requests.post(BITQUERY_API, json={"query": query}, headers=HEADERS)
data = response.json()

# Обработка результата
if "data" in data and data["data"]["ethereum"]["transactions"]:
    transactions = data["data"]["ethereum"]["transactions"]
    for tx in transactions:
        token = tx['token']
        value_in_wei = int(tx['value'])
        price_in_usd = token['price']['usd']
        value_in_usd = (value_in_wei / 10**18) * price_in_usd  # Переводим Wei в ETH и умножаем на цену в USD

        if value_in_usd > 1:
            print(f"Transaction Hash: {tx['hash']}")
            print(f"From: {tx['from']['address']}")
            print(f"To: {tx['to']['address']}")
            print(f"Value: {value_in_usd:.2f} USD")
else:
    print("No large transactions found.")
