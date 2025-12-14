"""
Module centralisé pour la gestion de la sécurité :
- Hachage et vérification des mots de passe.
- Création et validation des tokens JWT.
"""
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import jwt, JWTError

from app.core.settings import settings

# --- Configuration du hachage de mot de passe ---
# Instance unique pour toute l'application.
# bcrypt__truncate_error=True est crucial pour les auto-tests de passlib.
# Nous le mettons à False pour gérer automatiquement la troncature des mots de passe > 72 octets.
pwd_context = CryptContext(
    schemes=["bcrypt"], # Simplifié pour se concentrer sur bcrypt
    deprecated="auto",
    bcrypt__truncate_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie un mot de passe en clair contre sa version hachée."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Retourne le hash bcrypt d'un mot de passe."""
    return pwd_context.hash(password)

# --- Gestion des Tokens JWT ---
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Crée un nouveau token d'accès JWT."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
