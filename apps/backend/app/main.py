from typing import Optional, Any, Dict, List
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()


def parse_origins(raw: Optional[str]):
    if not raw or raw.strip() == "*":
        return ["*"]
    return [o.strip() for o in raw.split(",") if o.strip()]


app = FastAPI(title="Propirates API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=parse_origins(os.getenv("CORS_ORIGINS", "http://localhost:4200")),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/health")
def api_health():
    return {"status": "ok"}


@app.get("/api/ping")
def ping():
    return {"pong": True}


@app.post("/api/logging")
async def log_message(request: Request):
    """
    Endpoint to receive frontend logs.
    Accepts log entries from the Angular frontend.
    """
    try:
        body = await request.json()

        # Extract log data
        log_level = body.get("level", "INFO")
        message = body.get("message", "")
        timestamp = body.get("timestamp", datetime.utcnow().isoformat())
        context = body.get("context", {})

        # In production, you would send this to a logging service
        # For now, we'll just print it (visible in Vercel function logs)
        print(f"[{timestamp}] [{log_level}] {message}")
        if context:
            print(f"Context: {context}")

        return {
            "status": "ok",
            "message": "Log received",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        print(f"Error processing log: {str(e)}")
        return {
            "status": "error",
            "message": str(e)
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")), reload=True
    )

