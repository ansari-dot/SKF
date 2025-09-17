import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const MediaPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mediaItems, setMediaItems] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch media from backend
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/media/get`);
      setMediaItems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media content');
      // Fallback to empty array
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured event from backend
  const fetchFeaturedEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/featured-event/latest`);
      if (response.data.success && response.data.data) {
        setFeaturedEvent(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching featured event:', error);
      // Don't show toast for featured event as it's optional
      setFeaturedEvent(null);
    }
  };

  useEffect(() => {
    fetchMedia();
    fetchFeaturedEvent();
  }, []);

  const filteredItems = activeFilter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.mediaType === activeFilter);

  return (
    <div className="pt-5">


      {/* Filter Section */}
      <section className="py-4">
        <div className="container">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', icon: 'fas fa-th' },
              { key: 'news', label: 'News', icon: 'fas fa-newspaper' },
              { key: 'blog', label: 'Blog', icon: 'fas fa-blog' },
              { key: 'event', label: 'Events', icon: 'fas fa-calendar-alt' }
            ].map((filter) => (
              <motion.button
                key={filter.key}
                className={`btn ${activeFilter === filter.key ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveFilter(filter.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${filter.icon} me-2`}></i>
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Content */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading media content...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No media content available</h4>
              <p className="text-muted">Check back later for updates.</p>
            </div>
          ) : (
          <div className="row g-4">
            {filteredItems.map((item, index) => (
              <motion.div
                  key={item._id}
                className="col-lg-6 col-xl-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow-sm">
                <img
  src={
    item.image
      ? item.image.startsWith('/uploads/')
        ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${item.image}`
        : item.image
      : '/placeholder-logo.png'
  }
  className="card-img-top"
  alt={item.heading}
  style={{ height: '200px', objectFit: 'cover' }}
  onError={(e) => {
    e.target.src = '/placeholder-logo.png';
  }}
/>

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge bg-primary`}>
                          {item.mediaType.charAt(0).toUpperCase() + item.mediaType.slice(1)}
                      </span>
                        <small className="text-muted">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                      <h5 className="card-title fw-bold">{item.heading}</h5>
                    <p className="text-muted mb-2">
                      <i className="fas fa-user me-1"></i>
                      {item.author}
                    </p>
                      <p className="card-text text-muted">
                        {item.description.length > 100 
                          ? item.description.substring(0, 100) + '...' 
                          : item.description
                        }
                      </p>
                    <div className="mb-3">
                        {item.tags && item.tags.map((tag, idx) => (
                        <span key={idx} className="badge bg-light text-dark me-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      className="btn btn-outline-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(item.link, '_blank')}
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Featured Event</h2>
            <p className="lead text-muted">Discover our upcoming community events</p>
          </motion.div>

          {featuredEvent ? (
            <div className="row align-items-center g-5">
              <motion.div
                className="col-lg-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {featuredEvent.images && featuredEvent.images.length > 0 ? (
                  <div id="featuredEventCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {featuredEvent.images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                         <img
  src={
    image
      ? image.startsWith('/uploads/')
        ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${image}`
        : image
      : '/placeholder-logo.png'
  }
  alt={`${featuredEvent.title} - Image ${index + 1}`}
  className="img-fluid rounded shadow logo-hover"
  style={{ height: '400px', objectFit: 'cover', width: '100%' }}
  onError={(e) => {
    e.target.src = '/placeholder-logo.png';
  }}
/>

                        </div>
                      ))}
                    </div>
                    {featuredEvent.images.length > 1 && (
                      <>
                        <button className="carousel-control-prev" type="button" data-bs-target="#featuredEventCarousel" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#featuredEventCarousel" data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <img
                    src="/placeholder-logo.png"
                    alt="Featured Event"
                    className="img-fluid rounded shadow logo-hover"
                    style={{ height: '400px', objectFit: 'cover', width: '100%' }}
                  />
                )}
              </motion.div>

              <motion.div
                className="col-lg-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="fw-bold mb-4">{featuredEvent.title}</h3>
                <div className="mb-4">
                  <p className="text-muted mb-2">
                    <i className="fas fa-calendar-alt me-2"></i>
                    <strong>Date:</strong> {new Date(featuredEvent.date).toLocaleDateString()}
                  </p>
                  <p className="text-muted mb-2">
                    <i className="fas fa-clock me-2"></i>
                    <strong>Time:</strong> {featuredEvent.time}
                  </p>
                  <p className="text-muted mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <strong>Location:</strong> {featuredEvent.location}
                  </p>
                </div>
                <p className="text-muted mb-4">
                  {featuredEvent.description}
                </p>
                
                {featuredEvent.highlights && featuredEvent.highlights.length > 0 && (
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Event Highlights</h5>
                    <ul className="list-unstyled">
                      {featuredEvent.highlights.map((highlight, index) => (
                        <li key={index} className="mb-2">
                          <i className="fas fa-check-circle text-primary me-2"></i>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {featuredEvent.stats && (
                  <div className="row g-3 mb-4">
                    {featuredEvent.stats.speakers && (
                      <div className="col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                          <h4 className="fw-bold text-primary mb-1">{featuredEvent.stats.speakers}+</h4>
                          <small className="text-muted">Speakers</small>
                        </div>
                      </div>
                    )}
                    {featuredEvent.stats.attendees && (
                      <div className="col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                          <h4 className="fw-bold text-primary mb-1">{featuredEvent.stats.attendees}+</h4>
                          <small className="text-muted">Attendees</small>
                        </div>
                      </div>
                    )}
                    {featuredEvent.stats.workshops && (
                      <div className="col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                          <h4 className="fw-bold text-primary mb-1">{featuredEvent.stats.workshops}+</h4>
                          <small className="text-muted">Workshops</small>
                        </div>
                      </div>
                    )}
                    {featuredEvent.stats.days && (
                      <div className="col-6">
                        <div className="text-center p-3 bg-white rounded shadow-sm">
                          <h4 className="fw-bold text-primary mb-1">{featuredEvent.stats.days}</h4>
                          <small className="text-muted">Days</small>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {featuredEvent.registrationLink && (
                  <motion.a
                    href={featuredEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.a>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted">No featured event available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <motion.div
                className="card border-0 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="fw-bold mb-3">Stay Updated</h3>
                  <p className="text-muted mb-4">
                    Subscribe to our newsletter to receive the latest news, updates, and event notifications.
                  </p>
                  <div className="row g-3">
                    <div className="col-md-8">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="col-md-4">
                      <motion.button
                        className="btn btn-primary btn-lg w-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Subscribe
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPage;
