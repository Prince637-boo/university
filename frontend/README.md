# 🏫 Système de Gestion Scolaire - Frontend

Une application React moderne pour la gestion complète d'un établissement universitaire.

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies Utilisées](#-technologies-utilisées)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du Projet](#-structure-du-projet)
- [API](#-api)
- [Développement](#-développement)
- [Tests](#-tests)
- [Déploiement](#-déploiement)

## ✨ Fonctionnalités

### 👥 Gestion des Étudiants
- ✅ Inscription et modification des étudiants
- ✅ Consultation des profils détaillés
- ✅ Recherche et filtrage
- ✅ Gestion des documents (photos, certificats)

### 🏛️ Structure Académique
- ✅ Gestion des facultés
- ✅ Gestion des départements
- ✅ Gestion des parcours/filières
- ✅ Gestion des cours et programmes

### 👨‍🏫 Personnel Académique
- ✅ Gestion des enseignants
- ✅ Affectation aux cours
- ✅ Gestion des utilisateurs système

### 📊 Administration
- ✅ Système d'authentification JWT
- ✅ Gestion des rôles et permissions
- ✅ Tableau de bord avec statistiques
- ✅ Paramètres système

### 🤖 Fonctionnalités Avancées
- ✅ Chatbot IA pour l'orientation
- ✅ Chiffrement des fichiers sensibles
- ✅ API REST complète
- ✅ Interface responsive

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** - Framework JavaScript moderne
- **TypeScript** - Typage statique
- **React Router** - Routage côté client
- **Styled Components** - CSS-in-JS
- **React Icons** - Bibliothèque d'icônes
- **React Toastify** - Notifications
- **Axios** - Client HTTP
- **Vite** - Outil de build rapide

### Backend (Référence)
- **FastAPI** - Framework Python asynchrone
- **SQLAlchemy** - ORM Python
- **MySQL** - Base de données
- **Pydantic** - Validation de données
- **JWT** - Authentification
- **Docker** - Conteneurisation

## 🏗️ Architecture

### Structure des Composants
```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.tsx      # Barre de navigation supérieure
│   └── Sidebar.tsx     # Menu latéral
├── layouts/            # Layouts de page
│   ├── AppLayout.tsx   # Layout principal (authentifié)
│   └── AuthLayout.tsx  # Layout d'authentification
├── pages/              # Pages de l'application
│   ├── auth/          # Pages d'authentification
│   ├── Home.tsx       # Page d'accueil
│   └── ...            # Autres pages
├── contexts/           # Contextes React
│   └── AuthContext.tsx # Contexte d'authentification
├── services/           # Services API
│   ├── api.ts         # Client API de base
│   ├── auth.ts        # Service d'authentification
│   └── students.ts    # Service des étudiants
├── types/              # Types TypeScript
│   └── index.ts       # Définitions de types
└── utils/              # Utilitaires
```

### Architecture des Données
- **Types TypeScript** stricts pour toutes les entités
- **Services API** séparés pour chaque domaine
- **Context React** pour la gestion d'état globale
- **Validation** côté client avec TypeScript

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Backend API en cours d'exécution

### Installation des Dépendances
```bash
# Cloner le repository
git clone <repository-url>
cd university/frontend

# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

## ⚙️ Configuration

### Variables d'Environnement
Créer un fichier `.env` dans le dossier frontend :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:8000/api/v1

# Autres configurations
VITE_APP_NAME="Système de Gestion Scolaire"
VITE_APP_VERSION="1.0.0"
```

### Configuration Vite
Le fichier `vite.config.ts` contient la configuration de build :
- Support des variables d'environnement
- Configuration du proxy pour le développement
- Optimisations de build

## 🎯 Utilisation

### Démarrage en Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Ou avec yarn
yarn dev
```

L'application sera accessible sur `http://localhost:3000`

### Build de Production
```bash
# Créer la version de production
npm run build

# Prévisualiser la version de production
npm run preview
```

### Linting
```bash
# Vérifier le code
npm run lint
```

## 📁 Structure du Projet

### Pages Principales
- **Accueil** (`/`) - Tableau de bord avec statistiques
- **Étudiants** (`/students`) - Liste et gestion des étudiants
- **Facultés** (`/faculties`) - Gestion des facultés
- **Départements** (`/departments`) - Gestion des départements
- **Parcours** (`/programs`) - Gestion des filières
- **Cours** (`/courses`) - Gestion des cours
- **Enseignants** (`/teachers`) - Gestion du personnel
- **Utilisateurs** (`/users`) - Administration des comptes

### Composants Réutilisables
- **DataTable** - Tableau de données paginé
- **FormField** - Champ de formulaire générique
- **Modal** - Fenêtre modale
- **Button** - Bouton stylisé
- **Card** - Carte d'information

## 🔌 API

### Endpoints Principaux
```
GET    /api/v1/students     # Liste des étudiants
POST   /api/v1/students     # Créer un étudiant
GET    /api/v1/students/:id # Détails d'un étudiant
PUT    /api/v1/students/:id # Modifier un étudiant
DELETE /api/v1/students/:id # Supprimer un étudiant

POST   /api/v1/login        # Authentification
GET    /api/v1/users/me     # Profil utilisateur
```

### Gestion des Erreurs
- **401 Unauthorized** - Token expiré, redirection vers login
- **403 Forbidden** - Permissions insuffisantes
- **404 Not Found** - Ressource inexistante
- **500 Internal Error** - Erreur serveur

## 💻 Développement

### Conventions de Code
- **TypeScript strict** activé
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage (optionnel)
- **Nommage** : PascalCase pour composants, camelCase pour variables

### Création d'un Nouveau Composant
```typescript
// components/MyComponent.tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  // Styles
`;

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      {title}
    </Container>
  );
};

export default MyComponent;
```

### Ajout d'une Nouvelle Page
1. Créer le composant dans `src/pages/`
2. L'ajouter dans `src/App.tsx`
3. Créer le service API si nécessaire
4. Définir les types TypeScript

## 🧪 Tests

### Configuration des Tests
```bash
# Installer les dépendances de test
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Structure des Tests
```
src/
├── components/
│   ├── __tests__/
│   │   └── MyComponent.test.tsx
├── services/
│   ├── __tests__/
│   │   └── api.test.ts
```

### Exemple de Test
```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

test('renders component correctly', () => {
  render(<MyComponent title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

## 🚢 Déploiement

### Build Docker
```bash
# Construction de l'image
docker build -t university-frontend .

# Exécution du conteneur
docker run -p 3000:80 university-frontend
```

### Configuration Nginx
Le conteneur utilise Nginx pour servir les fichiers statiques :

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Variables d'Environnement de Production
```env
VITE_API_URL=https://api.university.edu/api/v1
VITE_APP_ENV=production
```

## 🤝 Contribution

### Processus de Développement
1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commiter** les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer** une Pull Request

### Standards de Code
- Utiliser TypeScript pour tout nouveau code
- Écrire des tests pour les nouvelles fonctionnalités
- Documenter les composants complexes
- Respecter les conventions de nommage

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation API

---

**Développé avec ❤️ pour la gestion universitaire moderne grr paa**