import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">My App</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-gray-300">
            Dashboard
          </a>
          <a href="#" className="block hover:text-gray-300">
            Profile
          </a>
          <a href="#" className="block hover:text-gray-300">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Welcome back 👋</h2>
          <p className="text-gray-600">
            This is your dashboard main content area. Add your widgets,
            charts, and other information here.
          </p>
        </main>
      </div>
    </div>
  );
}
