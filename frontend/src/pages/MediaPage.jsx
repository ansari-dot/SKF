import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import getAbsoluteImageUrl, { generateResponsiveImages } from '../utils/imageUtils';

const MediaPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mediaItems, setMediaItems] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/media/get`);
        setMediaItems(response.data.data || []);
        console.log('Media fetched:', response.data.data);
      } catch (error) {
        console.error('Error fetching media:', error);
        toast.error('Failed to load media content');
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/featured-event/latest`);
        if (response.data.success && response.data.data) {
          setFeaturedEvent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching featured event:', error);
        setFeaturedEvent(null);
      }
    };

    fetchMedia();
    fetchFeaturedEvent();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.mediaType === activeFilter);

  return (
    <div className="pt-5" style={{ marginTop: 'calc(-1 * var(--header-height) - 35px)' }}>
      {/* Filter Buttons */}
      <section className="py-4">
        <div className="container d-flex justify-content-center flex-wrap gap-2">
          {['all', 'news', 'blog', 'event'].map((filter) => (
            <motion.button
              key={filter}
              className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Media Items */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 text-muted">Loading media content...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No media content available</h4>
            </div>
          ) : (
            <div className="row g-4">
              {filteredItems.map((item, idx) => {
                const imgData = generateResponsiveImages(getAbsoluteImageUrl(item.image), item.heading);
                return (
                  <motion.div
                    key={item._id}
                    className="col-lg-6 col-xl-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="card h-100 border-0 shadow-sm">
                      <img
                        src={imgData.src}
                        srcSet={imgData.sources?.map(s => `${imgData.src} ${s.width}w`).join(', ')}
                        alt={imgData.alt}
                        className={imgData.className}
                        loading={imgData.loading}
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                        onError={(e) => (e.target.src = '/placeholder-logo.png')}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-primary">
                            {item.mediaType.charAt(0).toUpperCase() + item.mediaType.slice(1)}
                          </span>
                          <small className="text-muted">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <h5 className="card-title fw-bold">{item.heading}</h5>
                        <p className="text-muted mb-2"><i className="fas fa-user me-1"></i>{item.author}</p>
                        <p className="text-muted">
                          {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
                        </p>
                        <div className="mb-3">
                          {item.tags?.map((tag, i) => (
                            <span key={i} className="badge bg-light text-dark me-1 mb-1">{tag}</span>
                          ))}
                        </div>
                        <Link to={`/media/${item._id}`}>
                          <motion.button
                            className="btn btn-outline-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Read More
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MediaPage;
