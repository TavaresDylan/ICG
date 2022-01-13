FROM node:16-buster as dev
# Dossier de travail courant dans le container
WORKDIR /app
# Créer un point de montage pour le volume
VOLUME /app
# Copie du fichier des dépendences
COPY package.json package.json
# Installation des dépendences
RUN npm install
# Copie de l'intégralité des fichers
COPY . .
# Exposition du port 8080
EXPOSE 8080
# Execution de la commande pour lancer le serveur
CMD [ "npm", "run", "serve" ]
