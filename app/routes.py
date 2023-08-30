# app/routes.py
from app import app
from .utils.monitoring.logger import logger
import os
from app.views import index, metrics, trigger_error
import requests
from flask import render_template, jsonify, request

API_URL=os.environ.get('API_URL')

# NEW: We want to use app/api/app/api/__init__.py as the base. We want all api requests to use repo root, then /api/ then route

@app.route('/')
def home():
    response = requests.get(f'{API_URL}/domain/list?format=json')
    domains = response.json()
    return render_template('index.html', domains=domains)


@app.route('/api/config')
def get_config():
    return jsonify({'api_url': os.getenv('API_URL')})


@app.route('/metrics')
def get_metrics():
    return metrics()


@app.route('/debug-sentry')
def debug_sentry():
    return trigger_error()


@app.route('/domain/summary')
def get_domain_summary():
    domain = request.args.get('domain')
    url = f"{API_URL}/domain/summary?domain={domain}&format=json"
    headers = {
        "CF-Access-Client-Id": os.environ.get('CF_ACCESS_CLIENT_ID'),
        "CF-Access-Client-Secret": os.environ.get('CF_ACCESS_CLIENT_SECRET'),
    }
    response = requests.get(url, headers=headers)
    return jsonify(response.json())


@app.route('/edit', methods=['GET', 'POST'])
def edit_domains():
    if request.method == 'POST':
        logger.info('event happened')
    return render_template('edit.html')
