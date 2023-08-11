# app/routes.py
from app import app
import os
from app.views import index, metrics, trigger_error
import requests
from flask import render_template, jsonify, request


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

@app.route('/domain/summary')
def get_domain_summary():
    domain = request.args.get('domain')
    url = f"https://reports.openato.com/domain/summary?domain={domain}&format=json"
    headers = {
        "CF-Access-Client-Id": os.environ.get('CF_ACCESS_CLIENT_ID'),
        "CF-Access-Client-Secret": os.environ.get('CF_ACCESS_CLIENT_SECRET'),
    }
    response = requests.get(url, headers=headers)
    return jsonify(response.json())