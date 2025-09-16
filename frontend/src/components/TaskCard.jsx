import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TaskCard({ task, onTaskDeleted, onTaskUpdated }) {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    id: task.id, // Add this line
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate?.split("T")[0] // Added optional chaining
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTaskDeleted(task.id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleSave = async () => {
    try {
      // Format the date to include time (midnight) in ISO format
      const formattedData = {
        id: task.id, // Add the task ID here
        ...editForm,
        dueDate: editForm.dueDate ? `${editForm.dueDate}T00:00:00` : null
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`,
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onTaskUpdated(task.id, response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
      alert("Failed to update task. Please ensure all fields are valid.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition space-y-2">
      {isEditing ? (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSave();
        }} className="space-y-2">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="border rounded px-2 py-1 w-full"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="border rounded px-2 py-1 w-full"
          />
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <input
            type="date"
            value={editForm.dueDate}
            onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
            className="border rounded px-2 py-1 w-full"
          />
          <div className="flex gap-2">
            <button 
                type="submit"
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
                Update
            </button>
            <button 
                type="button"
                onClick={() => setIsEditing(false)} 
                className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
            >
                Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>

          <div className="text-sm text-gray-500">
            <p>Status: <span className="font-medium">{task.status}</span></p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
          </div>

          <div className="text-sm mt-2">
            <p className="font-semibold">Created By:</p>
            <p>{task.createdBy?.name} ({task.createdBy?.email})</p>
          </div>

          <div className="text-sm mt-2">
            <p className="font-semibold">Assigned To:</p>
            <p>{task.assignedTo?.name} ({task.assignedTo?.email})</p>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
