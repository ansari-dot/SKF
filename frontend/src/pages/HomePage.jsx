import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import VideoSection from '../components/VideoSection';
import StatsSection from '../components/StatsSection';
import FundraisingSection from '../components/FundraisingSection';
import ServicesSection from '../components/ServicesSection';
import getAbsoluteImageUrl from '../utils/imageUtils';


const HomePage = () => {
  const [latestMedia, setLatestMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch latest media from backend
  const fetchLatestMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/media/get`);
      const allMedia = response.data.data || [];
      // Get latest 3 news/blog items
      const sortedMedia = allMedia
        .filter(item => item.mediaType === 'news' || item.mediaType === 'blog')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setLatestMedia(sortedMedia);
    } catch (error) {
      console.error('Error fetching latest media:', error);
      setLatestMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestMedia();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <VideoSection />
      <StatsSection />
      {/* <FundraisingSection /> */}
      <ServicesSection />

      
      {/* Latest News Section */}
      <section className="py-5 modern-news-section" style={{ background: '#ffffff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>Latest News & Updates</h2>
            <p className="text-muted">Stay informed about our latest initiatives and community impact</p>
          </motion.div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading latest news...</p>
            </div>
          ) : latestMedia.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-newspaper fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No news available</h4>
              <p className="text-muted">Check back later for updates.</p>
            </div>
          ) : (
            <div className="row g-4">
              {latestMedia.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="col-lg-4 col-md-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="card h-100 border-0 modern-news-card"
                    whileHover={{ y: -8, scale: 1.02 }}
                    style={{
                      borderRadius: '20px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={getAbsoluteImageUrl(item.image)}
                        className="card-img-top"
                        alt={item.heading}
                        style={{ 
                          height: '220px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = '/placeholder-logo.png';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '0.4rem 0.8rem'
                      }}>
                        <span className="badge" style={{ 
                          background: 'var(--brand-primary)',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>{item.category}</span>
                      </div>
                    </div>

                    <div className="card-body p-4">
                      <small className="text-muted d-block mb-2">
                        <i className="fas fa-calendar-alt me-1"></i>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </small>
                      <h5 className="card-title fw-bold mb-3" style={{ 
                        color: '#2C3E50',
                        lineHeight: '1.4'
                      }}>
                        {item.heading}
                      </h5>
                      <p className="card-text text-muted mb-4" style={{ 
                        lineHeight: '1.7',
                        minHeight: '60px'
                      }}>
                        {item.description.length > 100 
                          ? item.description.substring(0, 100) + '...' 
                          : item.description
                        }
                      </p>
                      <motion.button
                        className="btn btn-outline-primary"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'var(--brand-primary)',
                          color: 'white',
                          borderColor: 'var(--brand-primary)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(item.link, '_blank')}
                        style={{ 
                          cursor: 'pointer',
                          borderRadius: '50px',
                          padding: '0.6rem 1.5rem',
                          fontWeight: '600',
                          borderWidth: '2px'
                        }}
                      >
                        Read More <i className="fas fa-arrow-right ms-2"></i>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="btn btn-primary btn-lg px-5 py-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/media'}
              style={{ 
                cursor: 'pointer',
                borderRadius: '50px',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 12px rgba(127, 176, 105, 0.3)'
              }}
            >
              View All News <i className="fas fa-arrow-right ms-2"></i>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
