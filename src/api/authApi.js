// src/api/authApi.js
import api from "./axios";

// POST /api/auth/login
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { message, token, admin }
};

// GET /api/auth/verify/token
export const verifyToken = async () => {
  const res = await api.get("/auth/verify/token");
  return res.data; // admin details
};

// POST /api/auth/create  (superadmin only)
export const createAdmin = async (payload) => {
  const res = await api.post("/auth/create", payload);
  return res.data;
};

// GET /api/auth/admins  (superadmin only)
export const getAllAdmins = async () => {
  const res = await api.get("/auth/viewAll/admins");
  return res.data;
};

