# Backend – JWT Auth API

FastAPI application that exposes JWT-based authentication endpoints.

## Tech Stack

| Component | Version |
|-----------|---------|
| Python    | 3.11    |
| FastAPI   | 0.111   |
| Uvicorn   | 0.29    |
| python-jose | 3.3  |
| passlib (pbkdf2_sha256) | 1.7 |
| Poetry    | 1.8     |

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py       # JWT helpers and user verification
│   └── main.py       # FastAPI app and route definitions
├── tests/
│   └── test_auth.py  # Unit / integration tests
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
└── README.md
```

---

## Endpoints

### `POST /auth/login`

Authenticates a user and returns an access token (expires in **300 seconds**) plus a long-lived refresh token.

**Request body (JSON)**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

---

### `POST /auth/refresh`

Exchanges a valid refresh token for a new access/refresh token pair.

**Request body (JSON)**

```json
{
  "refresh_token": "<refresh JWT>"
}
```

**Response** – same shape as `/auth/login`.

---

## Running Locally with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2

### Build & start

```bash
cd backend
docker compose up --build
```

The API will be available at <http://localhost:8000>.

Interactive Swagger UI: <http://localhost:8000/docs>

ReDoc: <http://localhost:8000/redoc>

### Stop

```bash
docker compose down
```

---

## Running Locally with Poetry

### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/docs/#installation)

### Install dependencies

```bash
cd backend
poetry install
```

### Start the development server

```bash
poetry run uvicorn app.main:app --reload
```

---

## Usage Examples (curl)

### Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Refresh token

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token_from_login>"}'
```

---

## Running Tests

```bash
cd backend
poetry install
poetry run pytest tests/ -v
```

---

## Security Notes

> ⚠️ Always set the `SECRET_KEY` environment variable to a strong random value in production.  
> The application falls back to a hard-coded development key when `SECRET_KEY` is not set, which **must not** be used in production.

```bash
# Generate a strong key:
python -c "import secrets; print(secrets.token_hex(32))"

# Pass it to Docker Compose:
SECRET_KEY=<your-key> docker compose up
```
