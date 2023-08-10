# app/__init__.py
from flask import Flask, request
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from prometheus_client import make_wsgi_app
from dotenv import load_dotenv
from .utils.monitoring import start_monitoring, configure_prometheus
from time import time


load_dotenv()

app = Flask(__name__)
# Start Monitoring
start_monitoring(app)
print('Monitoring services configured')

@app.before_request
def before_request():
    request.start_time = time()

@app.after_request
def after_request(response):
    request_latency = time() - request.start_time
    endpoint = request.endpoint
    method = request.method
    status = response.status_code
    return response

app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})

from app import routes