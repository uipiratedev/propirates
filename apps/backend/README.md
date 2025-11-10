Backend (Python / FastAPI)

Overview
- FastAPI backend with CORS configured for your frontend.
- Nx integration so you can run it with `nx serve backend`.

Quickstart
1) Create a virtual environment
   - Windows:   `python -m venv venv && .\\venv\\Scripts\\activate`
   - macOS/Linux: `python -m venv venv && source venv/bin/activate`
2) Install dependencies
   - `pip install -r requirements.txt`
   - (optional) `pip install -r requirements-dev.txt`
3) Create a .env (optional)
   - Copy `.env.example` to `.env` and adjust values
4) Run the API
   - Direct: `python -m uvicorn app.main:app --reload --port 8000`
   - Via Nx (from repo root): `npx nx serve backend`
5) Open docs
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

Endpoints
- GET /health -> {"status": "ok"}
- GET /api/ping -> {"pong": true}

CORS
- Configure allowed origins via `CORS_ORIGINS` in `.env` (comma-separated). Default allows `http://localhost:4200`.

Testing
- From `apps/backend`: `pytest -q`
- Or via Nx from repo root: `npx nx test backend`

Notes
- Ensure your virtualenv is activated before using Nx commands that invoke Python tools.
- Do not commit your local `.env` or `venv/` directory.

