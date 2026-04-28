FROM python:3.13-slim

WORKDIR /app

# Installer curl et netcat pour les healthchecks et connection checks
RUN apt-get update && apt-get install -y curl netcat-traditional && rm -rf /var/lib/apt/lists/*

# Installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code
COPY . .

# Copier et rendre exécutable le script d'entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Créer un utilisateur non-root pour la sécurité
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Utiliser le script d'entrypoint pour gérer les migrations
CMD ["/app/entrypoint.sh"]