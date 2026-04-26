#!/bin/bash

# Script de démarrage rapide - Système de Gestion Scolaire
# Ce script démarre tous les services (frontend, backend, base de données)

set -e

echo "🚀 Démarrage du Système de Gestion Scolaire..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si docker-compose est disponible
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "❌ docker-compose n'est pas disponible."
    exit 1
fi

# Créer le fichier .env si nécessaire
if [ ! -f ".env" ]; then
    echo "📝 Création du fichier .env..."
    cat > .env << EOF
# Configuration de la base de données
MYSQL_ROOT_PASSWORD=root_password
MYSQL_USER=docker_user
MYSQL_PASSWORD=docker_password
MYSQL_DB=gestion_ecole

# Clé secrète pour JWT (générer une nouvelle en production)
SECRET_KEY=$(openssl rand -hex 32)

# Configuration HuggingFace (optionnel)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
EOF
    echo "✅ Fichier .env créé"
fi

# Créer le fichier .env pour le frontend si nécessaire
if [ ! -f "frontend/.env" ]; then
    echo "📝 Création du fichier frontend/.env..."
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_ENV=development
EOF
    echo "✅ Fichier frontend/.env créé"
fi

echo "🐳 Démarrage des services Docker..."
$DOCKER_COMPOSE up -d

echo "⏳ Attente que les services soient prêts..."
echo "   - Base de données MySQL: http://localhost:3306"
echo "   - Backend API: http://localhost:8000"
echo "   - Frontend: http://localhost:3000"

# Attendre que le backend soit healthy
echo "🔄 Attente du backend..."
timeout=60
counter=0
while ! curl -f http://localhost:8000/health &>/dev/null; do
    if [ $counter -ge $timeout ]; then
        echo "❌ Timeout: Le backend ne répond pas après ${timeout}s"
        echo "📋 Logs du backend:"
        $DOCKER_COMPOSE logs backend
        exit 1
    fi
    counter=$((counter + 2))
    echo "   Attente... (${counter}s/${timeout}s)"
    sleep 2
done

echo "✅ Backend prêt!"

# Attendre que le frontend soit accessible
echo "🔄 Attente du frontend..."
counter=0
while ! curl -f http://localhost:3000 &>/dev/null; do
    if [ $counter -ge 30 ]; then
        echo "❌ Timeout: Le frontend ne répond pas après 30s"
        echo "📋 Logs du frontend:"
        $DOCKER_COMPOSE logs frontend
        exit 1
    fi
    counter=$((counter + 2))
    echo "   Attente... (${counter}s/30s)"
    sleep 2
done

echo "✅ Frontend prêt!"

echo ""
echo "🎉 Tous les services sont démarrés!"
echo ""
echo "📱 Accès à l'application:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔌 API Backend: http://localhost:8000"
echo "   🗄️ Base de données: localhost:3306"
echo ""
echo "👤 Compte admin par défaut:"
echo "   Utilisateur: admin"
echo "   Mot de passe: admin123"  # À vérifier dans le code du backend
echo ""
echo "🛑 Pour arrêter: $DOCKER_COMPOSE down"
echo "📋 Pour voir les logs: $DOCKER_COMPOSE logs -f"
echo "🔄 Pour redémarrer: $DOCKER_COMPOSE restart"

# Ouvrir le navigateur automatiquement (optionnel)
if command -v xdg-open &> /dev/null; then
    echo "🌐 Ouverture du navigateur..."
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    echo "🌐 Ouverture du navigateur..."
    open http://localhost:3000
fi