# Église Astralis — site de guilde

Application full-stack du site de la guilde **Église Astralis**.

Le frontend présente la guilde, ses builds et guides, le recrutement et un calendrier. Le backend fournit l'authentification d'administration et la gestion d'événements, avec une tâche planifiée et Supabase pour les données.

## Fonctionnalités

### Frontend

- page d'accueil et présentation de la guilde ;
- builds et pages de classes ;
- guides ;
- recrutement ;
- calendrier ;
- interface de connexion administrateur ;
- tableau de bord administrateur ;
- gestion multilingue ;
- transitions de pages.

### Backend

- API Express ;
- authentification/session ;
- API d'événements ;
- tâches récurrentes via `node-cron` ;
- intégration Supabase ;
- endpoint de santé `/healthz` ;
- configuration CORS pour le développement et le domaine de production.

## Stack

**Frontend**
- React 18
- TypeScript
- Vite
- React Router
- Radix UI / composants shadcn-style
- React Hook Form

**Backend**
- Node.js
- TypeScript
- Express
- Supabase
- express-session
- node-cron

## Développement local

Clonez le dépôt :

```bash
git clone https://github.com/LeoPonchon/eglise-astralis-guilde.git
cd eglise-astralis-guilde
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Le backend écoute par défaut sur le port `4000`.

Variables importantes côté backend :

```env
PORT=4000
FRONTEND_ORIGINS=http://localhost:8080
SESSION_SECRET=change_me
COOKIE_SECURE=false
```

Ajoutez également la configuration Supabase attendue par le code.

### Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Vite affiche l'URL locale au démarrage.

## Docker

Le dépôt fournit `docker-compose.yml` et `docker-compose.prod.yml` pour les environnements conteneurisés.

## Structure

```text
.
├── backend/   # API Express/TypeScript
├── frontend/  # React/Vite
├── docker-compose.yml
└── docker-compose.prod.yml
```

## Sécurité

Ne versionnez pas de secrets dans `backend/.env`. Utilisez un fichier d'exemple sans valeurs sensibles et injectez les secrets via l'environnement de déploiement.
