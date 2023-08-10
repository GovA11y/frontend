# app/__init__.py
from flask import Flask
import os
from dotenv import load_dotenv
from .utils.monitoring import start_monitoring

load_dotenv()

app = Flask(__name__)

# Start Monitoring
start_monitoring()
print('Monitoring services configured')

from app import routes
