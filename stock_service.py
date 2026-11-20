import os
from urllib import response
import requests

API_KEY = "" #os.getenv("ALPHA_VANTAGE_API_KEY") , insert your API key here
BASE_URL = "https://www.alphavantage.co/query"

def get_daily_stock_prices(symbol):

    params = {
    "function": "TIME_SERIES_DAILY",
    "symbol": symbol.upper(),
    "apikey": API_KEY,
    "outputsize": "compact",
    }


    response = requests.get(BASE_URL, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    daily_prices = data["Time Series (Daily)"]

    last_7_days = {}

    for x in daily_prices:
        if len(last_7_days) >= 7:
            break
        last_7_days[x] = daily_prices[x]

    return last_7_days