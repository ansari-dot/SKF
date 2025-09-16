import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './UserProfile.module.css';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/user/profile`,
        {
          username: formData.username,
          email: formData.email
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage('Profile updated successfully!');
      // Update user info in localStorage if needed
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/user/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage('Password changed successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>User Profile</h1>
      {(message || error) && (
        <div className={error ? styles.errorMsg : styles.successMsg}>
          {message || error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Update Form */}
        <div className={styles.formSection}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Profile</h2>
          <form onSubmit={handleProfileUpdate}>
            <label className={styles.formLabel}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.formInput} required />
            <label className={styles.formLabel}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.formInput} required />
            <button type="submit" disabled={loading} className={styles.formButton}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
        {/* Password Reset Form */}
        <div className={styles.formSection}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordReset}>
            <label className={styles.formLabel}>Current Password</label>
            <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className={styles.formInput} required />
            <label className={styles.formLabel}>New Password</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className={styles.formInput} required />
            <label className={styles.formLabel}>Confirm New Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={styles.formInput} required />
            <button type="submit" disabled={loading} className={styles.formButton}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;