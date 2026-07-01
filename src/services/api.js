import axios from 'axios';

// Membaca VITE_API_URL dari environment variable (.env) atau fallback ke localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
});

export default api;
