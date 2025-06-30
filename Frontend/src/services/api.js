import axios from 'axios';

const API = axios.create({
  baseURL: 'https://echovault-backend-jtnq.onrender.com/api', //backend deployed url
});

// Attach token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
