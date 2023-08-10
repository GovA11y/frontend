# run.py
import os
from app import app


if __name__ == '__main__':
    # Use the APP_PORT environment variable
    port = os.environ.get('APP_PORT', 5001)
    app.run(host='0.0.0.0', port=port, debug=True)
