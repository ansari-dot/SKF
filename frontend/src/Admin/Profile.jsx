import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    bio: '',
    joinedDate: '',
    lastLogin: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        phone: user.phone || '',
        bio: user.bio || '',
        joinedDate: user.createdAt || new Date().toISOString(),
        lastLogin: user.lastLogin || new Date().toISOString()
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/user/profile`, profileData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
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
        <h1 className="display-6 fw-bold mb-2">👤 Profile Management</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Admin</li>
            <li className="breadcrumb-item active">Profile</li>
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
                  {getInitials(profileData.name || 'User')}
                  <div className="role-badge">
                    {getRoleIcon(profileData.role)}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <h3 className="fw-bold mb-2">{profileData.name || 'User Name'}</h3>
              <div className="mb-3">
                <span className={`admin-badge ${getRoleColor(profileData.role)}`}>
                  {getRoleIcon(profileData.role)} {profileData.role || 'User'}
                </span>
              </div>
              <p className="text-muted mb-4">
                <i className="fas fa-envelope me-2"></i>
                {profileData.email}
              </p>

              {/* Stats */}
              <div className="row text-center mb-4">
                <div className="col-6">
                  <div className="border-end">
                    <h4 className="fw-bold mb-1 text-success">
                      {Math.floor((new Date() - new Date(profileData.joinedDate)) / (1000 * 60 * 60 * 24))}
                    </h4>
                    <small className="text-muted">Days Active</small>
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="fw-bold mb-1 text-primary">
                    {profileData.role === 'admin' ? '∞' : '24/7'}
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
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>🔧 Account Information</h3>
            </div>
            <div className="admin-card-body">
              <div className="row">
                {/* Name */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-user me-2"></i>Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="form-control-plaintext fw-semibold">
                      {profileData.name || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-envelope me-2"></i>Email Address
                  </label>
                  <div className="form-control-plaintext fw-semibold">
                    {profileData.email}
                    <small className="d-block text-muted">Cannot be changed</small>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-phone me-2"></i>Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="form-control-plaintext fw-semibold">
                      {profileData.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Role */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-shield-alt me-2"></i>Role
                  </label>
                  <div className="form-control-plaintext">
                    <span className={`admin-badge ${getRoleColor(profileData.role)}`}>
                      {getRoleIcon(profileData.role)} {profileData.role || 'User'}
                    </span>
                    <small className="d-block text-muted mt-1">Assigned by system administrator</small>
                  </div>
                </div>

                {/* Bio */}
                <div className="col-12 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-quote-left me-2"></i>Bio / About
                  </label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about yourself and your role in the foundation..."
                    />
                  ) : (
                    <div className="form-control-plaintext" style={{ minHeight: '60px' }}>
                      {profileData.bio || 'No bio provided yet. Share your story and role in serving the community.'}
                    </div>
                  )}
                </div>

                {/* Account Details */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-calendar-plus me-2"></i>Joined Date
                  </label>
                  <div className="form-control-plaintext fw-semibold">
                    {formatDate(profileData.joinedDate)}
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-clock me-2"></i>Last Login
                  </label>
                  <div className="form-control-plaintext fw-semibold">
                    {formatDate(profileData.lastLogin)}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="text-end mt-4">
                  <button
                    className="btn admin-btn-success me-2"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
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
                    className="btn admin-btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
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
                    <h4 className="fw-bold mb-1">Today</h4>
                    <small className="text-muted">Last Login</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="activity-stat">
                    <div className="stat-icon text-success">
                      <i className="fas fa-tasks"></i>
                    </div>
                    <h4 className="fw-bold mb-1">Active</h4>
                    <small className="text-muted">Status</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="activity-stat">
                    <div className="stat-icon text-warning">
                      <i className="fas fa-heart"></i>
                    </div>
                    <h4 className="fw-bold mb-1">Serving</h4>
                    <small className="text-muted">Community</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="activity-stat">
                    <div className="stat-icon text-info">
                      <i className="fas fa-hands-helping"></i>
                    </div>
                    <h4 className="fw-bold mb-1">Helping</h4>
                    <small className="text-muted">Others</small>
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
      </div>
    </div>
  );
};

export default Profile;
