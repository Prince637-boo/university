from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.settings import settings
from app.api.main import api_router
# Import tous les modèles pour assurer le chargement correct des mappers SQLAlchemy
from app import models  # noqa: F401

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API pour la gestion académique",
    version="0.1.0"
)

# ===== CORS Configuration =====
# ⚠️ SÉCURITÉ: CORS restreint aux origines autorisées
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),  # Liste blanche depuis .env
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# ===== Routes =====
app.include_router(api_router, prefix=settings.API_V1_STR)


# ===== Health Check =====
@app.get("/health")
def health_check():
    """Endpoint de vérification de santé pour Docker"""
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "version": "0.1.0"
    }
