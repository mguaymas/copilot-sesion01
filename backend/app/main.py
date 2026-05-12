from fastapi import FastAPI, HTTPException, status
from jose import JWTError
from pydantic import BaseModel

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_token,
)

app = FastAPI(title="JWT Auth API", version="1.0.0")


# --- Request / Response schemas ---

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


class RefreshRequest(BaseModel):
    refresh_token: str


# --- Endpoints ---

@app.post("/auth/login", response_model=TokenResponse, summary="Obtain JWT tokens")
def login(data: LoginRequest):
    """
    Authenticate with username and password.

    - **username**: `admin`
    - **password**: `admin123`

    Returns an access token (valid for 300 s) and a refresh token.
    """
    if not authenticate_user(data.username, data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(subject=data.username)
    refresh_token = create_refresh_token(subject=data.username)
    return TokenResponse(access_token=access_token, refresh_token=refresh_token)


@app.post("/auth/refresh", response_model=TokenResponse, summary="Refresh access token")
def refresh(data: RefreshRequest):
    """
    Exchange a valid refresh token for a new access token and refresh token pair.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(data.refresh_token)
        if payload.get("type") != "refresh":
            raise credentials_exception
        username: str = payload.get("sub")
        if not username:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    access_token = create_access_token(subject=username)
    new_refresh_token = create_refresh_token(subject=username)
    return TokenResponse(access_token=access_token, refresh_token=new_refresh_token)
