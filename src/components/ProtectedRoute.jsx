// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Props:
 * - children: element to render
 * - allow: array of allowed roles (e.g. ["superadmin","admin"]) OR omitted for any authenticated user
 */
const ProtectedRoute = ({ children, allow }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allow && Array.isArray(allow) && !allow.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
