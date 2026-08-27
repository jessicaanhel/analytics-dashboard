from services.db import get_connection


def get_or_create_user(email):
    conn = get_connection()
    try:
        row = conn.execute("SELECT id, email FROM users WHERE email = ?", (email,)).fetchone()
        if row:
            return row
        cursor = conn.execute("INSERT INTO users (email) VALUES (?)", (email,))
        conn.commit()
        return conn.execute(
            "SELECT id, email FROM users WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()
    finally:
        conn.close()


def get_user(user_id):
    conn = get_connection()
    try:
        return conn.execute("SELECT id, email FROM users WHERE id = ?", (user_id,)).fetchone()
    finally:
        conn.close()
