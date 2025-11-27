// src/router/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NotAuthorized from "../pages/NotAuthorized";

import TrainingForm from "../pages/Training/TrainingForm";

import CreateAdmin from "../pages/AdminManagement/CreateAdmin";
import WaitingChats from "../pages/Chat/WaitingChats";

import ActiveChat from "../pages/Chat/ActiveChat";
import TrainingPage from "../pages/SuperAdmin/page/TrainingPage";
import ChatWidget from "../../widget/ChatWidget";

import AdminList from "../pages/AdminManagement/AdminList";
import ChatPenal from "../pages/ChatPenal";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      {/* NEW: Widget route without Layout */}
      <Route path="/chatbot" element={<ChatWidget />} />
      {/* Dashboard - any authenticated admin or superadmin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allow={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Example: superadmin-only page */}
      <Route
        path="/admin-management"
        element={
          <ProtectedRoute allow={["superadmin"]}>
            <AdminList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/training"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <TrainingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/training/add"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <TrainingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/training/edit/:id"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <TrainingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <ProtectedRoute allow={["superadmin"]}>
            <CreateAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/waiting"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <WaitingChats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/active/:sessionId"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <ActiveChat />
          </ProtectedRoute>
        }
      />
      // Add this route
      <Route
        path="/admin/chat"
        element={
          <ProtectedRoute allow={["admin", "superadmin"]}>
            <ChatPenal />
          </ProtectedRoute>
        }
      />
      <Route path="/403" element={<NotAuthorized />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
