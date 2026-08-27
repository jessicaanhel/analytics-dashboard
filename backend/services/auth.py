from functools import wraps

from flask import jsonify, session


def current_user_id():
    return session.get("user_id")


def login_required(view_fn):
    @wraps(view_fn)
    def wrapper(*args, **kwargs):
        if not current_user_id():
            return jsonify({"error": "not authenticated"}), 401
        return view_fn(*args, **kwargs)

    return wrapper
