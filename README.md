# 🏫 Système de Gestion Scolaire - University Management System

Une plateforme complète de gestion universitaire avec architecture moderne full-stack.

## 📋 Vue d'Ensemble

Ce projet implémente un système de gestion scolaire complet avec :
- **Backend API REST** en Python/FastAPI
- **Frontend React** moderne avec TypeScript
- **Base de données MySQL** avec SQLAlchemy
- **Authentification JWT** sécurisée
- **Interface responsive** et intuitive
- **Architecture microservices** prête pour la scalabilité

## ✨ Fonctionnalités Principales

### 👥 Gestion des Étudiants
- Inscription et gestion des profils étudiants
- Suivi académique et administratif
- Gestion des documents et certificats
- Recherche et filtrage avancés

### 🏛️ Structure Académique
- Gestion hiérarchique : Facultés → Départements → Parcours → Cours
- Affectation des étudiants aux programmes
- Gestion des enseignants et affectations

### 🔐 Sécurité et Authentification
- Authentification JWT robuste
- Système de rôles et permissions
- Chiffrement des données sensibles
- Protection contre les vulnérabilités courantes

### 🤖 Fonctionnalités Avancées
- Chatbot IA pour l'orientation étudiante
- API REST documentée
- Interface responsive mobile-first
- Architecture scalable et maintenable

## 🛠️ Technologies Utilisées

### Backend
- **FastAPI** - Framework web Python asynchrone
- **SQLAlchemy** - ORM moderne avec SQLModel
- **Pydantic** - Validation et sérialisation des données
- **MySQL** - Base de données relationnelle
- **Alembic** - Migrations de base de données
- **JWT** - Authentification sécurisée

### Frontend
- **React 19** - Bibliothèque UI moderne
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Styled Components** - CSS-in-JS
- **React Router** - Routage côté client
- **Axios** - Client HTTP

### DevOps
- **Docker & Docker Compose** - Conteneurisation
- **Traefik** - Reverse proxy (futur)
- **GitHub Actions** - CI/CD (futur)
- **MySQL** - Base de données

## 🚀 Démarrage Rapide

### Prérequis
- Docker & Docker Compose
- Git

### Installation et Lancement

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd university
   ```

2. **Démarrer tous les services**
   ```bash
   # Script automatisé (recommandé)
   ./start.sh

   # Ou manuellement
   docker compose up -d
   ```

3. **Accéder à l'application**
   - 🌐 **Frontend** : http://localhost:3000
   - 🔌 **API Backend** : http://localhost:8000
   - 🗄️ **Base de données** : localhost:3306

### Compte Administrateur
- **Utilisateur** : admin
- **Mot de passe** : admin123

## 📁 Structure du Projet

```
university/
├── backend/              # API FastAPI
│   ├── app/
│   │   ├── api/         # Routes API
│   │   ├── core/        # Configuration
│   │   ├── crud/        # Logique métier
│   │   ├── models/      # Modèles de données
│   │   ├── schemas/     # Schémas Pydantic
│   │   └── services/    # Services métier
│   ├── tests/           # Tests unitaires
│   └── Dockerfile
├── frontend/             # Application React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages de l'application
│   │   ├── services/    # Services API
│   │   ├── contexts/    # Contextes React
│   │   └── types/       # Types TypeScript
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml    # Configuration Docker
├── start.sh             # Script de démarrage
└── README.md
```

## 🔧 Développement

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Documentation complète : [backend/README.md](./backend/README.md)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Documentation complète : [frontend/README.md](./frontend/README.md)

## 🧪 Tests

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

## 🚢 Déploiement

### Production
```bash
# Build et déploiement
docker compose -f docker-compose.prod.yml up -d
```

### Variables d'Environnement
Voir les fichiers `.env.example` dans chaque dossier.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonction`)
3. Commit les changements (`git commit -m 'Description des changements'`)
4. Push la branche (`git push origin feature/nouvelle-fonction`)
5. Ouvrir une Pull Request

## 📝 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- 🐛 **Issues** : [GitHub Issues](https://github.com/your-repo/issues)
- 📖 **Documentation** : [Wiki](https://github.com/your-repo/wiki)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Développé avec ❤️ pour moderniser la gestion universitaire**