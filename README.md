# 🚀 Proyecto Full-Stack con Docker Compose

¡Bienvenido a este proyecto full-stack que combina lo mejor de **FastAPI**, **MongoDB** y **Vite**! Todo está orquestado mediante **Docker Compose**, lo que hace que la configuración y el despliegue sean rápidos y sencillos. 💡

---

## 🌟 Requisitos Previos

Asegúrate de tener instalados:

- 🐳 [Docker](https://www.docker.com/get-started)
- 📦 [Docker Compose](https://docs.docker.com/compose/install/)

---

## 📂 Estructura del Proyecto

└── 📁Weber ├── 📁backend │ ├── 📁__pycache__ │ ├── .dockerignore │ ├── Dockerfile │ ├── main.py │ └── requirements.txt ├── 📁frontend │ ├── 📁public │ ├── 📁src │ ├── .gitignore │ ├── Dockerfile │ └── vite.config.ts ├── .gitignore ├── docker-compose.yml └── README.md

yaml
Copiar código

---

## 🚀 Uso Individual de los Servicios

### 1️⃣ **MongoDB (Base de Datos)**

Ejecuta MongoDB con:
```bash
docker-compose up db
🔗 La base de datos estará disponible en: mongodb://localhost:27017.

2️⃣ Backend (FastAPI)
🛠 Construcción:
bash
Copiar código
docker-compose build backend
▶️ Ejecución:
bash
Copiar código
docker-compose up backend
📍 Acceso: http://localhost:8000
📄 Documentación interactiva de la API: http://localhost:8000/docs

⚠️ Nota: Asegúrate de que el servicio db esté corriendo.

3️⃣ Frontend (Vite)
🛠 Construcción:
bash
Copiar código
docker-compose build frontend
▶️ Ejecución:
bash
Copiar código
docker-compose up frontend
🌐 El frontend estará disponible en: http://localhost:5173.

🌉 Nota: El frontend se comunica con el backend en http://localhost:8000.

🌍 Uso Conjunto con Docker Compose
Para levantar el proyecto completo (MongoDB + Backend + Frontend):

bash
Copiar código
docker-compose up
Esto ejecutará:

🛢 MongoDB en mongodb://localhost:27017
⚙️ Backend en http://localhost:8000
🌐 Frontend en http://localhost:5173
❌ Detener los Servicios
Para detener todos los servicios:

bash
Copiar código
docker-compose down
Para detener un servicio específico (ejemplo: backend):

bash
Copiar código
docker-compose stop backend
🔧 Troubleshooting
Si algún contenedor falla, inspecciona los logs con:

bash
Copiar código
docker-compose logs <nombre_del_servicio>
Ejemplo para el backend:

bash
Copiar código
docker-compose logs backend
🔄 Si necesitas reiniciar un servicio:

bash
Copiar código
docker-compose restart <nombre_del_servicio>
🛠 Variables de Entorno
El archivo docker-compose.yml ya define las variables necesarias. Aquí está la más importante:

MONGO_URI: mongodb://db:27017 (URI utilizado por el backend para conectarse a MongoDB).
📌 Extensiones Recomendadas para Desarrollo
Para un flujo de trabajo más eficiente, considera instalar estas extensiones en Visual Studio Code:

🐍 Python: Para trabajar con el backend FastAPI.
🐳 Docker: Para gestionar contenedores desde VS Code.
✨ ESLint/Prettier: Para mejorar el formato y la calidad del código en el frontend.
