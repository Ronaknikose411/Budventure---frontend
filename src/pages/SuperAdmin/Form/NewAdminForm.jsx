// src/pages/SuperAdmin/NewAdminForm.jsx
import React, { useState } from "react";
import api from "../../../api/axios";

const NewAdminForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/create", form);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Admin
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              className="w-full px-4 py-2 border rounded-lg focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              className="w-full px-4 py-2 border rounded-lg focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              className="w-full px-4 py-2 border rounded-lg focus:border-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:border-purple-500 outline-none"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewAdminForm;
