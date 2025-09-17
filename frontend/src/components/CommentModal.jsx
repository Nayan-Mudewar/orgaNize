import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CommentModal({ taskId, onClose, onCreated }) {
  const { token, user } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert('You must be logged in to comment');
    if (!token) return alert('Authentication token missing. Please login again.');
    if (!text.trim()) return;
    setLoading(true);
    try {
      const payload = { userid: user.id, taskid: taskId, text: text.trim() };
      const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comments`, payload, {
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

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="Write a comment..."
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
            <button type="submit" disabled={loading} className="px-3 py-1 rounded bg-blue-600 text-white">{loading ? 'Posting...' : 'Post'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
