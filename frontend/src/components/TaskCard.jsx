import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ActionButtons from "./ActionButtons";
import TaskEditForm from "./TaskEditForm";
import CommentPreview from "./CommentPreview";
import CommentModal from "./CommentModal";

export default function TaskCard({ task, onTaskDeleted, onTaskUpdated, onAddComment }) {
  const { token } = useAuth();
  const getAuthHeader = (t) => {
    if (!t) return {};
    return { Authorization: t.startsWith('Bearer ') ? t : `Bearer ${t}` };
  };
  const [isEditing, setIsEditing] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate?.split("T")[0]
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task.id}`, {
        headers: getAuthHeader(token)
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
        { headers: getAuthHeader(token) }
      );

      onTaskUpdated(task.id, response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
      alert("Failed to update task. Please ensure all fields are valid.");
    }
  };

  const fetchComments = async () => {
    if (!task?.id) return;
    setCommentsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/comments/task/${task.id}`, {
        headers: getAuthHeader(token)
      });
      setComments(res.data || []);
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.id]);

  const handleCreateComment = (created) => {
    // prepend created comment
    setComments(prev => [created, ...prev]);
    if (onAddComment) onAddComment(task.id, created);
  };

  return (
    <div className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition space-y-2">
      {isEditing ? (
        <TaskEditForm
          form={editForm}
          setForm={setEditForm}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSave}
        />
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
          <div>
            <ActionButtons onEdit={() => setIsEditing(true)} onDelete={handleDelete} />
            <CommentPreview comments={comments} loading={commentsLoading} />
            <div className="absolute right-2 bottom-2 z-10">
              <button
                type="button"
                aria-label="Add comment"
                onClick={() => setShowCommentModal(true)}
                className="bg-white p-2 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                title="Add comment"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.21 0-2.357-.172-3.4-.49L3 20l1.49-4.6A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {showCommentModal && (
        <CommentModal
          taskId={task.id}
          onClose={() => setShowCommentModal(false)}
          onCreated={handleCreateComment}
        />
      )}
    </div>
  );
}
