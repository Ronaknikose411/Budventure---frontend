// src/components/AdminData.jsx
import React from "react";

const AdminData = ({ admins, onClose }) => {
  if (!admins || admins.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No admin data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">All System Administrators</h2>
        <p className="text-lg opacity-90 mt-2">Total: {admins.length} accounts</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Joined On
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr
                key={admin._id}
                className="hover:bg-purple-50 transition duration-200"
              >
                <td className="px-8 py-6 font-semibold text-gray-900">
                  {admin.name}
                </td>
                <td className="px-8 py-6 text-gray-700">{admin.email}</td>
                <td className="px-8 py-6">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                      admin.role === "superadmin"
                        ? "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {admin.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-8 py-6 text-gray-600">
                  {new Date(admin.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 text-center">
        <button
          onClick={onClose}
          className="text-purple-600 font-bold text-lg hover:underline"
        >
          ← Close Table
        </button>
      </div>
    </div>
  );
};

export default AdminData; 