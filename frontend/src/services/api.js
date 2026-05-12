const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error de autenticación' }));
    throw new Error(error.detail || 'Credenciales incorrectas');
  }

  return response.json();
}

export async function refreshToken(refresh_token) {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
  });

  if (!response.ok) {
    throw new Error('Token inválido o expirado');
  }

  return response.json();
}
