Made by [Dylan Tavarès]() with ❤️


Watch out my personal website ☞[![Website icon](https://img.icons8.com/color/34/000000/internet--v2.png)](https://www/dt-developpement.fr)

# Get started

Prerequisites:

- Mysql
- Docker
- Docker-compose
- Python > 3.6
- Mkdocs-material

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