import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Navbar from "../../components/Navbar"; 

export default function Register() {
  const [form, setForm] = useState({name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const validateForm = () => {
  if(!form.name.trim()|| !form.email.trim() || !form.password.trim()) {
    setError("All fields are required");
    return false;
  }
  return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(!validateForm())return;
    try {
      await axios.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      const data = err?.response?.data;
      // Prefer explicit server validation messages
      if (typeof data === 'string') {
        setError(data);
      } else if (data?.message) {
        setError(data.message);
      } else if (data?.errors && typeof data.errors === 'object') {
        // Flatten field errors if provided
        const messages = Object.values(data.errors).filter(Boolean).join(" \n ");
        setError(messages || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="auth" />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-80"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border w-full mb-3 p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border w-full mb-3 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border w-full mb-3 p-2 rounded"
          />
          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-100 p-2 rounded whitespace-pre-line">
              {error}
            </div>
          )}
          <button className="bg-green-500 text-white w-full py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
