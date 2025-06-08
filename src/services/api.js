import axios from 'axios';

const API_URL = ''; 
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const favoritesAPI = {
  get: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  add: async (movieId) => {
    const response = await api.post('/favorites', { movieId });
    return response.data;
  },

  remove: async (movieId) => {
    const response = await api.delete(`/favorites/${movieId}`);
    return response.data;
  },
};

export const moviesAPI = {
  search: async (query, page = 1) => {
    const response = await api.get(`/movies?search=${query}&page=${page}`);
    return response.data;
  },

  getDetails: async (id) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },
};