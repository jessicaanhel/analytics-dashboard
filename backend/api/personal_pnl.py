from flask import Blueprint, jsonify

from data import mock_data

personal_pnl_bp = Blueprint("personal_pnl", __name__)


@personal_pnl_bp.route("/api/personal-pnl")
def personal_pnl():
    return jsonify({"platforms": mock_data.PERSONAL_PNL_PLATFORMS})
