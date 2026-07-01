import axios from 'axios';

// Membaca VITE_API_URL dari environment variable (.env) atau fallback ke localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
});

// Interceptor untuk menyertakan JWT token di header Authorization otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('chilicare_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
