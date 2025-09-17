import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'Planned',
    startDate: '',
    endDate: '',
    impact: {
      familiesAssisted: 0,
      otherImpact: ''
    },
    image: '/placeholder-logo.png'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('/placeholder-logo.png');
  
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/project/get`);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImpactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      impact: {
        ...prev.impact,
        [field]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      status: 'Planned',
      startDate: '',
      endDate: '',
      impact: {
        familiesAssisted: 0,
        otherImpact: ''
      },
      image: '/placeholder-logo.png'
    });
    setSelectedFile(null);
    setImagePreview('/placeholder-logo.png');
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add file if selected
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }
      
      // Add other form data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('endDate', formData.endDate);
      formDataToSend.append('impact', JSON.stringify(formData.impact));

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingProject) {
        await axios.put(`${API_URL}/project/update/${editingProject._id}`, formDataToSend, config);
        toast.success('Project updated successfully');
      } else {
        await axios.post(`${API_URL}/project/add`, formDataToSend, config);
        toast.success('Project added successfully');
      }

      setShowForm(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      status: project.status,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      impact: project.impact,
      image: project.image
    });
    setSelectedFile(null);
    setImagePreview(project.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/project/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
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
            <h1 className="display-6 fw-bold mb-0">Projects Management</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Project
            </button>
          </div>

          {/* Project Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Project Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="form-control"
                        accept="image/*"
                      />
                      <small className="text-muted">Upload an image file (JPG, PNG, WebP)</small>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter project location"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="Planned">Planned</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="form-control"
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
                      placeholder="Enter project description"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Families Assisted</label>
                      <input
                        type="number"
                        value={formData.impact.familiesAssisted}
                        onChange={(e) => handleImpactChange('familiesAssisted', parseInt(e.target.value) || 0)}
                        className="form-control"
                        placeholder="Number of families assisted"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Other Impact</label>
                      <input
                        type="text"
                        value={formData.impact.otherImpact}
                        onChange={(e) => handleImpactChange('otherImpact', e.target.value)}
                        className="form-control"
                        placeholder="Other impact details"
                      />
          </div>
        </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
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

          {/* Projects List */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Impact</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No projects found. Add your first project above.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project._id}>
                      <td>
                        <img
                          src={project.image.startsWith('/uploads/') ? `${API_URL.replace('/api', '')}${project.image}` : project.image}
                          alt={project.title}
                          className="rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/placeholder-logo.png';
                          }}
                        />
                      </td>
                      <td>
                        <strong>{project.title}</strong>
                      </td>
                      <td>{project.location}</td>
                      <td>
                        <span className={`badge bg-${
                          project.status === 'Completed' ? 'success' : 
                          project.status === 'Ongoing' ? 'warning' : 'secondary'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {project.impact.familiesAssisted} families<br/>
                          {project.impact.otherImpact}
                        </small>
                      </td>
                      <td>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(project)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(project._id)}
                            title="Delete"
          >
                            <i className="fas fa-trash"></i>
          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;