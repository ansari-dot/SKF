import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import getAbsoluteImageUrl from '../utils/imageUtils';
import '../styles/ProjectDetailPage.css';

// Brand colors
const brandColors = {
  primary: '#28a745', // Green
  secondary: '#007bff', // Blue
  light: '#f8f9fa',
  dark: '#343a40',
  success: '#28a745',
  info: '#17a2b8'
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/project/get/${id}`);
        if (response.data.success && response.data.project) {
          setProject(response.data.project);
        } else {
          throw new Error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        if (error.response?.status === 404) {
          toast.error('Project not found');
        } else {
          toast.error('Failed to load project details');
        }
        navigate('/our-work');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, navigate, API_URL]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
        <h3>Project Not Found</h3>
        <p className="text-muted">The project you're looking for doesn't exist or has been removed.</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/our-work')}
        >
          Back to Our Work
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'secondary';
      case 'Planning': return 'info';
      case 'Fundraising': return 'primary';
      case 'On Hold': return 'secondary';
      default: return 'secondary';
    }
  };

  const heroImage = project.images && project.images.length > 0 
    ? getAbsoluteImageUrl(project.images[0].url) 
    : null;

  return (
    <div className="project-detail-page" style={{ padding: 0, margin: 0, position: 'relative' }}>
      {/* Hero Section with Background Image - Behind Navbar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          backgroundImage: heroImage ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          '@media (max-width: 767px)': {
            height: '80vh',
          }
        }}
      ></div>
      
      {/* Hero Content - Positioned below navbar */}
      <section 
        className="position-relative text-white project-hero-content"
        style={{
          padding: '100px 0 60px',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 1px 3px rgba(0,0,0,0.5)'
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8 text-center">
                <div className="d-flex justify-content-center mb-3">
                  <span className={`badge bg-${getStatusColor(project.status)} me-3`}>
                    {project.status}
                  </span>
                  <span className="text-white-50">
                    <i className="fas fa-calendar me-1"></i>
                    Started: {formatDate(project.startDate)}
                  </span>
                </div>
                
                <h1 className="display-4 fw-bold mb-4">{project.title}</h1>
                <p className="lead mb-5">{project.shortDescription}</p>

                <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                  <div className="d-flex align-items-center me-4">
                    <i className="fas fa-map-marker-alt text-white-50 me-2"></i>
                    <span>
                      {typeof project.location === 'string' 
                        ? project.location 
                        : project.location?.address || 
                          project.location?.city || 
                          project.location?.country || 
                          'Location not specified'}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-tag text-white-50 me-2"></i>
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-4 py-3">
                  <button 
                    className="btn btn-light btn-lg rounded-pill px-5 py-2 text-dark"
                    onClick={() => navigate('/our-work')}
                    style={{
                      minWidth: '180px',
                      whiteSpace: 'nowrap',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back
                  </button>
                  <button 
                    className="btn btn-outline-light btn-lg rounded-pill px-5 py-2"
                    style={{
                      minWidth: '180px',
                      whiteSpace: 'nowrap',
                      borderWidth: '2px',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-share me-2"></i>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4 text-success">Project Overview</h2>
          <div>
            {project.detailedDescription ? (
              <div dangerouslySetInnerHTML={{ 
                __html: project.detailedDescription.replace(/\n/g, '<br>') 
              }} />
            ) : (
              <p className="text-muted fs-5">No detailed description available for this project.</p>
            )}
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3 text-center">
              <div className="display-5 fw-bold text-success mb-2">
                {project.impact?.familiesAssisted || '0'}
              </div>
              <div className="text-muted">Families Assisted</div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="display-5 fw-bold text-success mb-2">
                {project.impact?.individualsBenefited || '0'}
              </div>
              <div className="text-muted">People Helped</div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="display-5 fw-bold text-success mb-2">
                {project.impact?.volunteersInvolved || '0'}
              </div>
              <div className="text-muted">Volunteers</div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="display-5 fw-bold text-success mb-2">
                {project.category || 'N/A'}
              </div>
              <div className="text-muted">Category</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      {project.impact?.keyAchievements?.length > 0 && (
        <section className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-success">Key Achievements</h2>
              <p className="text-muted">Our major milestones and accomplishments</p>
            </div>
            <div className="row g-4">
              {project.impact.keyAchievements.map((achievement, index) => (
                <div key={index} className="col-md-6 col-lg-4">
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
                          <h5 className="mb-0">{achievement}</h5>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Timeline */}
      {project.milestones?.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-success">Project Timeline</h2>
              <p className="text-muted">Our journey and progress</p>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-badge bg-success"></div>
                <div className="timeline-content">
                  <h5>Project Started</h5>
                  <p className="mb-1">We began our journey to make a difference</p>
                  <small className="text-muted">{formatDate(project.startDate)}</small>
                </div>
              </div>
              
              {project.milestones.map((milestone, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-badge bg-primary"></div>
                  <div className="timeline-content">
                    <h5>{milestone.title || `Milestone ${idx + 1}`}</h5>
                    {milestone.description && <p className="mb-1">{milestone.description}</p>}
                    {milestone.date && <small className="text-muted">{formatDate(milestone.date)}</small>}
                  </div>
                </div>
              ))}
              
              {project.completionDate && (
                <div className="timeline-item">
                  <div className="timeline-badge bg-success"></div>
                  <div className="timeline-content">
                    <h5>Project Completed</h5>
                    <p className="mb-1">Successfully achieved our goals</p>
                    <small className="text-muted">{formatDate(project.completionDate)}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 style={{ color: brandColors.primary }}>Project Gallery</h2>
            <p className="text-muted">Browse through our project images</p>
          </div>
          <div className="row g-4">
            {project.images && project.images.length > 0 ? (
              project.images.map((img, idx) => (
                <motion.div 
                  key={idx}
                  className="col-12 col-md-6 col-lg-4 col-xl-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="card h-100 border-0 shadow-sm overflow-hidden">
                    <img 
                      src={getAbsoluteImageUrl(img.url || img)} 
                      alt={`${project.title} - ${idx + 1}`}
                      className="img-fluid w-100"
                      style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setActiveImageIndex(idx)}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="fas fa-images fa-3x text-muted mb-3"></i>
                <p>No images available for this project</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {activeImageIndex >= 0 && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{project.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setActiveImageIndex(-1)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={getAbsoluteImageUrl(project.images[activeImageIndex]?.url)}
                  alt={project.title}
                  className="img-fluid"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
