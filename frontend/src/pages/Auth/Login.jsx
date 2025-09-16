import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"; // Import the Navbar component

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, token, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  // If user already logged in, redirect to dashboard
  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { name, password });

      const data = res.data || {};
      const receivedToken =
        data.token || data.accessToken || data.data?.token || null;
      const receivedUser = data.user || data.data?.user || null;

      if (!receivedToken) {
        setError("Login succeeded but token not found in response.");
        setLoading(false);
        return;
      }

      setToken(receivedToken);
      if (receivedUser) setUser(receivedUser);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="auth" />
      <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <label className="block mb-2 text-sm">
            <span className="text-gray-600">Username</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              placeholder="username"
              required
              autoComplete="username"
            />
          </label>

          <label className="block mb-4 text-sm">
            <span className="text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            className={`w-full py-2 rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <div className="mt-4 text-center text-sm">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
