import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import getAbsoluteImageUrl from '../utils/imageUtils';

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

  const API_URL = `${import.meta.env.VITE_API_URL}`;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/featured-event/all`,{
        withCredentials: true
      });
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

      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('registrationLink', formData.registrationLink);
      formDataToSend.append('isActive', formData.isActive);
      formDataToSend.append('highlights', JSON.stringify(formData.highlights.filter(item => item.trim() !== '')));
      formDataToSend.append('stats', JSON.stringify(formData.stats));

      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formDataToSend.append('images', file);
        });
      } else {
        const filteredImages = formData.images.filter(item => item.trim() !== '');
        const finalImages = filteredImages.length > 0 ? filteredImages : ['/placeholder-logo.png'];
        formDataToSend.append('imageUrls', JSON.stringify(finalImages));
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          withCredentials: true
        }
      };

      if (editingEvent) {
        await axios.put(`${API_URL}/featured-event/update/${editingEvent._id}`, formDataToSend, config,{
          withCredentials: true
        });
        toast.success('Event updated successfully');
      } else {
        await axios.post(`${API_URL}/featured-event/add`, formDataToSend, config,{
          withCredentials: true
        });
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
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
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
      <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="admin-header mb-4">
        <h1 className="display-6 fw-bold mb-2">Featured Events</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Admin</li>
            <li className="breadcrumb-item active">Featured Events</li>
          </ol>
        </nav>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3>🌟 Manage Featured Events</h3>
            <button
              className="btn admin-btn-primary"
              onClick={() => { resetForm(); setShowForm(true); }}
            >
              <span className="me-2">➕</span>Add New Event
            </button>
          </div>
        </div>

        <div className="admin-card-body">
          {showForm && (
            <div className="admin-card mb-4">
              <div className="admin-card-header">
                <h4>{editingEvent ? '✏️ Edit Event' : '➕ Add New Event'}</h4>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Event Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Registration Link</label>
                    <input
                      type="url"
                      className="form-control"
                      name="registrationLink"
                      value={formData.registrationLink}
                      onChange={handleInputChange}
                      placeholder="https://example.com/register"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="mb-3">
                    <label className="form-label">Event Images</label>
                    <div className="mb-2">
                      <div className="btn-group" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          name="uploadMode"
                          id="urlMode"
                          checked={uploadMode === 'url'}
                          onChange={() => setUploadMode('url')}
                        />
                        <label className="btn btn-outline-primary" htmlFor="urlMode">
                          Image URLs
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="uploadMode"
                          id="fileMode"
                          checked={uploadMode === 'file'}
                          onChange={() => setUploadMode('file')}
                        />
                        <label className="btn btn-outline-primary" htmlFor="fileMode">
                          Upload Files
                        </label>
                      </div>
                    </div>

                    {uploadMode === 'url' ? (
                      <div>
                        {formData.images.map((image, index) => (
                          <div key={index} className="input-group mb-2">
                            <input
                              type="url"
                              className="form-control"
                              placeholder="https://example.com/image.jpg"
                              value={image}
                              onChange={(e) => handleArrayChange(index, 'images', e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeArrayItem('images', index)}
                              disabled={formData.images.length === 1}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          onClick={() => addArrayItem('images')}
                        >
                          ➕ Add Image URL
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          className="form-control"
                          id="images"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {selectedFiles.length > 0 && (
                          <div className="mt-2">
                            <small className="text-muted">
                              Selected: {selectedFiles.map(f => f.name).join(', ')}
                            </small>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm ms-2"
                              onClick={clearFiles}
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Image Preview */}
                    {formData.images.length > 0 && formData.images[0] !== '/placeholder-logo.png' && (
                      <div className="mt-3">
                        <label className="form-label">Current Images:</label>
                        <div className="row">
                          {formData.images.map((image, index) => (
                            <div key={index} className="col-md-3 mb-2">
                              <img
                                src={image.startsWith('/uploads/') 
                                  ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${image}`
                                  : image
                                }
                                alt={`Event ${index + 1}`}
                                className="img-thumbnail"
                                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/placeholder-logo.png';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Event Highlights */}
                  <div className="mb-3">
                    <label className="form-label">Event Highlights</label>
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter event highlight"
                          value={highlight}
                          onChange={(e) => handleArrayChange(index, 'highlights', e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('highlights', index)}
                          disabled={formData.highlights.length === 1}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => addArrayItem('highlights')}
                    >
                      ➕ Add Highlight
                    </button>
                  </div>

                  {/* Event Statistics */}
                  <div className="mb-3">
                    <label className="form-label">Event Statistics</label>
                    <div className="row">
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Speakers</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stats.speakers"
                          value={formData.stats.speakers}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Attendees</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stats.attendees"
                          value={formData.stats.attendees}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Workshops</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stats.workshops"
                          value={formData.stats.workshops}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-3 mb-2">
                        <label className="form-label">Days</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stats.days"
                          value={formData.stats.days}
                          onChange={handleInputChange}
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">
                        Active Event (visible to users)
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn admin-btn-primary">
                      {editingEvent ? '💾 Update Event' : '➕ Add Event'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                        clearFiles();
                      }}
                    >
                      ❌ Cancel
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
                        <small className="text-muted">{event.description.substring(0, 50)}...</small>
                      </td>
                      <td>
                        {new Date(event.date).toLocaleDateString()}
                        <br />
                        <small className="text-muted">{event.time}</small>
                      </td>
                      <td>{event.location}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {event.images && event.images.length > 0 && event.images[0] !== '/placeholder-logo.png' ? (
                            <div>
                              <img
                                src={event.images[0].startsWith('/uploads/')
                                  ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${event.images[0]}`
                                  : event.images[0]
                                }
                                alt="Event"
                                className="img-thumbnail me-2"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/placeholder-logo.png';
                                }}
                              />
                              <span className="badge bg-info">{event.images?.length || 0} images</span>
                            </div>
                          ) : (
                            <div>
                              <img
                                src={getAbsoluteImageUrl(event.image)}
                                alt={event.title}
                                className="img-fluid rounded-start"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/placeholder-logo.png';
                                }}
                              />
                              <span className="badge bg-secondary">No images</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${event.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {event.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(event)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event._id)}>
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
