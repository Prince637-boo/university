# University


## Technologies et Fonctionalités

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) pour l'API python backend.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) pour la base de donnée SQL interaction (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), utilisé par fastapi pour la validation de la gestion des paramètres.
    - 💾 [mysql](https://www.mysql.org) comme base de donnée SQL.
- 🚀 [React](https://react.dev) pour le frontend frontend.
    - 💃 Utilise TypeScript, hooks, Vite pour un frontend moderne.
    - 🎨 [Chakra UI](https://chakra-ui.com) pour les components du frontend.
    - 🧪 [Playwright](https://playwright.dev) for End-to-End testing (implémentation futur).
    - 🦇 Support du mode sombre.
- 🐋 [Docker Compose](https://www.docker.com) pour le developpement et la production.
- 🔒 Mot de passe sécurisé.
- 🔑 Authentication JWT (JSON Web Token).
- ✅ Tests avec [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) as a reverse proxy / load balancer (implémentation futur).
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) et CD (continuous deployment) basé sur les Actions de GitHub.

## Configuration 

Cette application est en cours de développement, pour le moment elle utilise une base de donnée locale. Les variables de configuration sont dans le fichier [backend/app/core/settings.py](backend/app/core/settings.py)

Pour les tables de la base donnée, les migrations se font par alembic

## Développement Backend

Documentation Backend: [backend/README.md](./backend/README.md).

## Développement Frontend 

Documentation Frontend: [frontend/README.md](./frontend/README.md).