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
              {/* Form JSX remains unchanged */}
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
                        <span className="badge bg-info">{event.images?.length || 0} images</span>
                        {event.images && event.images.length > 0 && event.images[0] !== '/placeholder-logo.png' && (
                          <div className="mt-1">
                            <small className="text-muted">
                              First:{' '}
                              {event.images[0].startsWith('/uploads/')
                                ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${event.images[0]}`.substring(0, 30) + '...'
                                : event.images[0].substring(0, 30) + '...'}
                            </small>
                          </div>
                        )}
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
