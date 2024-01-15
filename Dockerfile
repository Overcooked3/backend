# Utiliser une image de base Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Installer le CLI Prisma
RUN npx prisma generate

# Copier les fichiers du projet dans le conteneur
COPY . .

# Exposer le port 3000
EXPOSE 2000

# Commande pour démarrer l'application
CMD ["npm", "start"]