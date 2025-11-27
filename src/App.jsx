// src/App.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const location = useLocation();
  const { user } = useAuth(); // check login status

  // Routes that need NO SIDEBAR and NO TOPBAR
  const noLayoutRoutes = ["/login"];

  // Routes that need ONLY TOPBAR (NO SIDEBAR)
  const onlyTopbarRoutes = ["/chatbot"];

  const path = location.pathname;

  // Case 1: Login page → show NO layout
  if (noLayoutRoutes.includes(path)) {
    return <AppRoutes />;
  }

  // Case 2: Chatbot page → only Topbar
  if (onlyTopbarRoutes.includes(path)) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Topbar />
        <main className="p-4 overflow-auto flex-1">
          <AppRoutes />
        </main>
      </div>
    );
  }

  // Case 3: User is NOT logged in → DO NOT show Sidebar or Topbar
  if (!user) {
    return <AppRoutes />;
  }

  // Case 4: Logged-in user → Full layout (Sidebar + Topbar)
  return (
    <div className="app-layout flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-4 overflow-auto flex-1">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
