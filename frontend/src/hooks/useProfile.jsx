// src/hooks/useProfile.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function useProfile(visible) {
  const { token, user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (profile) {
      setEditForm({ name: profile.name || '', email: profile.email || '' });
    }
  }, [profile]);

  // Fetch user profile
  useEffect(() => {
    if (!visible || !user?.id || !token) { setLoading(false); return; }

    const fetchProfile = async () => {
      try {
        setLoading(true); setError(null);
        const res = await axios.get(`/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.data) throw new Error('No data received');
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [visible, user?.id, token]);

  // Update user profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/users/update/${user.id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return {
    profile, editForm, setEditForm,
    isEditing, setIsEditing,
    loading, error, handleUpdate
  };
}
