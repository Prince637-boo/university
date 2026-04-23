FROM python:3.13-slim

WORKDIR /app

# Installer curl pour les healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code
COPY . .

# Créer un utilisateur non-root pour la sécurité
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Production: pas de --reload
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]