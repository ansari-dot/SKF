import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import getAbsoluteImageUrl from '../utils/imageUtils';
import { FaEdit, FaTrash, FaPlus, FaMinus, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    location: '',
    category: 'Relief',
    status: 'Planned',
    isFeatured: false,
    startDate: '',
    endDate: '',
    keyFeatures: ['', '', ''],
    impact: {
      familiesAssisted: 0,
      childrenBenefited: 0,
      otherImpact: ''
    },
    images: [],
    documents: [],
    partners: []
  });
  const [selectedFiles, setSelectedFiles] = useState({
    images: [],
    documents: []
  });
  const [filePreviews, setFilePreviews] = useState({
    images: [],
    documents: []
  });
  const [newPartner, setNewPartner] = useState({ name: '', logo: null, website: '' });

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeyFeatureChange = (index, value) => {
    const newKeyFeatures = [...formData.keyFeatures];
    newKeyFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      keyFeatures: newKeyFeatures
    }));
  };

  const addKeyFeature = () => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, '']
    }));
  };

  const removeKeyFeature = (index) => {
    const newKeyFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      keyFeatures: newKeyFeatures
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

  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newFiles = [...selectedFiles[type], ...files];
    setSelectedFiles(prev => ({
      ...prev,
      [type]: newFiles
    }));

    // Create previews
    const previews = await Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          url: e.target.result,
          name: file.name,
          type: file.type
        });
        reader.readAsDataURL(file);
      });
    }));

    setFilePreviews(prev => ({
      ...prev,
      [type]: [...prev[type], ...previews]
    }));
  };

  const removeFile = (type, index) => {
    const newFiles = [...selectedFiles[type]];
    newFiles.splice(index, 1);
    setSelectedFiles(prev => ({
      ...prev,
      [type]: newFiles
    }));

    const newPreviews = [...filePreviews[type]];
    newPreviews.splice(index, 1);
    setFilePreviews(prev => ({
      ...prev,
      [type]: newPreviews
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      shortDescription: '',
      detailedDescription: '',
      location: '',
      category: 'Relief',
      status: 'Planned',
      isFeatured: false,
      startDate: '',
      endDate: '',
      keyFeatures: ['', '', ''],
      impact: {
        familiesAssisted: 0,
        childrenBenefited: 0,
        otherImpact: ''
      },
      images: [],
      documents: [],
      partners: []
    });
    setSelectedFiles({
      images: [],
      documents: []
    });
    setFilePreviews({
      images: [],
      documents: []
    });
    setNewPartner({ name: '', logo: null, website: '' });
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Add files to FormData
      Object.entries(selectedFiles).forEach(([type, files]) => {
        files.forEach((file, index) => {
          formDataToSend.append(type, file);
        });
      });

      // Add form data
      const projectData = {
        ...formData,
        // Don't include file arrays in the JSON data
        images: undefined,
        documents: undefined,
        // Convert keyFeatures to remove empty strings
        keyFeatures: formData.keyFeatures.filter(feature => feature.trim() !== '')
      };

      // Add the project data as a JSON string
      formDataToSend.append('projectData', JSON.stringify(projectData));

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

    // Set form data with project details
    const projectData = {
      title: project.title,
      shortDescription: project.shortDescription || '',
      detailedDescription: project.detailedDescription || '',
      location: project.location || '',
      category: project.category || 'Relief',
      status: project.status || 'Planned',
      isFeatured: project.isFeatured || false,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      keyFeatures: project.keyFeatures?.length > 0 ? project.keyFeatures : ['', '', ''],
      impact: {
        familiesAssisted: project.impact?.familiesAssisted || 0,
        childrenBenefited: project.impact?.childrenBenefited || 0,
        otherImpact: project.impact?.otherImpact || ''
      },
      images: project.images || [],
      documents: project.documents || [],
      partners: project.partners || []
    };

    setFormData(projectData);

    // Set file previews for existing files
    const previews = {
      images: (project.images || []).map(img => ({
        url: getAbsoluteImageUrl(img.url),
        name: img.filename || 'image.jpg',
        type: img.mimetype || 'image/jpeg'
      })),
      documents: (project.documents || []).map(doc => ({
        url: getAbsoluteImageUrl(doc.url),
        name: doc.filename || 'document.pdf',
        type: doc.mimetype || 'application/pdf'
      }))
    };

    setFilePreviews(previews);
    setSelectedFiles({ images: [], documents: [] });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/project/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const toggleFeaturedStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/project/toggle-featured/${id}`,
        { isFeatured: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Project ${!currentStatus ? 'marked as featured' : 'removed from featured'}`);
      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error(error.response?.data?.message || 'Failed to update featured status');
    }
  };

  const toggleProjectStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await axios.put(
        `${API_URL}/project/toggle-status/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Project status updated to ${newStatus}`);
      fetchProjects();
    } catch (error) {
      console.error('Error toggling project status:', error);
      toast.error(error.response?.data?.message || 'Failed to update project status');
    }
  };

  const handleAddPartner = () => {
    if (!newPartner.name || !newPartner.website) {
      toast.error('Please provide partner name and website');
      return;
    }

    setFormData(prev => ({
      ...prev,
      partners: [...prev.partners, { 
        name: newPartner.name, 
        logo: newPartner.logo,
        website: newPartner.website 
      }]
    }));

    setNewPartner({ name: '', logo: null, website: '' });
  };

  const handleRemovePartner = (index) => {
    const updatedPartners = [...formData.partners];
    updatedPartners.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      partners: updatedPartners
    }));
  };

  const handlePartnerLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPartner(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
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
                    <div className="col-md-6 mb-3">
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
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="Relief">Relief</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Water">Water</option>
                        <option value="Orphan">Orphan Support</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3 d-flex align-items-end">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isFeatured"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="isFeatured">
                          Featured Project
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label">Short Description *</label>
                      <input
                        type="text"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="A brief summary of the project (max 150 characters)"
                        maxLength="150"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="City, Country"
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
                        <option value="Planned">Planned</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="Relief">Relief</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Water">Water</option>
                        <option value="Orphan">Orphan Support</option>
                        <option value="Other">Other</option>
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
                    <label className="form-label">Detailed Description *</label>
                    <textarea
                      name="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="6"
                      placeholder="Enter detailed project description"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Key Features</label>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-primary"
                        onClick={addKeyFeature}
                      >
                        <FaPlus className="me-1" /> Add Feature
                      </button>
                    </div>
                    {formData.keyFeatures.map((feature, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                          className="form-control"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline-danger"
                          onClick={() => removeKeyFeature(index)}
                          disabled={formData.keyFeatures.length <= 1}
                        >
                          <FaMinus />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Families Assisted</label>
                      <input
                        type="number"
                        value={formData.impact.familiesAssisted}
                        onChange={(e) => handleImpactChange('familiesAssisted', parseInt(e.target.value) || 0)}
                        className="form-control"
                        placeholder="Number of families"
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Children Benefited</label>
                      <input
                        type="number"
                        value={formData.impact.childrenBenefited}
                        onChange={(e) => handleImpactChange('childrenBenefited', parseInt(e.target.value) || 0)}
                        className="form-control"
                        placeholder="Number of children"
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Other Impact</label>
                      <input
                        type="text"
                        value={formData.impact.otherImpact}
                        onChange={(e) => handleImpactChange('otherImpact', e.target.value)}
                        className="form-control"
                        placeholder="E.g., Schools built, wells dug, etc."
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-3">
                    <label className="form-label">Project Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'images')}
                      className="form-control"
                    />
                    <small className="text-muted">Upload multiple images (JPG, PNG, WebP, max 5MB each)</small>

                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {filePreviews.images.map((file, index) => (
                        <div key={index} className="position-relative" style={{ width: '100px' }}>
                          <img 
                            src={file.url} 
                            alt={`Preview ${index}`} 
                            className="img-thumbnail"
                            style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-1 rounded-circle"
                            style={{ width: '20px', height: '20px', lineHeight: '8px' }}
                            onClick={() => removeFile('images', index)}
                            title="Remove image"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Show existing images in edit mode */}
                    {editingProject && formData.images?.length > 0 && (
                      <div className="mt-3">
                        <h6>Existing Images:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {formData.images.map((img, index) => (
                            <div key={index} className="position-relative" style={{ width: '100px' }}>
                              <img 
                                src={getAbsoluteImageUrl(img.url)} 
                                alt={`Existing ${index}`} 
                                className="img-thumbnail"
                                style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder-logo.png';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Document Upload */}
                  <div className="mb-3">
                    <label className="form-label">Project Documents</label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      onChange={(e) => handleFileChange(e, 'documents')}
                      className="form-control"
                    />
                    <small className="text-muted">Upload documents (PDF, Word, Excel, PowerPoint, Text)</small>

                    <ul className="list-group mt-2">
                      {filePreviews.documents.map((file, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="text-truncate" style={{ maxWidth: '70%' }}>{file.name}</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFile('documents', index)}
                          >
                            <FaTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Partners Section */}
                  <div className="card mb-3">
                    <div className="card-header">
                      <h6 className="mb-0">Project Partners</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3 mb-3">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Partner name"
                            value={newPartner.name}
                            onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="url"
                            className="form-control"
                            placeholder="Website URL"
                            value={newPartner.website}
                            onChange={(e) => setNewPartner({...newPartner, website: e.target.value})}
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="file"
                            className="form-control form-control-sm"
                            accept="image/*"
                            onChange={handlePartnerLogoChange}
                          />
                          <small className="text-muted">Logo (optional)</small>
                        </div>
                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleAddPartner}
                            disabled={!newPartner.name || !newPartner.website}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>

                      {formData.partners.length > 0 && (
                        <div className="table-responsive">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Website</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.partners.map((partner, index) => (
                                <tr key={index}>
                                  <td>
                                    {partner.logo ? (
                                      <img 
                                        src={partner.logo} 
                                        alt={partner.name}
                                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                        className="img-thumbnail"
                                      />
                                    ) : (
                                      <div className="bg-light d-flex align-items-center justify-content-center" 
                                        style={{ width: '40px', height: '40px' }}>
                                        <i className="fas fa-building text-muted"></i>
                                      </div>
                                    )}
                                  </td>
                                  <td className="align-middle">{partner.name}</td>
                                  <td className="align-middle">
                                    <a 
                                      href={partner.website.startsWith('http') ? partner.website : `https://${partner.website}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-decoration-none"
                                    >
                                      {partner.website.replace(/^https?:\/\//, '')}
                                    </a>
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleRemovePartner(index)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
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
                  <th>Title / Category</th>
                  <th>Location / Date</th>
                  <th>Status</th>
                  <th>Impact</th>
                  <th>Dates</th>
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
                          src={getAbsoluteImageUrl(project.image)}
                          alt={project.title}
                          className="img-fluid rounded-start"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/placeholder-logo.png';
                          }}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {project.isFeatured && (
                            <span className="badge bg-warning text-dark me-2">Featured</span>
                          )}
                          <strong>{project.title}</strong>
                        </div>
                        <small className="text-muted d-block">{project.category}</small>
                      </td>
                      <td>
                        {project.location?.address || 'N/A'}
                        {project.location?.country && (
                          <div className="text-muted small">
                            {project.location.country}
                          </div>
                        )}
                        <div className="text-muted small">
                          {project.startDate && new Date(project.startDate).toLocaleDateString()}
                          {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className={`badge bg-${
                            project.status === 'Completed' ? 'success' : 
                            project.status === 'Ongoing' ? 'primary' : 
                            project.status === 'On Hold' ? 'warning' : 'secondary'
                          } me-2`}>
                            {project.status}
                          </span>
                         
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          {project.impact.familiesAssisted > 0 && (
                            <span className="badge bg-info text-dark mb-1">
                              {project.impact.familiesAssisted} families
                            </span>
                          )}
                          {project.impact.childrenBenefited > 0 && (
                            <span className="badge bg-light text-dark mb-1">
                              {project.impact.childrenBenefited} children
                            </span>
                          )}
                          {project.impact.otherImpact && (
                            <small className="text-muted">{project.impact.otherImpact}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                          {project.updatedAt && (
                            <div className="text-muted">
                              Updated: {new Date(project.updatedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(project)}
                            title="Edit"
                          >
                            update
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => toggleFeaturedStatus(project._id, project.isFeatured)}
                            title={project.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            {project.isFeatured ? '★' : '☆'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(project._id)}
                            title="Delete"
                          >
                            delete
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