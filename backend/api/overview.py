from flask import Blueprint, jsonify

from data import mock_data

overview_bp = Blueprint("overview", __name__)


@overview_bp.route("/api/overview")
def overview():
    return jsonify(mock_data.OVERVIEW_KPIS)
