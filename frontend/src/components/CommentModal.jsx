import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CommentModal({ taskId, onClose, onCreated }) {
  const { token, user } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.id ?? user?.userId ?? user?.userid ?? user?.profileId;
    if (!userId) return alert('You must be logged in to comment');
    if (!token) return alert('Authentication token missing. Please login again.');
    if (!taskId) return alert('Task is not available. Please reopen the task.');
    if (!text.trim()) return;
    setLoading(true);
    try {
      const payload = { userId, taskId, text: text.trim() };
      const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const res = await axios.post(`/api/comments`, payload, {
        headers: { Authorization: authHeader }
      });
      onCreated(res.data);
      setText('');
      onClose();
    } catch (err) {
      console.error('Failed to create comment', err);
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message;
      alert(`Failed to post comment: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-700/30 backdrop-blur-[2px]" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white/95 shadow-lg ring-1 ring-black/5 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 pt-5 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Comment
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your comment here..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
