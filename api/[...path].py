import os
import sys

# Ensure backend package is importable
CURRENT_DIR = os.path.dirname(__file__)
BACKEND_PATH = os.path.abspath(os.path.join(CURRENT_DIR, "..", "apps", "backend"))
if BACKEND_PATH not in sys.path:
    sys.path.append(BACKEND_PATH)

# Import FastAPI app
from app.main import app as fastapi_app

# Catch-all ASGI app for any /api/* path
app = fastapi_app

