import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentVerse, setCurrentVerse] = useState({
    arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
    translation: "And whoever does an atom's weight of good will see it.",
    reference: "Quran 99:7"
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Islamic verses for profile inspiration
  const islamicContent = [
    {
      arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
      translation: "And whoever does an atom's weight of good will see it.",
      reference: "Quran 99:7"
    },
    {
      arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
      translation: "Actions are but by intention.",
      reference: "Hadith - Bukhari"
    },
    {
      arabic: "خَيْرُ النَّاسِ أَنفَعُهُمْ لِلنَّاسِ",
      translation: "The best of people are those who are most beneficial to others.",
      reference: "Hadith"
    },
    {
      arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
      translation: "And cooperate in righteousness and piety.",
      reference: "Quran 5:2"
    }
  ];

  // Rotate verses every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicContent.length);
      setCurrentVerse(islamicContent[randomIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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

    try {
      const response = await axios.put(`${API_URL}/user/profile`, {
        username: formData.username,
        email: formData.email
      });

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/user/change-password`, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      toast.success('Password changed successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'admin-badge-danger';
      case 'moderator': return 'admin-badge-warning';
      default: return 'admin-badge-success';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'moderator': return '🛡️';
      default: return '👤';
    }
  };

  return (
    <div className="container-fluid py-4" style={{ height: '100vh', overflow: 'auto' }}>
      {/* Header */}
      <div className="admin-header mb-4">
        <h1 className="display-6 fw-bold mb-2">👤 User Profile</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Admin</li>
            <li className="breadcrumb-item active">User Profile</li>
          </ol>
        </nav>
      </div>

      {/* Islamic Verse Card */}
      <div className="admin-card mb-4 islamic-content-card">
        <div className="admin-card-body text-center">
          <div className="islamic-verse-container">
            <div className="arabic-text mb-3">
              {currentVerse.arabic}
            </div>
            <div className="translation mb-2">
              "{currentVerse.translation}"
            </div>
            <small className="reference">
              — {currentVerse.reference}
            </small>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Profile Summary Card */}
        <div className="col-lg-4 mb-4">
          <div className="admin-card h-100">
            <div className="admin-card-body text-center">
              {/* Avatar */}
              <div className="profile-avatar-container mb-4">
                <div className="profile-avatar">
                  {getInitials(formData.username || user?.username || 'User')}
                  <div className="role-badge">
                    {getRoleIcon(user?.role)}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <h3 className="fw-bold mb-2">{formData.username || user?.username || 'User Name'}</h3>
              <div className="mb-3">
                <span className={`admin-badge ${getRoleColor(user?.role)}`}>
                  {getRoleIcon(user?.role)} {user?.role || 'User'}
                </span>
              </div>
              <p className="text-muted mb-4">
                <i className="fas fa-envelope me-2"></i>
                {formData.email || user?.email}
              </p>

              {/* Stats */}
              <div className="row text-center mb-4">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="fw-bold mb-1 text-success">
                      {user?.createdAt ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0}
                    </h4>
                    <small className="text-muted">Days Active</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="fw-bold mb-1 text-primary">
                    {user?.role === 'admin' ? '∞' : '24/7'}
                  </h4>
                  <small className="text-muted">Dedication</small>
                </div>
              </div>

              {/* Edit Button */}
              <button
                className={`btn w-100 ${isEditing ? 'admin-btn-danger' : 'admin-btn-primary'}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'} me-2`}></i>
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="col-lg-8">
          <div className="admin-card mb-4">
            <div className="admin-card-header">
              <h3>🔧 Account Information</h3>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleProfileUpdate}>
                <div className="row">
                  {/* Username */}
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-user me-2"></i>Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <div className="form-control-plaintext fw-semibold">
                        {formData.username || 'Not provided'}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <div className="form-control-plaintext fw-semibold">
                        {formData.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="text-end mt-4">
                    <button
                      type="submit"
                      className="btn admin-btn-success me-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="admin-spinner-sm me-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn admin-btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>🔒 Change Password</h3>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handlePasswordChange}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-lock me-2"></i>Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-key me-2"></i>New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-check-circle me-2"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn admin-btn-warning"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="admin-spinner-sm me-2"></div>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-shield-alt me-2"></i>
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="admin-card mt-4">
        <div className="admin-card-header">
          <h3>📊 Activity Summary</h3>
        </div>
        <div className="admin-card-body">
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="activity-stat">
                <div className="stat-icon text-primary">
                  <i className="fas fa-sign-in-alt"></i>
                </div>
                <h4 className="fw-bold mb-1">Active</h4>
                <small className="text-muted">Status</small>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="activity-stat">
                <div className="stat-icon text-success">
                  <i className="fas fa-tasks"></i>
                </div>
                <h4 className="fw-bold mb-1">Serving</h4>
                <small className="text-muted">Community</small>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="activity-stat">
                <div className="stat-icon text-warning">
                  <i className="fas fa-heart"></i>
                </div>
                <h4 className="fw-bold mb-1">Helping</h4>
                <small className="text-muted">Others</small>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="activity-stat">
                <div className="stat-icon text-info">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h4 className="fw-bold mb-1">Growing</h4>
                <small className="text-muted">Together</small>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div className="islamic-decoration">
              <span>🤲</span>
              <span className="mx-3">May Allah bless your service to humanity</span>
              <span>🤲</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;