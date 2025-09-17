import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [formData, setFormData] = useState({
    mediaType: 'news',
    heading: '',
    team: '',
    description: '',
    highlight: [''],
    link: '',
    image: '/placeholder-logo.png',
    author: '',
    category: '',
    tags: ['']
  });
  
  const API_URL = `${import.meta.env.VITE_API_URL}`;

  // Fetch media
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/media/get`);
      setMedia(response.data.data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const resetForm = () => {
    setFormData({
      mediaType: 'news',
      heading: '',
      team: '',
      description: '',
      highlight: [''],
      link: '',
      image: '/placeholder-logo.png',
      author: '',
      category: '',
      tags: ['']
    });
    setEditingMedia(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Filter out empty strings from arrays
      const submitData = {
        ...formData,
        highlight: formData.highlight.filter(item => item.trim() !== ''),
        tags: formData.tags.filter(item => item.trim() !== '')
      };

      if (editingMedia) {
        await axios.put(`${API_URL}/media/update/${editingMedia._id}`, submitData, config);
        toast.success('Media updated successfully');
      } else {
        await axios.post(`${API_URL}/media/add`, submitData, config);
        toast.success('Media added successfully');
      }

      setShowForm(false);
      resetForm();
      fetchMedia();
    } catch (error) {
      console.error('Error saving media:', error);
      toast.error(error.response?.data?.message || 'Failed to save media');
    }
  };

  const handleEdit = (mediaItem) => {
    setEditingMedia(mediaItem);
    setFormData({
      mediaType: mediaItem.mediaType,
      heading: mediaItem.heading,
      team: mediaItem.team,
      description: mediaItem.description,
      highlight: mediaItem.highlight.length > 0 ? mediaItem.highlight : [''],
      link: mediaItem.link,
      image: mediaItem.image,
      author: mediaItem.author,
      category: mediaItem.category,
      tags: mediaItem.tags.length > 0 ? mediaItem.tags : ['']
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/media/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Media deleted successfully');
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Failed to delete media');
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
            <h1 className="display-6 fw-bold mb-0">Media Management</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Media
            </button>
          </div>

          {/* Media Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {editingMedia ? 'Edit Media' : 'Add New Media'}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Media Type *</label>
                      <select
                        name="mediaType"
                        value={formData.mediaType}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="news">News</option>
                        <option value="blog">Blog</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category *</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="e.g., Disaster Relief, Education"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Heading/Title *</label>
                    <input
                      type="text"
                      name="heading"
                      value={formData.heading}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter media title"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Author *</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter author name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Team *</label>
                      <input
                        type="text"
                        name="team"
                        value={formData.team}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter team name"
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
                      placeholder="Enter detailed description"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter image URL or path"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Link *</label>
                    <input
                      type="text"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter link URL"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Highlights</label>
                    {formData.highlight.map((item, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(index, 'highlight', e.target.value)}
                          className="form-control"
                          placeholder="Enter highlight point"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('highlight', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addArrayItem('highlight')}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Highlight
                    </button>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tags</label>
                    {formData.tags.map((item, index) => (
                      <div key={index} className="input-group mb-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleArrayChange(index, 'tags', e.target.value)}
                          className="form-control"
                          placeholder="Enter tag"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeArrayItem('tags', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => addArrayItem('tags')}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Tag
                    </button>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {editingMedia ? 'Update Media' : 'Add Media'}
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

          {/* Media List */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {media.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No media items found. Add your first media item above.
                    </td>
                  </tr>
                ) : (
                  media.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <span className={`badge bg-primary`}>
                          {item.mediaType.charAt(0).toUpperCase() + item.mediaType.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.heading}
                            className="me-3 rounded"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/placeholder-logo.png';
                            }}
                          />
                          <div>
                            <strong>{item.heading}</strong>
                            <br />
                            <small className="text-muted">{item.description.substring(0, 50)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>{item.author}</td>
                      <td>{item.category}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(item._id)}
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

export default Media;