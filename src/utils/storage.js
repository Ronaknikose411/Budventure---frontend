// src/utils/storage.js
const TOKEN_KEY = "chat_app_token";
const ADMIN_KEY = "chat_app_admin";

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};
export const saveAdmin = (admin) => localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
export const getAdmin = () => {
  const raw = localStorage.getItem(ADMIN_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const clearAdmin = () => localStorage.removeItem(ADMIN_KEY);
