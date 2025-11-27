// src/components/Layout/Topbar.jsx
import { useAuth } from "../../hooks/useAuth";

const Topbar = () => {
  const { user, logout } = useAuth();

  // ❗ If user is not logged in → do NOT show topbar
  if (!user) return null;

  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-700 text-white p-4 flex justify-between items-center shadow-lg">
      
      {/* LEFT SIDE (App Name) */}
      <h1 className="text-2xl font-bold tracking-wide"> Dashboard</h1>

      {/* RIGHT SIDE (User + Logout) */}
      <div className="flex items-center gap-6">
        <span className="text-lg font-semibold">
          {user?.name} - {user?.role?.toUpperCase()}
        </span>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Topbar;
