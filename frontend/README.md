# Frontend – Stripi Auth UI

Aplicación web construida en **React + Vite** que implementa un flujo de autenticación JWT contra el backend FastAPI del proyecto.

---

## Características

- **Página de login** con formulario de usuario y contraseña.
- Llamada al endpoint `POST /auth/login` del backend para obtener el token.
- **Almacenamiento del token** (`access_token` y `refresh_token`) en `sessionStorage` del navegador — la sesión se elimina al cerrar la pestaña.
- **Ruta protegida**: no es posible acceder a la página de bienvenida sin haber iniciado sesión; cualquier acceso no autorizado redirige al login.
- **Página de bienvenida** con dashboard que muestra el estado de la sesión.
- Diseño basado en el sistema de diseño **Stripi** definido en `DESIGN.md` (colores índigo, tipografía Inter 300, botones en forma de píldora, gradiente mesh en hero).

---

## Tech Stack

| Componente | Versión |
|---|---|
| React | 18 |
| Vite | 6 |
| react-router-dom | 7 |
| Inter (Google Fonts) | — |

---

## Estructura del proyecto

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Guard de ruta autenticada
│   ├── context/
│   │   └── AuthContext.jsx      # Estado global de autenticación
│   ├── pages/
│   │   ├── Login.jsx            # Página de inicio de sesión
│   │   ├── Login.module.css
│   │   ├── Welcome.jsx          # Página de bienvenida (protegida)
│   │   └── Welcome.module.css
│   ├── services/
│   │   └── api.js               # Llamadas al backend
│   ├── App.jsx                  # Rutas principales
│   ├── index.css                # Design tokens y reset global
│   └── main.jsx                 # Entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Prerequisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- Backend corriendo en `http://localhost:8000` (ver `backend/README.md`)

---

## Instalación y uso

### 1. Iniciar el backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

El backend quedará disponible en `http://localhost:8000`.

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

### 4. Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin123` |

---

## Variables de entorno

Crea un archivo `.env` en la carpeta `frontend/` si necesitas apuntar a una URL de backend diferente:

```env
VITE_API_URL=http://localhost:8000
```

Por defecto, la aplicación usa `http://localhost:8000`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera la build de producción en `dist/` |
| `npm run preview` | Sirve localmente la build de producción |

---

## Flujo de autenticación

```
Usuario          Frontend             Backend (FastAPI)
  │                  │                       │
  │ Ingresa creds    │                       │
  │──────────────→   │                       │
  │                  │  POST /auth/login      │
  │                  │──────────────────────→ │
  │                  │  { access_token, ... } │
  │                  │ ←────────────────────  │
  │                  │ Guarda tokens en       │
  │                  │ sessionStorage         │
  │                  │                       │
  │ Redirige a       │                       │
  │ /welcome ←───────│                       │
  │                  │                       │
  │ Cierra sesión    │                       │
  │──────────────→   │                       │
  │                  │ Elimina sessionStorage │
  │                  │ Redirige a /login      │
  │ ←────────────────│                       │
```

---

## Notas de seguridad

- Los tokens se almacenan en `sessionStorage`, por lo que se eliminan automáticamente al cerrar la pestaña o el navegador.
- El `access_token` tiene una validez de **300 segundos**. Para implementar renovación automática en producción, utiliza el `refresh_token` junto con el endpoint `POST /auth/refresh`.
- En producción, configura las variables de entorno apropiadas y usa HTTPS.
