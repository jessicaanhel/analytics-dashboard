import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "app.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS telegram_links (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    chat_id TEXT UNIQUE,
    link_code TEXT UNIQUE,
    link_code_expires_at TEXT,
    linked_at TEXT
);

CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    asset TEXT NOT NULL,
    operator TEXT NOT NULL CHECK (operator IN ('above', 'below')),
    threshold REAL NOT NULL,
    armed INTEGER NOT NULL DEFAULT 1,
    last_triggered_state INTEGER NOT NULL DEFAULT 0,
    last_notified_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
"""


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_connection()
    try:
        conn.executescript(SCHEMA)
        conn.commit()
    finally:
        conn.close()
