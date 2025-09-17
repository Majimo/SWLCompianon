# SWLCompanion - Compagnon pour Star Wars: Legion

SWLCompanion est une application web conçue pour aider les joueurs du jeu de figurines *Star Wars: Legion*. Elle a pour but de faciliter la création de listes d'armée, la gestion de collection d'unités et le suivi des parties.

Ce projet est développé avec un backend **FastAPI** et un frontend **React (Vite + TypeScript)**, le tout conteneurisé avec **Docker**.

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React)](#frontend-react)
- [🚀 Démarrage Rapide](#-démarrage-rapide)
  - [Prérequis](#prérequis)
  - [Installation et Lancement](#installation-et-lancement)
- [📁 Structure du Projet](#-structure-du-projet)
- [🛣️ Feuille de route](#️-feuille-de-route)

## ✨ Fonctionnalités

*   **Gestion des Unités** : CRUD (Créer, Lire, Mettre à jour, Supprimer) complet pour les unités de Star Wars: Legion.
*   **Authentification Sécurisée** : Système de connexion basé sur les tokens JWT (OAuth2).
*   _(À venir)_ : Création et gestion de listes d'armée.
*   _(À venir)_ : Gestion de la collection personnelle de figurines.

## 🏗️ Architecture

Le projet est divisé en deux services principaux : le backend et le frontend. L'architecture a été pensée pour être modulaire, testable et évolutive, en s'inspirant des principes de la **Clean Architecture**.

### Backend (FastAPI)

Le backend suit une architecture en couches distinctes pour séparer les responsabilités :

-   **`domain`** : Le cœur de l'application. Contient les modèles de données métier (ex: `Unit`, `User`). Cette couche n'a aucune dépendance externe.
-   **`core`** : Gère les aspects techniques et les dépendances externes. On y trouve la configuration et les services externes (ex: service d'authentification).
-   **`api`** : La couche de présentation. Elle est responsable de la gestion des requêtes HTTP (routage, validation des données d'entrée/sortie). Elle utilise les `use_cases` pour exécuter les actions métier.

Ce découplage permet de changer facilement une brique technique (par exemple, passer d'une base de données en mémoire à PostgreSQL) sans impacter la logique métier.

### Frontend (React)

Le frontend est une application React moderne initialisée avec Vite.

-   **Langage** : TypeScript pour un typage robuste.
-   **Structure** : Une architecture classique basée sur les composants (`src/components`), les services pour les appels API (`src/services`) et les intercepteurs (`src/interceptors`).
-   **Styling** : CSS simple, avec une structure prête pour l'intégration de frameworks comme Tailwind CSS ou Material-UI.

## 🚀 Démarrage Rapide

L'ensemble du projet est conteneurisé avec Docker, ce qui simplifie grandement son lancement.

### Prérequis

-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/) (généralement inclus avec Docker Desktop)

### Installation et Lancement

1.  **Clonez le dépôt :**
    ```bash
    git clone <URL_DU_DEPOT_GITHUB>
    cd SWLCompanion
    ```

2.  **Lancez l'application avec Docker Compose :**
    ```bash
    docker-compose up --build
    ```
    -   La commande `--build` force la reconstruction des images Docker. C'est utile lors du premier lancement ou après avoir modifié les dépendances (ex: `requirements.txt` ou `package.json`).

3.  **Accédez à l'application :**
    -   Le **Frontend** est accessible sur [`http://localhost:5173`](http://localhost:5173).
    -   Le **Backend** est accessible sur [`http://localhost:8000`](http://localhost:8000).
    -   La documentation interactive de l'API (Swagger UI) est disponible sur [`http://localhost:8000/docs`](http://localhost:8000/docs).

## 📁 Structure du Projet

```
.
├── docker-compose.yml
├── Dockerfile
├── README.md
├── backend/
│   ├── main.py             # Point d'entrée de l'API
│   ├── api/                # Couche API (routeurs, dépendances)
│   ├── core/               # Configuration
│   ├── domain/             # Modèles et logique métier pure
│   ├── infrastructure/     # Accès BDD, services externes
│   └── use_cases/          # Cas d'utilisation métier
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── components/
        └── services/
```

## 🛣️ Feuille de route

-   [ ] Remplacer le repository en mémoire par une base de données persistante (ex: PostgreSQL).
-   [ ] Compléter les tests unitaires et d'intégration pour le backend.
-   [ ] Développer l'interface de création de listes d'armée.
-   [ ] Mettre en place un pipeline de CI/CD (GitHub Actions).