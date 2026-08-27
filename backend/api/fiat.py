from flask import Blueprint, jsonify

from scrapers.millenium import get_millennium_rates
from scrapers.privatbank import get_privat24_rates
from scrapers.velobank import get_velobank_rates
from services import live_data

fiat_bp = Blueprint("fiat", __name__)


@fiat_bp.route("/api/fiat/pairs")
def pairs():
    return jsonify(live_data.get_fiat_pairs())


@fiat_bp.route("/refresh", methods=["GET"])
def refresh_rates():
    # polish banks
    millenium_actual_rates = get_millennium_rates()
    velobank_actual_rates = get_velobank_rates()

    # ukrainian banks TODO: pumb_actual_rates
    privatbank_actual_rates = get_privat24_rates()

    return jsonify(
        {
            "Millenium": millenium_actual_rates,
            "VeloBank": velobank_actual_rates,
            "PrivatBank": privatbank_actual_rates,
        }
    )
