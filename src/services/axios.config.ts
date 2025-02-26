import axios from "axios";
import { useUserStore } from "@/stores/user.store";

const BASEURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = useUserStore.getState().user;

  if (user?.token) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Response interceptor for 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      useUserStore.getState().logout();

      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
