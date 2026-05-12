import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_login_success():
    response = client.post("/auth/login", json={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    body = response.json()
    assert "access_token" in body
    assert "refresh_token" in body
    assert body["token_type"] == "bearer"
    assert body["expires_in"] == 300


def test_login_wrong_password():
    response = client.post("/auth/login", json={"username": "admin", "password": "wrong"})
    assert response.status_code == 401


def test_login_unknown_user():
    response = client.post("/auth/login", json={"username": "nobody", "password": "admin123"})
    assert response.status_code == 401


def test_refresh_success():
    # First, obtain tokens
    login_resp = client.post("/auth/login", json={"username": "admin", "password": "admin123"})
    refresh_token = login_resp.json()["refresh_token"]

    # Now refresh
    response = client.post("/auth/refresh", json={"refresh_token": refresh_token})
    assert response.status_code == 200
    body = response.json()
    assert "access_token" in body
    assert "refresh_token" in body


def test_refresh_with_access_token_fails():
    login_resp = client.post("/auth/login", json={"username": "admin", "password": "admin123"})
    access_token = login_resp.json()["access_token"]

    response = client.post("/auth/refresh", json={"refresh_token": access_token})
    assert response.status_code == 401


def test_refresh_invalid_token():
    response = client.post("/auth/refresh", json={"refresh_token": "not.a.valid.token"})
    assert response.status_code == 401
