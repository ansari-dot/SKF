import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    isActive: true
  });
  const [currentVerse, setCurrentVerse] = useState({
    arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    translation: "And cooperate in righteousness and piety.",
    reference: "Quran 5:2"
  });

  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  // Islamic verses for user management
  const islamicContent = [
    {
      arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
      translation: "And cooperate in righteousness and piety.",
      reference: "Quran 5:2"
    },
    {
      arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
      translation: "The believers are but brothers.",
      reference: "Quran 49:10"
    },
    {
      arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
      translation: "The best of people are those who are most beneficial to others.",
      reference: "Hadith - Daraqutni"
    }
  ];

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/user/all`);
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      // Mock data for demonstration
      setUsers([
        {
          _id: '1',
          firstName: 'Ahmed',
          lastName: 'Hassan',
          email: 'ahmed@example.com',
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        },
        {
          _id: '2',
          firstName: 'Fatima',
          lastName: 'Ali',
          email: 'fatima@example.com',
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        },
        {
          _id: '3',
          firstName: 'Omar',
          lastName: 'Khan',
          email: 'omar@example.com',
          role: 'moderator',
          isActive: false,
          createdAt: new Date().toISOString(),
          lastLogin: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/create`, formData);
      toast.success('User created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  // Update user status
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/user/status/${userId}`, {
        isActive: !currentStatus
      });
      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`${API_URL}/user/delete/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
      if (showModal) setShowModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user',
      isActive: true
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'admin-badge-danger';
      case 'moderator': return 'admin-badge-warning';
      default: return 'admin-badge-primary';
    }
  };

  // Change Islamic content periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicContent.length);
      setCurrentVerse(islamicContent[randomIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header with Islamic Content */}
      <div className="admin-header mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-6 fw-bold mb-2">User Management</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Admin</li>
                <li className="breadcrumb-item active">User Management</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-4">
            <div className="islamic-verse-card p-3 text-center" style={{background: 'var(--gradient-light)', borderRadius: '12px', border: '1px solid var(--border-color)'}}>
              <div className="arabic-text mb-2" style={{fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-green)'}}>
                {currentVerse.arabic}
              </div>
              <div className="translation mb-1" style={{fontSize: '0.9rem', fontStyle: 'italic'}}>
                {currentVerse.translation}
              </div>
              <small className="reference text-muted">- {currentVerse.reference}</small>
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="stat-card bg-primary-custom fade-in">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <span>👥</span>
              </div>
              <div className="ms-3">
                <h3 className="stat-title">Total Users</h3>
                <p className="stat-value">{users.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-success-custom fade-in">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <span>✅</span>
              </div>
              <div className="ms-3">
                <h3 className="stat-title">Active Users</h3>
                <p className="stat-value">{users.filter(u => u.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-warning-custom fade-in">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <span>👑</span>
              </div>
              <div className="ms-3">
                <h3 className="stat-title">Admins</h3>
                <p className="stat-value">{users.filter(u => u.role === 'admin').length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card bg-info-custom fade-in">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <span>🔒</span>
              </div>
              <div className="ms-3">
                <h3 className="stat-title">Inactive Users</h3>
                <p className="stat-value">{users.filter(u => !u.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Users Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3>👤 Manage Users</h3>
            <button
              className="btn admin-btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <span className="me-2">➕</span>
              Add New User
            </button>
          </div>
        </div>
        <div className="admin-card-body">
          {users.length === 0 ? (
            <div className="admin-alert admin-alert-info">No users found.</div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="user-avatar me-3" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                            <small className="text-muted">ID: {user._id}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`admin-badge ${getRoleBadgeColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge ${user.isActive ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>{formatDate(user.lastLogin)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                            className="btn btn-sm admin-btn-primary"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user._id, user.isActive)}
                            className={`btn btn-sm ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                          >
                            {user.isActive ? '🔒 Deactivate' : '✅ Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="btn btn-sm btn-danger"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="modal show d-block admin-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">➕ Create New User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <form onSubmit={handleCreateUser}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="admin-form-label">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="admin-form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="admin-form-label">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="admin-form-control"
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="admin-form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="admin-form-control"
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="admin-form-label">Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="admin-form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="admin-form-label">Role *</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="admin-form-control"
                        required
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3 d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="form-check-input"
                          id="isActive"
                        />
                        <label className="form-check-label" htmlFor="isActive">
                          Active User
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn admin-btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn admin-btn-primary">
                    <span className="me-2">✅</span> Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal show d-block admin-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">👤 User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    <div className="user-avatar-large mx-auto mb-3" style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}>
                      {selectedUser.firstName?.charAt(0)}{selectedUser.lastName?.charAt(0)}
                    </div>
                    <h5>{selectedUser.firstName} {selectedUser.lastName}</h5>
                    <span className={`admin-badge ${getRoleBadgeColor(selectedUser.role)}`}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                  <div className="col-md-8">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item">
                        <strong>Email:</strong> {selectedUser.email}
                      </div>
                      <div className="list-group-item">
                        <strong>Status:</strong> 
                        <span className={`admin-badge ms-2 ${selectedUser.isActive ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                          {selectedUser.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="list-group-item">
                        <strong>User ID:</strong> {selectedUser._id}
                      </div>
                      <div className="list-group-item">
                        <strong>Created:</strong> {formatDate(selectedUser.createdAt)}
                      </div>
                      <div className="list-group-item">
                        <strong>Last Login:</strong> {formatDate(selectedUser.lastLogin)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn admin-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => handleToggleStatus(selectedUser._id, selectedUser.isActive)}
                  className={`btn ${selectedUser.isActive ? 'btn-warning' : 'btn-success'}`}
                >
                  {selectedUser.isActive ? '🔒 Deactivate' : '✅ Activate'}
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedUser._id)}
                  className="btn btn-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
