import React, { useState } from "react";
import { createAdmin } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // default admin
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createAdmin(form);
      navigate("/admin-management");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <h2>Create Admin</h2>

      <form onSubmit={submit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
