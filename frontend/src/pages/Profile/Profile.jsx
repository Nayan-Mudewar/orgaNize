import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile({ isOpen, onClose }) {
    // If isOpen is undefined (component rendered by route), treat as page (open)
    const isRouteRender = typeof isOpen === 'undefined';
    const visible = isRouteRender ? true : !!isOpen;
    const navigate = useNavigate();

    const { token, user, setUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    // Reset form when profile changes
    useEffect(() => {
        if (profile) {
            setEditForm({
                name: profile.name || '',
                email: profile.email || ''
            });
        }
    }, [profile]);

    useEffect(() => {
        if (!visible || !user?.id || !token) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/users/${user.id}`,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (response.data) {
                    setProfile(response.data);
                } else {
                    throw new Error('No data received from server');
                }
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError(err.response?.data?.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [visible, user?.id, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user?.id || !token) {
            setError('Authentication required');
            return;
        }

        try {
            setError(null);
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/update/${user.id}`,
                editForm,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                setProfile(response.data);
                setUser(response.data);
                setIsEditing(false);
                // show transient success message
                setSuccessMessage('Profile updated successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
        }
    };

    if (!visible) return null;

    const handleClose = () => {
        if (onClose) return onClose();
        // when opened via route, navigate back to dashboard (or welcome)
        navigate('/dashboard');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <button 
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-4">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                ) : profile && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-3xl text-white font-semibold">
                                    {profile.name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600">Name</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className="w-full border rounded px-3 py-2 mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                        className="w-full border rounded px-3 py-2 mt-1"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="border-b pb-2">
                                    <label className="block text-sm text-gray-600">Name</label>
                                    <div className="text-lg">{profile.name}</div>
                                </div>
                                <div className="border-b pb-2">
                                    <label className="block text-sm text-gray-600">Email</label>
                                    <div className="text-lg">{profile.email}</div>
                                </div>
                                <div className="border-b pb-2">
                                    <label className="block text-sm text-gray-600">Role</label>
                                    <div className="text-lg">{profile.role || 'User'}</div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}