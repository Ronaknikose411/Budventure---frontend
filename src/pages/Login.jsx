// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("superadmin@gmail.com");
  const [password, setPassword] = useState("SuperAdmin5050");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      // ROLE BASED REDIRECT
      if (user.role === "superadmin") {
        navigate("/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }

    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-extrabold text-center mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR BOX */}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-xl hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
