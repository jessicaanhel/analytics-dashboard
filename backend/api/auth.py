from flask import Blueprint, request, session

from services import users
from services.auth import current_user_id
from services.response import data_response

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    email = (request.get_json(silent=True) or {}).get("email", "").strip().lower()
    if not email or "@" not in email:
        return {"error": "valid email required"}, 400
    user = users.get_or_create_user(email)
    session.clear()
    session["user_id"] = user["id"]
    session.permanent = True
    return data_response({"id": user["id"], "email": user["email"]}, "live")


@auth_bp.route("/api/auth/me")
def me():
    user_id = current_user_id()
    if not user_id:
        return {"error": "not authenticated"}, 401
    user = users.get_user(user_id)
    if not user:
        session.clear()
        return {"error": "not authenticated"}, 401
    return data_response({"id": user["id"], "email": user["email"]}, "live")


@auth_bp.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return "", 204
