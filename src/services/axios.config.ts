import axios from 'axios';

const BASEURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userJson = localStorage.getItem('user');
  if (userJson) {
    const user = JSON.parse(userJson);
    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
      config.headers['Content-Type'] = 'application/json';
    }
  }
  return config;
});
