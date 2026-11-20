# FastAPI application for cloud project.
from fastapi import FastAPI, HTTPException
from datetime import datetime
import requests
from stock_service import get_daily_stock_prices
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Cloud project is running"}

@app.get("/time")
def get_time():
    return {"time": str(datetime.utcnow())}

@app.get("/status")
def status():
    return {"status": "ok"}

@app.get("/stocks/{symbol}")
def get_stock(symbol: str):
    try:
        return get_daily_stock_prices(symbol)
    except requests.RequestException:
        raise HTTPException(
            status_code=502,
            detail="Unable to retrieve stock data"
        )
