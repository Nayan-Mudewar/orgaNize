import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  if (loading) return <p className="p-6">Loading tasks...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <h2 className="font-semibold">{task.title}</h2>
            <p>Status: {task.status}</p>
            <p>Assigned to: {task.assignedTo || "Unassigned"}</p>
            <p>Due: {task.dueDate || "No due date"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
