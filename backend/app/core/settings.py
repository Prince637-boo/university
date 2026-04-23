"""
Configuration centralisée des paramètres de l'application.
Charge les variables depuis le fichier .env
"""
import secrets
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from functools import lru_cache
from pydantic import (
    computed_field,
    MySQLDsn,
    Field
)
from pydantic_core import MultiHostUrl


class Settings(BaseSettings):
    """Classe de configuration qui charge les variables d'environnement depuis .env"""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        case_sensitive=True,
        extra='ignore'  # 🔧 AJOUTÉ: Ignorer les champs supplémentaires
    )
    
    # ===== API =====
    API_V1_STR: str = Field(default="/api/v1")
    PROJECT_NAME: str = Field(default="Gestion Scolaire")
    
    # ===== Database =====
    MYSQL_SERVER: str = Field(default="localhost")
    MYSQL_PORT: int = Field(default=3306)
    MYSQL_USER: str = Field(default="docker_user")
    MYSQL_PASSWORD: str = Field(default="")
    MYSQL_DB: str = Field(default="gestion_ecole")
    
    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> MySQLDsn:
        return MultiHostUrl.build(
            scheme="mysql+pymysql",
            username=self.MYSQL_USER,
            password=self.MYSQL_PASSWORD,
            host=self.MYSQL_SERVER,
            port=self.MYSQL_PORT,
            path=self.MYSQL_DB
        )
    
    # ===== Security =====
    SECRET_KEY: str = Field(default="")  # DOIT être défini dans .env en production
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30)
    
    # ===== Admin User =====
    FIRST_SUPERUSER: str = Field(default="admin")
    FIRST_SUPERUSER_PASSWORD: str = Field(default="")
    
    # ===== Test User =====
    USERNAME_TEST_USER: str = Field(default="testuser")
    
    # ===== Media Upload =====
    MEDIA_UPLOAD_DIR: str = Field(default="app/media")
    
    # ===== CORS =====
    # Format: "http://localhost:3000,http://127.0.0.1:3000"
    ALLOWED_ORIGINS: str = Field(default="http://localhost:3000,http://127.0.0.1:3000")
    
    # ===== Environment =====
    ENVIRONMENT: str = Field(default="development")
    
    def get_allowed_origins(self) -> List[str]:
        """Parse ALLOWED_ORIGINS string into list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]


@lru_cache()
def get_settings() -> Settings:
    """Retourne l'instance unique de Settings"""
    settings = Settings()
    
    # Validation: SECRET_KEY doit être défini en production
    if settings.ENVIRONMENT == "production" and not settings.SECRET_KEY:
        raise ValueError("SECRET_KEY must be set in .env for production!")
    
    # Si SECRET_KEY n'est pas défini, générer une clé temporaire (dev seulement)
    if not settings.SECRET_KEY:
        if settings.ENVIRONMENT != "development":
            raise ValueError("SECRET_KEY must be defined!")
        settings.SECRET_KEY = secrets.token_urlsafe(32)
    
    return settings


# Instance globale de settings
settings = get_settings()

