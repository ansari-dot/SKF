import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    keyFeatures: [''],
    impact: {
      beneficiaries: 0,
      locations: 0,
      responseTime: ''
    },
    image: '/placeholder-logo.png',
    sustainability: ['']
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('/placeholder-logo.png');
  
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  // Fetch programs
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/program/get`);
      setPrograms(response.data.programs || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
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

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
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
      name: '',
      description: '',
      keyFeatures: [''],
      impact: {
        beneficiaries: 0,
        locations: 0,
        responseTime: ''
      },
      image: '/placeholder-logo.png',
      sustainability: ['']
    });
    setSelectedFile(null);
    setImagePreview('/placeholder-logo.png');
    setEditingProgram(null);
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('impact', JSON.stringify(formData.impact));
      
      // Add arrays
      const filteredKeyFeatures = formData.keyFeatures.filter(item => item.trim() !== '');
      const filteredSustainability = formData.sustainability.filter(item => item.trim() !== '');
      
      filteredKeyFeatures.forEach(feature => {
        formDataToSend.append('keyFeatures', feature);
      });
      
      filteredSustainability.forEach(item => {
        formDataToSend.append('sustainability', item);
      });

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingProgram) {
        await axios.put(`${API_URL}/program/update/${editingProgram._id}`, formDataToSend, config);
        toast.success('Program updated successfully');
      } else {
        await axios.post(`${API_URL}/program/add`, formDataToSend, config);
        toast.success('Program added successfully');
      }

      setShowForm(false);
      resetForm();
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      toast.error(error.response?.data?.message || 'Failed to save program');
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description,
      keyFeatures: program.keyFeatures.length > 0 ? program.keyFeatures : [''],
      impact: program.impact,
      image: program.image,
      sustainability: program.sustainability.length > 0 ? program.sustainability : ['']
    });
    setSelectedFile(null);
    setImagePreview(program.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/program/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Program deleted successfully');
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Failed to delete program');
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
            <h1 className="display-6 fw-bold mb-0">Programs Management</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Program
            </button>
          </div>

          {/* Program Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label">Program Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter program name"
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

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="4"
                      placeholder="Enter program description"
                      required
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Beneficiaries</label>
                      <input
                        type="number"
                        value={formData.impact.beneficiaries}
                        onChange={(e) => handleImpactChange('beneficiaries', parseInt(e.target.value) || 0)}
                        className="form-control"
                        placeholder="Number of beneficiaries"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Locations</label>
                      <input
                        type="number"
                        value={formData.impact.locations}
                        onChange={(e) => handleImpactChange('locations', parseInt(e.target.value) || 0)}
                        className="form-control"
                        placeholder="Number of locations"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Response Time</label>
                      <input
                        type="text"
                        value={formData.impact.responseTime}
                        onChange={(e) => handleImpactChange('responseTime', e.target.value)}
                        className="form-control"
                        placeholder="e.g., < 24 hours"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Key Features</label>
                    {formData.keyFeatures.map((item, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(index, 'keyFeatures', e.target.value)}
                          className="form-control"
                          placeholder="Enter key feature"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('keyFeatures', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addArrayItem('keyFeatures')}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Key Feature
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sustainability Features</label>
                    {formData.sustainability.map((item, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(index, 'sustainability', e.target.value)}
                          className="form-control"
                          placeholder="Enter sustainability feature"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('sustainability', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addArrayItem('sustainability')}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Sustainability Feature
                    </button>
        </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingProgram ? 'Update Program' : 'Add Program'}
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

          {/* Programs List */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Impact</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No programs found. Add your first program above.
                    </td>
                  </tr>
                ) : (
                  programs.map((program) => (
                    <tr key={program._id}>
                      <td>
                      <img
  src={
    program.image
      ? program.image.startsWith('/uploads/')
        ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${program.image}`
        : program.image
      : '/placeholder-logo.png'
  }
  alt={program.name}
  className="rounded"
  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
  onError={(e) => {
    e.target.src = '/placeholder-logo.png';
  }}
/>

                      </td>
                      <td>
                        <strong>{program.name}</strong>
                      </td>
                      <td>
                        <small className="text-muted">
                          {program.description.length > 100 
                            ? program.description.substring(0, 100) + '...' 
                            : program.description
                          }
                        </small>
                      </td>
                      <td>
                        <div>
                          <small className="text-muted">
                            {program.impact.beneficiaries} beneficiaries<br/>
                            {program.impact.locations} locations
                          </small>
                        </div>
                      </td>
                      <td>
                        {new Date(program.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(program)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(program._id)}
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

export default Program;
