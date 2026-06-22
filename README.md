# TaskFlow API

API REST développée avec Node.js, Express et MongoDB permettant la gestion de projets, tâches et tags.

## Fonctionnalités

- Gestion des utilisateurs
- Authentification JWT
- Gestion des projets
- Gestion des tâches
- Gestion des tags
- Gestion des rôles
- Documentation Swagger
- Tests avec Jest

---

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Multer
- Swagger
- Jest
- Supertest

---

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/EliaStack/WS6_Challenge.git
```

Accéder au projet :

```bash
cd WS6_Challenge
```

Installer les dépendances :

```bash
npm install express --save
npm install mongoose
npm install -g nodemon
npm install dotenv
npm install --save mongoose-unique-validator
npm install --save jsonwebtoken
npm install bcrypt
npm install --save multer
npm install express-validator
npm install --save-dev jest supertest mongodb-memory-server
npm install swagger-ui-express swagger-jsdoc
npm install cors
npm install express-rate-limit
```

---

## Configuration

Créer un fichier `.env`

```env
PORT=3000

MONGO_URI=mongodb+srv://...

JWT_SECRET=votre_secret
```

---

## Lancement du projet

Mode standard :

```bash
node server.js
```

ou

```bash
npm start
```

Mode développement :

```bash
nodemon server.js
```

---

## Tests

Lancer les tests :

```bash
npm test
```

Les tests couvrent :

- règles métier
- authentification JWT
- contrôle des rôles
- accès refusés
- endpoints API

---

## Documentation Swagger

Démarrer l'application puis ouvrir :

```text
http://localhost:3000/api-docs
```

Swagger permet :

- visualiser les endpoints
- consulter les paramètres
- consulter les réponses attendues
- tester les routes directement depuis le navigateur

---

## Routes principales

### Utilisateurs

| Méthode | Route |
|----------|---------|
| POST | /api/users/userCreate |
| GET | /api/users/userGet |
| POST | /api/users/login |

### Projets

| Méthode | Route |
|----------|---------|
| GET | /api/projet/projetGetAll |
| POST | /api/projet/projetCreate |
| GET | /api/projet/:id |
| PATCH | /api/projet/:id |
| DELETE | /api/projet/:id |

### Tags

| Méthode | Route |
|----------|---------|
| POST | /api/tags/tagCreate |
| GET | /api/tags/:id |
| PATCH | /api/tags/:id |
| DELETE | /api/tags/:id |

### Tâches

| Méthode | Route |
|----------|---------|
| GET | /api/task/taskGetAll |
| POST | /api/task/taskCreate |
| GET | /api/task/:id |
| PATCH | /api/task/:id |
| DELETE | /api/task/:id |

---

## Auteur

Projet réalisé dans le cadre de la formation Développeur Full Stack JavaScript.