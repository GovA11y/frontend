# app/routes.py
from app import app

@app.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0
