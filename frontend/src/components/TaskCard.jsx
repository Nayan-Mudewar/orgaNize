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
    if (!token) {
      // if there's no auth token, clear comments to avoid stale state
      setComments([]);
      return;
    }
    setCommentsLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/comments/${task.id}`;
      const headers = token ? getAuthHeader(token) : {};
      const res = await axios.get(url, { headers });
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
  }, [task?.id, token]);

  const handleCreateComment = (created) => {
    // prepend created comment
    setComments(prev => [created, ...prev]);
    if (onAddComment) onAddComment(task.id, created);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBorderColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return 'hover:border-green-300';
      case 'in progress':
        return 'hover:border-blue-300';
      case 'pending':
        return 'hover:border-yellow-300';
      default:
        return 'hover:border-gray-300';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`relative bg-white p-5 rounded-xl shadow-sm border-2 border-transparent 
      ${getStatusBorderColor(task.status)} 
      hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 space-y-3 isolate`}>
      {/* Task Edit Form Layer */}
      {isEditing ? (
        <div className="absolute inset-0 bg-white rounded-xl z-10 p-5">
          <TaskEditForm
            form={editForm}
            setForm={setEditForm}
            onCancel={() => setIsEditing(false)}
            onSubmit={handleSave}
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800 flex-grow">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2 hover:line-clamp-none transition-all duration-200">
            {task.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">Due: {formatDate(task.dueDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">{formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className="flex justify-between items-start space-x-4 text-sm">
            <div className="flex-1">
              <p className="font-medium text-gray-700 mb-1">Created By</p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">{task.createdBy?.name?.charAt(0)}</span>
                </div>
                <span className="text-gray-600 truncate">{task.createdBy?.name}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-700 mb-1">Assigned To</p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs">{task.assignedTo?.name?.charAt(0)}</span>
                </div>
                <span className="text-gray-600 truncate">{task.assignedTo?.name}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-4">
            {/* Task actions row */}
            <div className="flex items-center justify-between mb-3">
              <ActionButtons onEdit={() => setIsEditing(true)} onDelete={handleDelete} />
              <button
                type="button"
                aria-label="Add comment"
                onClick={() => setShowCommentModal(true)}
                className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                title="Add comment"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.21 0-2.357-.172-3.4-.49L3 20l1.49-4.6A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
            
            {/* Comments preview */}
            {(comments.length > 0 || commentsLoading) && (
              <div className="mt-2">
                <CommentPreview comments={comments} loading={commentsLoading} />
              </div>
            )}
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
