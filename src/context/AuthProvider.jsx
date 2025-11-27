// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as apiLogin, verifyToken as apiVerify } from "../api/authApi";
import {
  saveToken,
  getToken,
  saveAdmin,
  getAdmin,
  clearToken,
} from "../utils/storage";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getAdmin());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const admin = await apiVerify();
        setUser(admin);
        saveAdmin(admin);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    const { token, admin } = await apiLogin(email, password);
    saveToken(token);
    saveAdmin(admin);
    setUser(admin);
    return admin;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};