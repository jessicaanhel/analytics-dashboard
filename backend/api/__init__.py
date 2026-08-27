from api.alerts import alerts_bp
from api.auth import auth_bp
from api.crypto import crypto_bp
from api.fiat import fiat_bp
from api.institutions import institutions_bp
from api.overview import overview_bp
from api.personal_pnl import personal_pnl_bp
from api.settings import settings_bp
from api.smart_money import smart_money_bp

BLUEPRINTS = [
    auth_bp,
    overview_bp,
    institutions_bp,
    smart_money_bp,
    crypto_bp,
    fiat_bp,
    personal_pnl_bp,
    alerts_bp,
    settings_bp,
]


def register_blueprints(app):
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)
