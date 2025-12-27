import axios from 'axios';

// Usamos variables de entorno para no quemar URLs en el código
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Antes de cada petición, inyecta el token si existe
api.interceptors.request.use((config) => {
  // Aquí obtendremos el token del storage o cookies en el futuro
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Manejo global de errores (ej. si expira la sesión)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si es necesario
      console.warn('Sesión expirada o no autorizada');
    }
    return Promise.reject(error);
  }
);