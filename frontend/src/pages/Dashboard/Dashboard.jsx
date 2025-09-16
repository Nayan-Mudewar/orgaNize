import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCard";
export default function Dashboard() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(Array.isArray(res.data) ? res.data : []); // Ensure tasks is always an array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

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

          {/* Loading state */}
          {loading && <p className="text-gray-500">Loading tasks...</p>}

          {/* Error state */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Task cards */}
          {!loading && tasks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && tasks.length === 0 && (
            <p className="text-gray-500 text-center mt-8">
              No tasks found. Create a new one!
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
