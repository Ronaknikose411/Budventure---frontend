// src/api/axios.js
import axios from "axios";
import { getToken, clearToken } from "../utils/storage";

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api",
  withCredentials: false,
  timeout: 15000,
});

// Attach token to every request
api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
}, (err) => Promise.reject(err));

// Global response interceptor - handle 401 centrally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // token invalid or expired -> clear token and optionally force reload or notify
      clearToken();
      // optional: window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
