# app/views.py
from flask import render_template
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

def index():
    return render_template('index.html')

def metrics():
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}

def trigger_error():
    division_by_zero = 1 / 0