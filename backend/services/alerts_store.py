from services.db import get_connection


def list_alerts(user_id):
    conn = get_connection()
    try:
        return conn.execute(
            "SELECT * FROM alerts WHERE user_id = ? ORDER BY created_at DESC", (user_id,)
        ).fetchall()
    finally:
        conn.close()


def create_alert(user_id, asset, operator, threshold):
    conn = get_connection()
    try:
        cursor = conn.execute(
            "INSERT INTO alerts (user_id, asset, operator, threshold) VALUES (?, ?, ?, ?)",
            (user_id, asset, operator, threshold),
        )
        conn.commit()
        return conn.execute("SELECT * FROM alerts WHERE id = ?", (cursor.lastrowid,)).fetchone()
    finally:
        conn.close()


def toggle_alert(user_id, alert_id):
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT * FROM alerts WHERE id = ? AND user_id = ?", (alert_id, user_id)
        ).fetchone()
        if not row:
            return None
        conn.execute(
            "UPDATE alerts SET armed = ? WHERE id = ?", (0 if row["armed"] else 1, alert_id)
        )
        conn.commit()
        return conn.execute("SELECT * FROM alerts WHERE id = ?", (alert_id,)).fetchone()
    finally:
        conn.close()


def list_all_armed_alerts():
    conn = get_connection()
    try:
        return conn.execute("SELECT * FROM alerts WHERE armed = 1").fetchall()
    finally:
        conn.close()


def mark_notified(alert_id):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE alerts SET last_notified_at = datetime('now') WHERE id = ?", (alert_id,)
        )
        conn.commit()
    finally:
        conn.close()


def update_triggered_state(alert_id, is_triggered):
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE alerts SET last_triggered_state = ? WHERE id = ?",
            (1 if is_triggered else 0, alert_id),
        )
        conn.commit()
    finally:
        conn.close()
