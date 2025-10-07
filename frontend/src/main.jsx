import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";

// Global axios config: base URL and auth header
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "https://organize-4.onrender.com";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers?.Authorization) {
    config.headers = config.headers || {};
    config.headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }
  return config;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
   </AuthProvider>
  </StrictMode>
);
