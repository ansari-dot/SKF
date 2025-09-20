import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Opportunity = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Volunteer',
    location: '',
    duration: '',
    description: '',
    requirements: [''],
    applicationDeadline: '',
    contactEmail: '',
    status: 'Active',

  });

  
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  // Fetch opportunities
  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/opportunities`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpportunities(response.data.opportunities || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementsChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };



  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Volunteer',
      location: '',
      duration: '',
      description: '',
      requirements: [''],
      applicationDeadline: '',
      contactEmail: '',
      status: 'Active',
      image: '/placeholder-logo.png'
    });

    setEditingOpportunity(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      const formDataToSend = {};
      
      // Add other form data
      formDataToSend.title = formData.title;
      formDataToSend.type = formData.type;
      formDataToSend.location = formData.location;
      formDataToSend.duration = formData.duration;
      formDataToSend.description = formData.description;
      formDataToSend.requirements = formData.requirements.filter(req => req.trim() !== '');
      formDataToSend.applicationDeadline = formData.applicationDeadline;
      formDataToSend.contactEmail = formData.contactEmail;
      formDataToSend.status = formData.status;

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,

        }
      };

      if (editingOpportunity) {
        await axios.put(`${API_URL}/admin/opportunities/${editingOpportunity._id}`, formDataToSend, config);
        toast.success('Opportunity updated successfully');
      } else {
        await axios.post(`${API_URL}/admin/opportunities`, formDataToSend, config);
        toast.success('Opportunity added successfully');
      }

      setShowForm(false);
      resetForm();
      fetchOpportunities();
    } catch (error) {
      console.error('Error saving opportunity:', error);
      toast.error(error.response?.data?.message || 'Failed to save opportunity');
    }
  };

  const handleEdit = (opportunity) => {
    setEditingOpportunity(opportunity);
    setFormData({
      title: opportunity.title,
      type: opportunity.type,
      location: opportunity.location,
      duration: opportunity.duration,
      description: opportunity.description,
      requirements: opportunity.requirements || [''],
      applicationDeadline: opportunity.applicationDeadline ? new Date(opportunity.applicationDeadline).toISOString().split('T')[0] : '',
      contactEmail: opportunity.contactEmail,
      status: opportunity.status,

    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/opportunities/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Opportunity deleted successfully');
      fetchOpportunities();
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card admin-card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold mb-0">Opportunities Management</h1>
            <button
              className="btn btn-primary admin-btn"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Opportunity
            </button>
          </div>

          {/* Opportunity Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingOpportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Opportunity Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Type *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="Volunteer">Volunteer</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Job">Job</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration *</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="e.g., 3 months, Part-time"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Requirements</label>
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="d-flex mb-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleRequirementsChange(index, e.target.value)}
                          className="form-control me-2"
                          placeholder="Enter requirement"
                        />
                        {formData.requirements.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger admin-btn"
                            onClick={() => removeRequirement(index)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm admin-btn"
                      onClick={addRequirement}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Requirement
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Application Deadline</label>
                      <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Contact Email *</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>



                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary admin-btn">
                      {editingOpportunity ? 'Update' : 'Add'} Opportunity
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary admin-btn"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Opportunities Table */}
          <div className="table-responsive">
            <table className="table admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opportunity) => (
                  <tr key={opportunity._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={opportunity.image}
                          alt={opportunity.title}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded-circle me-3"
                        />
                        <div>
                          <strong>{opportunity.title}</strong>
                          <br />
                          <small className="text-muted">{opportunity.duration}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge bg-${
                        opportunity.type === 'Volunteer' ? 'info' :
                        opportunity.type === 'Sponsorship' ? 'warning' :
                        opportunity.type === 'Partnership' ? 'success' :
                        opportunity.type === 'Job' ? 'primary' : 'secondary'
                      }`}>
                        {opportunity.type}
                      </span>
                    </td>
                    <td>{opportunity.location}</td>
                    <td>
                      <span className={`badge bg-${
                        opportunity.status === 'Active' ? 'success' :
                        opportunity.status === 'Closed' ? 'danger' : 'warning'
                      }`}>
                        {opportunity.status}
                      </span>
                    </td>
                    <td>
                      {opportunity.applicationDeadline ? 
                        new Date(opportunity.applicationDeadline).toLocaleDateString() : 
                        'No deadline'
                      }
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary admin-btn me-2"
                        onClick={() => handleEdit(opportunity)}
                      >
                        update
                      </button>
                      <button
                        className="btn btn-sm btn-danger admin-btn"
                        onClick={() => handleDelete(opportunity._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {opportunities.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No opportunities found</h5>
              <p className="text-muted">Click "Add New Opportunity" to create your first opportunity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunity;