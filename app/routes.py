# app/routes.py
from app import app
from app.views import index, metrics, trigger_error
import requests
from flask import render_template


@app.route('/')
def home():
    response = requests.get('https://reports.openato.com/domain/list?format=json')
    domains = response.json()
    return render_template('index.html', domains=domains)


@app.route('/metrics')
def get_metrics():
    return metrics()


@app.route('/debug-sentry')
def debug_sentry():
    return trigger_error()