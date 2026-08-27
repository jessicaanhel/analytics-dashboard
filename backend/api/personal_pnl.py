from flask import Blueprint

from data import mock_data
from services.auth import login_required
from services.response import data_response

personal_pnl_bp = Blueprint("personal_pnl", __name__)


@personal_pnl_bp.route("/api/personal-pnl")
@login_required
def personal_pnl():
    return data_response({"platforms": mock_data.PERSONAL_PNL_PLATFORMS}, "mock")
