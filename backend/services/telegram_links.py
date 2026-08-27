import secrets
from datetime import datetime, timedelta, timezone

from services.db import get_connection

CODE_TTL = timedelta(minutes=15)


def generate_link_code(user_id):
    code = f"{secrets.randbelow(900000) + 100000}"
    expires_at = (datetime.now(timezone.utc) + CODE_TTL).isoformat()
    conn = get_connection()
    try:
        conn.execute(
            """INSERT INTO telegram_links (user_id, link_code, link_code_expires_at)
               VALUES (?, ?, ?)
               ON CONFLICT(user_id) DO UPDATE SET link_code=excluded.link_code,
                   link_code_expires_at=excluded.link_code_expires_at""",
            (user_id, code, expires_at),
        )
        conn.commit()
    finally:
        conn.close()
    return code, expires_at


def consume_link_code(code, chat_id):
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT user_id FROM telegram_links "
            "WHERE link_code = ? AND link_code_expires_at > datetime('now')",
            (code,),
        ).fetchone()
        if row:
            conn.execute(
                """UPDATE telegram_links SET chat_id=?, linked_at=datetime('now'),
                   link_code=NULL, link_code_expires_at=NULL WHERE user_id=?""",
                (str(chat_id), row["user_id"]),
            )
            conn.commit()
        return bool(row)
    finally:
        conn.close()


def get_chat_id(user_id):
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT chat_id FROM telegram_links WHERE user_id = ?", (user_id,)
        ).fetchone()
        return row["chat_id"] if row else None
    finally:
        conn.close()


def get_link_status(user_id):
    chat_id = get_chat_id(user_id)
    return {"linked": chat_id is not None}
