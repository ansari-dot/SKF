import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeaturedEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    images: ['/placeholder-logo.png'],
    highlights: [''],
    stats: {
      speakers: 0,
      attendees: 0,
      workshops: 0,
      days: 1
    },
    registrationLink: '#',
    isActive: true
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'

  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/featured-event/all`);
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('stats.')) {
      const statField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statField]: type === 'number' ? parseInt(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? e.target.checked : value
      }));
    }
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
      [field]: [...prev[field], field === 'images' ? '/placeholder-logo.png' : '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    const fileInput = document.getElementById('images');
    if (fileInput) fileInput.value = '';
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      images: ['/placeholder-logo.png'],
      highlights: [''],
      stats: {
        speakers: 0,
        attendees: 0,
        workshops: 0,
        days: 1
      },
      registrationLink: '#',
      isActive: true
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('registrationLink', formData.registrationLink);
      formDataToSend.append('isActive', formData.isActive);
      formDataToSend.append('highlights', JSON.stringify(formData.highlights.filter(item => item.trim() !== '')));
      formDataToSend.append('stats', JSON.stringify(formData.stats));

      // Handle file uploads
      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formDataToSend.append('images', file);
        });
      } else {
        // Fallback to image URLs if no files selected
        const filteredImages = formData.images.filter(item => item.trim() !== '');
        const finalImages = filteredImages.length > 0 ? filteredImages : ['/placeholder-logo.png'];
        formDataToSend.append('imageUrls', JSON.stringify(finalImages));
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingEvent) {
        await axios.put(`${API_URL}/featured-event/update/${editingEvent._id}`, formDataToSend, config);
        toast.success('Event updated successfully');
      } else {
        await axios.post(`${API_URL}/featured-event/add`, formDataToSend, config);
        toast.success('Event added successfully');
      }

      setShowForm(false);
      resetForm();
      clearFiles();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error(error.response?.data?.message || 'Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      images: event.images && event.images.length > 0 ? event.images : ['/placeholder-logo.png'],
      highlights: event.highlights && event.highlights.length > 0 ? event.highlights : [''],
      stats: {
        speakers: event.stats?.speakers || 0,
        attendees: event.stats?.attendees || 0,
        workshops: event.stats?.workshops || 0,
        days: event.stats?.days || 1
      },
      registrationLink: event.registrationLink || '#',
      isActive: event.isActive !== undefined ? event.isActive : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/featured-event/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card admin-card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold mb-0">Featured Event Management</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Event
            </button>
          </div>

          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter event location"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time *</label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="e.g., 9:00 AM - 5:00 PM"
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
                      placeholder="Enter detailed event description"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Registration Link</label>
                    <input
                      type="text"
                      name="registrationLink"
                      value={formData.registrationLink}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter registration URL"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Event Images</label>
                    <div className="mb-3">
                      <div className="btn-group" role="group">
                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="uploadMode" 
                          id="urlMode" 
                          checked={uploadMode === 'url'}
                          onChange={() => setUploadMode('url')}
                        />
                        <label className="btn btn-outline-primary btn-sm" htmlFor="urlMode">Use Image URLs</label>
                        
                        <input 
                          type="radio" 
                          className="btn-check" 
                          name="uploadMode" 
                          id="fileMode" 
                          checked={uploadMode === 'file'}
                          onChange={() => setUploadMode('file')}
                        />
                        <label className="btn btn-outline-primary btn-sm" htmlFor="fileMode">Upload Files</label>
                      </div>
                    </div>

                    {uploadMode === 'url' ? (
                      <>
                        <p className="text-muted small mb-2">
                          <i className="fas fa-info-circle me-1"></i>
                          Enter image URLs directly (e.g., https://example.com/image.jpg) or use relative paths (/uploads/filename.jpg)
                        </p>
                        {formData.images.map((image, index) => (
                          <div key={index} className="mb-3 p-3 border rounded">
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                value={image}
                                onChange={(e) => handleArrayChange(index, 'images', e.target.value)}
                                className="form-control"
                                placeholder="https://example.com/image.jpg or /uploads/filename.jpg"
                              />
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => removeArrayItem('images', index)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                            {image && image !== '/placeholder-logo.png' && (
                              <div className="mt-2">
                                <small className="text-muted">Preview:</small>
                                <img 
                                  src={image} 
                                  alt={`Event image ${index + 1}`}
                                  className="img-thumbnail mt-1"
                                  style={{ maxHeight: '100px', maxWidth: '150px' }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                  }}
                                />
                                <small className="text-danger" style={{ display: 'none' }}>
                                  <i className="fas fa-exclamation-triangle"></i> Image URL not valid
                                </small>
                              </div>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => addArrayItem('images')}
                        >
                          <i className="fas fa-plus me-1"></i>
                          Add Image URL
                        </button>
                      </>
                    ) : (
                      <div className="mb-3">
                        <p className="text-muted small mb-2">
                          <i className="fas fa-info-circle me-1"></i>
                          Select image files to upload (JPG, PNG, GIF, WebP supported)
                        </p>
                        <input
                          type="file"
                          id="images"
                          name="images"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-control mb-2"
                        />
                        {selectedFiles.length > 0 && (
                          <div className="mt-3">
                            <h6>Selected Files ({selectedFiles.length}):</h6>
                            <div className="row">
                              {selectedFiles.map((file, index) => (
                                <div key={index} className="col-md-4 mb-2">
                                  <div className="border rounded p-2">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className="img-fluid img-thumbnail"
                                      style={{ maxHeight: '100px' }}
                                    />
                                    <div className="text-truncate small mt-1">{file.name}</div>
                                    <small className="text-muted">{(file.size / 1024).toFixed(1)} KB</small>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm mt-2"
                              onClick={clearFiles}
                            >
                              <i className="fas fa-times me-1"></i>
                              Clear Selection
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Event Highlights</label>
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleArrayChange(index, 'highlights', e.target.value)}
                          className="form-control"
                          placeholder="Enter highlight point"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('highlights', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addArrayItem('highlights')}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Highlight
                    </button>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Speakers</label>
                      <input
                        type="number"
                        name="stats.speakers"
                        value={formData.stats.speakers}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Attendees</label>
                      <input
                        type="number"
                        name="stats.attendees"
                        value={formData.stats.attendees}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Workshops</label>
                      <input
                        type="number"
                        name="stats.workshops"
                        value={formData.stats.workshops}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Days</label>
                      <input
                        type="number"
                        name="stats.days"
                        value={formData.stats.days}
                        onChange={handleInputChange}
                        className="form-control"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label className="form-check-label">
                        Active Event
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingEvent ? 'Update Event' : 'Add Event'}
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

          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Images</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No events found. Add your first event above.
                    </td>
                  </tr>
                ) : (
                  events.map(event => (
                    <tr key={event._id}>
                      <td>
                        <strong>{event.title}</strong>
                        <br />
                        <small className="text-muted">
                          {event.description.substring(0, 50)}...
                        </small>
                      </td>
                      <td>
                        {new Date(event.date).toLocaleDateString()}
                        <br />
                        <small className="text-muted">{event.time}</small>
                      </td>
                      <td>{event.location}</td>
                      <td>
                        <span className="badge bg-info">
                          {event.images?.length || 0} images
                        </span>
                        {event.images && event.images.length > 0 && event.images[0] !== '/placeholder-logo.png' && (
                          <div className="mt-1">
                            <small className="text-muted">First: {event.images[0].substring(0, 30)}...</small>
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${event.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {event.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(event)}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(event._id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
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

export default FeaturedEvent;