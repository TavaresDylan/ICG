<div style="text-align:center;">
    <img src="../../assets/Logo-Github.png">
</div>

Made by [Dylan Tavarès](https://www/dt-developpement.fr) with ❤️

[Full Documentation](https://tavaresdylan.github.io/ICG/)

# Get started

## With Docker 🐳

Requirements:

-   Docker
-   Docker-compose

---

**Pre-config :**

You must define your environement in project root `.env` and `backend/.env` files to configure docker containers.

---

➤ From root directory

```sh
docker-compose up -d 
```

ℹ️ use this command to re-build containers if you had edit them

```sh
docker-compose up -d --build
```

**Default ports :**

- UI : `localhost:8080`
- Django App : `localhost:8085`
- Adminer : `localhost: 31730`
- Mkdocs : `localhost:5000`

➤ Stop containers

```sh
docker-compose down
```

## Without docker

Requirements:

-   Mysql:5.6
-   NodeJs > 15
-   Python > 3.6
-   Mkdocs-material

---

**Pre-config :**

You must define your environement in `backend/.env` file to make backend work.

---

<img src="https://img.icons8.com/color/54/000000/vue-js.png"/> **Frontend VueJs :**

➤ From root directory go in frontend directory

```sh
cd ICG/frontend/
```

➤ Install dependencies

```sh
npm install
```

➤ Run dev server with hotreload

```sh
npm run serve
```

---

<img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-django-a-high-level-python-web-framework-that-encourages-rapid-development-logo-color-tal-revivo.png"/> **Backend Django :**

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

➤ Run dev server

```sh
python3 manage.py runserver <PORT>
```

---

<img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/44/000000/external-info-contact-flatart-icons-flat-flatarticons.png"/> **Documentation Mkdocs :**

➤ Go in docs directory from root directory

```sh
cd CGI/docs/
```

➤ Run server

```sh
mkdocs serve
```
