import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import getAbsoluteImageUrl from '../utils/imageUtils';
import '../styles/ProjectDetailPage.css';

// Dummy data for testing
const dummyMedia = {
  _id: 'dummy-id',
  mediaType: 'news',
  heading: 'SKF Launches New Education Initiative',
  team: 'Education Team',
  description: 'SKF has launched a new education initiative to provide quality education to underprivileged children across the region. The program focuses on STEM education and includes teacher training, learning materials, and digital resources.',
  highlight: [
    'Reaching 1,000+ students in the first year',
    'Partnership with 20 local schools',
    'Training for 50+ teachers',
    'Digital learning resources for remote areas'
  ],
  link: 'https://example.com/education-initiative',
  image: '/images/education-initiative.jpg',
  author: 'John Doe',
  category: 'Education',
  tags: ['education', 'initiative', 'stem', 'children'],
  date: '2023-09-15T00:00:00.000Z',
  relatedMedia: [
    {
      _id: '1',
      heading: 'Summer Camp Success',
      description: 'Our annual summer camp benefited 500+ children',
      image: '/images/summer-camp.jpg',
      date: '2023-08-20T00:00:00.000Z',
      mediaType: 'event'
    },
    {
      _id: '2',
      heading: 'New Learning Center Opens',
      description: 'State-of-the-art facility for digital learning',
      image: '/images/learning-center.jpg',
      date: '2023-07-10T00:00:00.000Z',
      mediaType: 'news'
    }
  ]
};

const MediaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMedia = async () => {
      if (id === 'dummy-id') {
        setMedia(dummyMedia);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/media/get/${id}`);
        if (response.data.success && response.data.data) {
          setMedia(response.data.data);
        } else {
          throw new Error('Media not found');
        }
      } catch (error) {
        console.error('Error fetching media:', error);
        toast.error(error.response?.status === 404 ? 'Media not found' : 'Failed to load media details');
        navigate('/media');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMedia();
    } else {
      setMedia(dummyMedia);
      setLoading(false);
    }
  }, [id, navigate, API_URL]);

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Date not available';
    }
  };

  // Get media type icon
  const getMediaTypeIcon = (type) => {
    if (!type) return 'file-alt';
    switch (type.toLowerCase()) {
      case 'news':
        return 'newspaper';
      case 'event':
        return 'calendar-alt';
      case 'blog':
        return 'blog';
      default:
        return 'file-alt';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="container my-5 text-center">
        <h2>Media Not Found</h2>
        <p>The requested media could not be found.</p>
        <button className="btn btn-primary mt-3 text-center" onClick={() => navigate('/media')}>
          <i className="fas fa-arrow-left me-2"></i>
          Back to Media
        </button>
      </div>
    );
  }

  return (
    <div className="media-detail-page" style={{ padding: 0, margin: 0, position: 'relative' }}>
      {/* Hero Section with Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${getAbsoluteImageUrl(media.image) || '/images/placeholder-hero.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          '@media (max-width: 767px)': {
            height: '80vh',
          }
        }}
        className="media-hero-bg"
      ></div>

      {/* Hero Content */}
      <section 
        className="position-relative text-white media-hero-content" 
        style={{ 
          padding: '120px 0 60px', 
          zIndex: 1 
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8 text-center">
                <span className="badge bg-success mb-3 px-3 py-2 rounded-pill">
                  <i className={`fas fa-${getMediaTypeIcon(media.mediaType)} me-2`}></i>
                  {media.mediaType.charAt(0).toUpperCase() + media.mediaType.slice(1)}
                </span>
                <h1 className="display-4 fw-bold mb-4">{media.heading}</h1>

                <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
                  <div><i className="far fa-calendar-alt me-2"></i>{formatDate(media.date)}</div>
                  <div><i className="fas fa-user me-2"></i>{media.author || 'SKF Team'}</div>
                  {media.team && <div><i className="fas fa-users me-2"></i>{media.team}</div>}
                </div>

                <p className="lead mb-5">{media.description.substring(0, 200)}...</p>

                <div className="d-flex flex-wrap justify-content-center gap-3 py-2">
                  <button className="btn btn-light btn-sm rounded-pill px-4 py-2 text-center" onClick={() => navigate(-1)}>
                    <i className="fas fa-arrow-left me-1"></i> Back
                  </button>
                  {media.link && (
                    <a href={media.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-pill px-4 py-2 text-center">
                      <i className="fas fa-external-link-alt me-1"></i> Visit Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white position-relative" style={{ zIndex: 2 }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
            

              {/* Overview */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4 text-success">Overview</h2>
                <div className="fs-5 lh-lg" style={{ color: '#444' }}>
                  {media.description?.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {media.highlight?.length > 0 && (
                <section className="py-5">
                  <div className="text-center mb-5">
                    <h2 className="fw-bold text-success">Key Highlights</h2>
                    <p className="text-muted">Major points and achievements</p>
                  </div>
                  <div className="row g-4">
                    {media.highlight.map((item, i) => (
                      <div key={i} className="col-md-6 col-lg-4">
                        <motion.div 
                          className="card h-100 border-0 shadow-sm"
                          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-start">
                              <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                                <i className="fas fa-check-circle text-success"></i>
                              </div>
                              <div>
                                <h5 className="mb-0">{item}</h5>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tags */}
              {media.tags?.length > 0 && (
                <div className="py-4 border-top border-bottom my-5">
                  <h5 className="mb-3">Tags:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {media.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="badge bg-light text-dark border px-3 py-2 rounded-pill"
                        style={{ fontSize: '0.9rem' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Media */}
              {media.relatedMedia?.length > 0 && (
                <section className="py-5 mt-5">
                  <div className="text-center mb-5">
                    <h2 className="fw-bold text-success">Related Stories</h2>
                    <p className="text-muted">You might also be interested in</p>
                  </div>
                  <div className="row g-4">
                    {media.relatedMedia.map((item) => (
                      <div key={item._id} className="col-md-6 col-lg-4">
                        <motion.div 
                          className="card h-100 d-flex flex-column border-0 shadow-sm"
                          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                          transition={{ duration: 0.3 }}
                          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                          <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                            <img 
                              src={getAbsoluteImageUrl(item.image) || '/images/placeholder-news.jpg'} 
                              alt={item.heading} 
                              className="img-fluid w-100 h-100"
                              style={{ objectFit: 'cover' }}
                            />
                            <div className="position-absolute top-0 end-0 m-3">
                              <span className="badge bg-primary">
                                {item.mediaType?.charAt(0).toUpperCase() + (item.mediaType?.slice(1) || '') || 'Media'}
                              </span>
                            </div>
                          </div>
                          <div className="card-body d-flex flex-column" style={{ flex: '1 0 auto', minHeight: '200px' }}>
                            <h5 className="card-title" style={{ minHeight: '3rem' }}>{item.heading}</h5>
                            <p className="card-text text-muted" style={{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.description.substring(0, 100)}...
                            </p>
                            <div className="mt-3">
                              <button 
                                className="btn btn-outline-success w-100 py-2" 
                                onClick={() => navigate(`/media/${item._id}`)}
                                style={{ whiteSpace: 'nowrap' }}
                              >
                                Read More <i className="fas fa-arrow-right ms-1"></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailPage;
