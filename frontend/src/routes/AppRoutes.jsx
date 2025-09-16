import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";
import Welcome from "../pages/Welcome";
import TaskList from "../pages/Tasks/TaskList";
import AuthRoute from "./AuthRoute";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Welcome />} />

        {/* Auth routes - accessible only when not logged in */}
        <Route path="/login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />

        {/* Protected routes - require authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        } />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

