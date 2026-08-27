import os
from datetime import timedelta

import dotenv
from flask import Flask
from flask_cors import CORS

from alerts.scheduler import start_scheduler
from api import register_blueprints
from services.db import init_db

dotenv.load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "dev-insecure-secret-change-me")
app.config.update(
    SESSION_COOKIE_SAMESITE="Lax",
    PERMANENT_SESSION_LIFETIME=timedelta(hours=8),
)

CORS(
    app,
    supports_credentials=True,
    origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    expose_headers=["X-Data-Source"],
)

register_blueprints(app)
init_db()
start_scheduler(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
