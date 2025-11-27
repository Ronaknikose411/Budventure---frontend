// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-2xl p-12 mb-12 text-center">
        
        <h1 className="text-6xl font-extrabold bg-linear-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
           Admin Dashboard
        </h1>

        <p className="text-2xl text-gray-700">
          Welcome back,{" "}
          <span className="font-bold text-indigo-700">{user?.name}</span>
        </p>

        <p className="mt-4 inline-block px-8 py-3 bg-purple-600 text-white text-xl font-bold rounded-full shadow-lg">
          {user?.role?.toUpperCase()}
        </p>

      </div>
    </div>
  );
};



export default AdminDashboard;