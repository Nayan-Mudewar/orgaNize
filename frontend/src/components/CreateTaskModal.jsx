import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignedToName: '',
        status: 'TODO'
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        try {
            setLoading(true);
            const response = await axios.post(
                "/api/tasks",
                {
                    ...formData,
                    dueDate: `${formData.dueDate}T00:00:00`
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            onTaskCreated(response.data);
            onClose();
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                assignedToName: '',
                status: 'TODO'
            });
        } catch (err) {
            const status = err?.response?.status;
            const data = err?.response?.data;
            const message = typeof data === 'string' ? data : data?.message || 'Failed to create task';

            // Specific inline error if backend indicates user not found
            if (status === 404 && /user\s+not\s+found/i.test(message)) {
                setFieldErrors(prev => ({ ...prev, assignedToName: 'Assigned user not found. Please check the username.' }));
                setError('');
            } else if (status === 400) {
                // Possible validation error – try to surface details
                if (typeof data === 'object' && data) {
                    // If backend sent a map of field errors
                    if (data.errors && typeof data.errors === 'object') {
                        setFieldErrors(data.errors);
                        setError('Please fix the highlighted fields.');
                    } else {
                        setError(message);
                    }
                } else {
                    setError(message);
                }
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur-sm">
            <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto shadow-xl">
                <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            maxlength={50}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            maxlength={200}
                            className="w-full border rounded px-3 py-2"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Assigned To</label>
                        <input
                            type="assignedToName"
                            value={formData.assignedToName}
                            onChange={(e) => setFormData({ ...formData, assignedToName: e.target.value })}
                            className={`w-full border rounded px-3 py-2 ${fieldErrors.assignedToName ? 'border-red-500' : ''}`}
                            placeholder="UserName"
                        />
                        {fieldErrors.assignedToName && (
                            <p className="text-xs text-red-600 mt-1">{fieldErrors.assignedToName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}