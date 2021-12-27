Made by [Dylan Tavarès]() with ❤️


Watch out my personal website ☞[![Website icon](https://img.icons8.com/color/34/000000/internet--v2.png)](https://www/dt-developpement.fr)

# Get started

Prerequisites:

- Mysql
- Docker
- Docker-compose
- Python > 3.6
- Mkdocs-material

# Procédure rapide de demarrage

- Cloner le repo
- Copier le fichier de variable d'env se trouvant à la racine du projet afin de paramétré docker-compose
- Copier le fichier de variable d'env se trouvant dans le dossier `backend/` afin de paramétré le fichier `settings.py` de django
- Dans le dossier `frontend/` lancer la commande => `npm run watch` afin de compiler les fichiers statics
- Dans le dossier `backend/` lancer la commande => `source ./venv/bin/activate` pour activer l'environement virtuel
- Dans le dossier `backend/` lancer la commande => `pip install -r requirements.txt` pour installer les dépendences nécéssaires au projet
- Dans le dossier `backend/` lancer la commande => `python3 manage.py collectstatic` afin de collecter les fichiers statiques précédement généré par la compilation de npm
- A la racine du projet lancer la commande => `docker-compose up -d` afin de lancer toutes les applications

## With docker-compose 🐳

➤ Setup environment variables

➤ From root directory

```sh
docker-compose up -d
```

➤ Make migrations

➤ Migrate

➤ Collectstatics

*Tips :*

**Exposed ports :**

- UI : `localhost:8080`
- Django App : `localhost:8085`
- Adminer : `localhost: 31730`
- Mkdocs : `localhost:5000`

----

## Without docker

⚠️ Must be setup first of all
**Frontend VueJs :**

➤ From root directory go in frontend directory

```sh
cd ICG/frontend/
```

➤ Install dependencies

```sh
npm install
```

***If you want to develop frontend with hotreload***

➤ Run dev server (on [localhost:8080]())

```sh
npm run serve
```

***If you want to compile each time file change to feed django backend static files***

➤ Run watcher builder

```sh
npm run watch
```


**Backend Django :**

(require frontend builded static files)

➤ Go in backend directory from root directory

```sh
cd ICG/backend/
```

➤ Create virtual environement

```sh
python3 -m venv venv
```

➤ Source venv

```sh
source ./venv/bin/activate
```

➤ Install python packages

```sh
pip install -r requirements.txt
```

➤ Run django migrations

```sh
python3 manage.py migrate
```

➤ Collect VueJs static files

```sh
python3 manage.py collectstatic
```

➤ Run dev server (on [localhost:8085]())

```sh
python3 manage.py runserver 8085
```

**Documentation Mkdocs :**

➤ Go in docs directory from root directory

```sh
cd CGI/docs/
```

➤ Run server (on [localhost:8000]())

```sh
mkdocs serve
```