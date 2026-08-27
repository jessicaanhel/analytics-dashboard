# Analytics Dashboard

A crypto and fiat markets dashboard with per-user price alerts delivered over Telegram. The backend is a Flask API that blends live market data with mock fallbacks; the frontend is a React/TypeScript single-page app.

## Features

**Market dashboards** (public, no login required)
- **Overview** — top-level KPIs at a glance
- **Smart Money** — institutional flows, whale transfers, exchange flows, futures open interest/funding, ETF flows
- **Crypto Markets** — live prices, 24h change, volume and market cap for BTC, ETH, SOL, PEPE, WIF
- **Fiat Rates** — EUR/USD/PLN/UAH rates, plus a bank-rate scraper for Millennium, PrivatBank and VeloBank

**Personal features** (require signing in)
- **Personal PnL** — balances and P&L across connected exchanges/banks
- **Alerts (Watchlist)** — create price alerts (`asset` / `above`·`below` / `threshold`) and arm/pause them
- **Settings** — connection status for exchanges/banks, and linking your Telegram account

**Telegram alerts**
A background scheduler checks armed alerts against live prices every 60 seconds. When a threshold is crossed, you get a Telegram message from [@AngelCoin_Bot](https://t.me/AngelCoin_Bot) — no repeat messages while the condition stays true, with a 1‑hour cooldown as a backstop.

**Authentication**
Email-only sign-in (no password) — enter your email and you're in. Sessions are stored in a signed cookie and last 8 hours of inactivity. Public pages work for anyone; the three personal pages above redirect to `/login` only when you navigate to them.

## Tech stack

| Layer | Stack |
|---|---|
| Backend | Python 3.13, Flask, Flask-CORS, SQLite (stdlib `sqlite3`), APScheduler |
| Frontend | React 18, TypeScript, React Router v7, Create React App |
| Data sources | CoinGecko, Binance (futures REST), Frankfurter (FX), bank scrapers (BeautifulSoup), Telegram Bot API |
| Tooling | black, isort, flake8, prettier, pre-commit |

## Project structure

```
backend/
  api/            Flask blueprints — one file per route group (auth, alerts, settings, crypto, fiat, ...)
  services/       Shared logic: db access, caching, live data fetches, auth helpers
  alerts/         Telegram sender, Telegram update listener, background scheduler
  scrapers/       Bank rate scrapers
  data/           Mock data + the SQLite database file (gitignored)
frontend/
  src/pages/      One component per route
  src/components/ Layout (sidebar, topbar, route guard) and shared UI primitives
  src/context/    Auth context/provider
  src/hooks/      useApi — the GET-fetch hook shared across pages
  src/utils/      apiFetch wrapper, formatting helpers
```

## Getting started

### Prerequisites
- Python 3.13
- Node.js (with npm)

### Install

```bash
pip3 install -r backend/requirements.txt
cd frontend && npm install
```

### Run

```bash
./run.sh
```

This opens two terminal windows (macOS) — one running the Flask backend on port 5000, one running the React dev server on port 3000. On another OS, run the two commands it prints yourself. Both apps live-reload on file changes.

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://127.0.0.1:5000](http://127.0.0.1:5000)

The SQLite database (`backend/data/app.db`) is created automatically on first run — no migration step needed.

## Configuration

Create a `.env` file inside `backend/` (already gitignored):

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SECRET_KEY` | Recommended | a hardcoded dev value | Signs session cookies. Set a real random value before deploying anywhere shared. |
| `CORS_ORIGINS` | No | `http://localhost:3000` | Comma-separated allowed origins for cookie-based CORS requests. |
| `TELEGRAM_BOT_USERNAME` | No | `AngelCoin_Bot` | Used to build the "Open in Telegram" deep link on the Settings page. |
| `ETHERSCAN_API_KEY` | For on-chain PEPE flow data | — | Used by `services/etherscan_pepe.py`. |

## Development

Formatting and linting (black, isort, flake8, prettier) run via [pre-commit](https://pre-commit.com) and are auto-fixed on every PR into `develop`/`prod` by `.github/workflows/pre-commit.yml`.

To run the same checks locally before pushing:

```bash
pip3 install -r backend/requirements.txt
pre-commit install
```

This installs a git hook that runs on every commit; run it on demand with `pre-commit run --all-files`.

Frontend-only commands (from `frontend/`):

```bash
npm test        # interactive test runner
npm run build   # production build
```

## Notes

- Most market data has a mock fallback: if a live API (CoinGecko, Binance, Frankfurter) is unreachable, the endpoint degrades gracefully and reports its source (`live` / `mock` / `partial`) via the `X-Data-Source` response header, shown as a small tag in the UI.
- The scheduler runs in-process with the Flask app, so it works identically during local development and once deployed — as long as the app runs as a single process. Running multiple worker processes would duplicate Telegram notifications.
- Login has no password or email verification — it's built for a single-user personal setup. Anyone who knows your email can currently sign in as you.
