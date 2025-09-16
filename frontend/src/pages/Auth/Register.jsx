import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import Navbar from "../../components/Navbar"; // Adjust the import based on your file structure

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
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
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
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
          <button className="bg-green-500 text-white w-full py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
