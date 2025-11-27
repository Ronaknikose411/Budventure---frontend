// src/components/Layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Training Data", path: "/training", icon: "📘" },
    { name: "Chat Penal", path: "/admin/chat", icon: "💬" },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-br from-blue-600 to-purple-600">
          ChatSupport
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all 
              ${
                isActive(item.path)
                  ? "bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {/* ---- SUPER ADMIN ADDITIONAL MENUS ---- */}
        {user?.role === "superadmin" && (
          <>
            <Link
              to="/admin-management"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all 
                ${
                  isActive("/admin-management")
                    ? "bg-linear-to-br from-purple-600 to-pink-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              👥 Admin List
            </Link>

          </>
        )}
      </nav>

    </aside>
  );
}
