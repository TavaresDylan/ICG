FROM python:3.9 as dev

# Dossier de travail (racine du projet)
WORKDIR /app
# Créer un point de montage pour le volume
VOLUME /app
# Mise à jour de pip
RUN pip install --upgrade pip
# Copie du fichier de listing des dépendances dans le container
COPY requirements.txt requirements.txt
# Installation de toutes les dépendances requises
RUN pip install -r requirements.txt
# Exposition du port 8085 pour le webserver
EXPOSE 8085
# Copie de l'intégralité des fichiers
COPY . .
# Execution de la commande pour lancer le serveur
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8085" ]
