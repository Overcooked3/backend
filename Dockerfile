# Utiliser une image de base Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le schéma Prisma dans le conteneur
COPY prisma ./prisma

# Installer le CLI Prisma
RUN npx prisma generate

# Copier les fichiers du projet dans le conteneur
COPY . .

# Exposer le port 2000
EXPOSE 2000

# Commande pour démarrer l'application
CMD ["npm", "start"]