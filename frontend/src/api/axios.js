import axios from 'axios';

const apiUrl = (import.meta.env.VITE_API_URL || 'https://ai-career-intelligence-c2c0.onrender.com').replace(/\/$/, '');

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Clear tokens or handle logout if unauthenticated
    }
    return Promise.reject(error);
  }
);

export default api;
