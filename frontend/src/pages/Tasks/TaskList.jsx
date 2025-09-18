import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function TaskList() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
