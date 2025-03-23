# Application de Sondage

Cette application permet aux utilisateurs de créer et de participer à des sondages. Elle est construite avec Next.js, Prisma, et inclut l'authentification avec NextAuth.

## Fonctionnalités

- Création de sondages avec plusieurs options
- Système de vote
- Authentification des utilisateurs (locale et Google)
- Interface utilisateur responsive avec Tailwind CSS et Radix UI

## Prérequis

- Node.js 18 ou plus récent
- npm, yarn ou pnpm

## Installation

1. Cloner le dépôt
2. Installer les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# URL de connexion à la base de données SQLite
DATABASE_URL="file:./dev.db"

# Clé secrète pour NextAuth (chaîne aléatoire pour sécuriser les sessions)
AUTH_SECRET="votre-clé-secrète-aléatoire"

# OAuth Google (optionnel - pour l'authentification Google)
AUTH_GOOGLE_ID="votre-client-id-google"
AUTH_GOOGLE_SECRET="votre-client-secret-google"
```

### Générer une clé secrète

Pour générer une clé secrète aléatoire pour `AUTH_SECRET`, vous pouvez utiliser la commande suivante :

```bash
openssl rand -base64 32
```

## Configuration de Prisma

### Initialisation de la base de données

Pour configurer la base de données et générer le client Prisma :

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma migrate dev --name init
```

### Réinitialisation de la base de données (développement uniquement)

Si vous avez besoin de réinitialiser votre base de données pendant le développement :

```bash
npx prisma migrate reset
```

Cette commande supprimera toutes les données et réappliquera les migrations.

### Explorer vos données

Pour visualiser et modifier vos données via une interface graphique :

```bash
npx prisma studio
```

### Mise à jour du schéma

Après toute modification du fichier `prisma/schema.prisma`, exécutez :

```bash
# Créer une nouvelle migration
npx prisma migrate dev --name nom-de-votre-modification

# Mettre à jour le client Prisma
npx prisma generate
```

## Développement

Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Structure du projet

```
/prisma        - Schéma de base de données et migrations
/src
  /app         - Routes et pages de l'application (App Router)
  /components  - Composants réutilisables
  /lib         - Utilitaires et fonctions partagées
```

## Modèles de données

L'application utilise les modèles de données suivants :

- **User** : Informations sur les utilisateurs
- **Poll** : Sondages créés par les utilisateurs
- **Option** : Options de réponse pour chaque sondage
- **Vote** : Votes des utilisateurs pour les options
- **Account** : Comptes d'authentification (pour NextAuth)
- **Session** : Sessions utilisateur
- **VerificationToken** : Jetons de vérification pour l'authentification

## Déploiement

L'application peut être déployée sur Vercel ou toute autre plateforme compatible avec Next.js.

```bash
# Construire l'application pour la production
npm run build

# Démarrer le serveur de production
npm run start
```

## Bonnes pratiques

- Ne jamais commiter le fichier `prisma/dev.db` dans Git
- Gardez vos variables d'environnement sécurisées
- Exécutez toujours `npx prisma generate` après avoir tiré des changements qui modifient le schéma Prisma
