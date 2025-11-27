// src/pages/AdminManagement/AdminList.jsx
import React, { useEffect, useState } from "react";
import { getAllAdmins } from "../../api/authApi";
import AdminData from "../SuperAdmin/Table/AdminData";
import NewAdminForm from "../SuperAdmin/Form/NewAdminForm";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllAdmins();
      const list = res?.admins ?? res?.data ?? res ?? [];

      setAdmins(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      setError("Failed to load admin list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          System Admin Accounts
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
        >
          + Add New Admin
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center p-10 text-gray-500 text-xl">
          Loading…
        </div>
      ) : error ? (
        <div className="text-center p-10 text-red-500 text-xl">
          {error}
        </div>
      ) : (
        <AdminData admins={admins} />
      )}

      {/* MODAL FORM */}
      {showForm && (
        <NewAdminForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadAdmins(); // refresh admin list
          }}
        />
      )}
    </div>
  );
}
