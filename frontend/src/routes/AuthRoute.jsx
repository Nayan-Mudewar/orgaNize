import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRoute({ children }) {
  const { token } = useAuth();
  
  // Redirect to dashboard if already authenticated
  return token ? <Navigate to="/dashboard" replace /> : children;
}