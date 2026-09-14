"""
backend/main.py
FastAPI application entry point for GUIDE Q.

Run with:
    uvicorn main:app --reload --port 8000

API docs available at:
    http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import places

# ── App Instance ────────────────────────────────────────────
app = FastAPI(
    title="GUIDE Q API",
    description="Backend API for the GUIDE Q personalized Jerusalem Old City tour application.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ────────────────────────────────────────────────────
# During development, the frontend is served on a different port (e.g. 8765).
# In production, replace "*" with the actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8765",   # Python http.server (dev)
        "http://127.0.0.1:8765",
        "http://localhost:5500",   # VS Code Live Server (dev)
        "http://127.0.0.1:5500",
        "http://localhost:3000",   # future Next.js / Vite (dev)
        "*",                       # remove this line in production
    ],
    allow_credentials=False,       # set True when auth tokens are added
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# ── Routers ─────────────────────────────────────────────────
app.include_router(places.router, prefix="/api")

# ── Health Check ────────────────────────────────────────────
@app.get("/api/health", tags=["Health"], summary="Health check")
def health_check():
    """Returns a simple health status. Used to verify the backend is reachable."""
    return {"status": "ok", "service": "GUIDE Q API", "version": "0.1.0"}
