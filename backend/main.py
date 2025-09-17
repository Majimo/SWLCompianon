from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core import config
from backend.api.routers import auth, units

app = FastAPI(title=config.PROJECT_NAME)

# Configuration du middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs de l'API
app.include_router(auth.router)
app.include_router(units.router)

@app.get("/api")
def api_root():
    """Point d'entrée racine de l'API."""
    return {"message": f"Welcome to {config.PROJECT_NAME}"}
