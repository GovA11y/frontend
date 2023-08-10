# app/utils/monitoring/__init__.py
from .sentry import initialize_sentry
from .pyroscope import configure_pyroscope


def start_monitoring():
    initialize_sentry()
    configure_pyroscope()
