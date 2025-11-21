import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const FeaturesSection = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: 'fas fa-utensils',
      title: 'A Healthy Food',
      description: 'Providing nutritious meals to those in need, ensuring no one goes hungry in our community.',
      color: 'primary',
      onClick: () => navigate('/our-work')
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'A Tomorrow',
      description: 'Investing in education and skills development to create brighter futures for underprivileged children.',
      color: 'primary',
      onClick: () => navigate('/our-work')
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Community Support',
      description: 'We provide essential support and resources to help communities thrive and overcome challenges together.',
      color: 'primary',
      onClick: () => navigate('/our-work')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-5 modern-features-section">
      <div className="container">
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                className="feature-card h-100"
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card border-0 h-100 text-center p-4 modern-feature-card" style={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Gradient Background on Hover */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.05), rgba(74, 144, 226, 0.05))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} className="hover-gradient"></div>
                  
                  <div className="card-body position-relative" style={{ zIndex: 1 }}>
                    <motion.div
                      className="mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '90px',
                        height: '90px',
                        background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(74, 144, 226, 0.1))',
                        border: '3px solid var(--brand-primary)',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        borderColor: 'var(--brand-accent)',
                        boxShadow: '0 8px 20px rgba(127, 176, 105, 0.3)'
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${feature.icon} fs-2`} style={{ color: 'var(--brand-primary)' }}></i>
                    </motion.div>
                    
                    <h4 className="card-title fw-bold mb-3" style={{ color: '#2C3E50', fontSize: '1.4rem' }}>
                      {feature.title}
                    </h4>
                    <p className="card-text text-muted mb-4" style={{ 
                      lineHeight: '1.7',
                      fontSize: '0.95rem',
                      minHeight: '60px'
                    }}>
                      {feature.description}
                    </p>
                    
                    <motion.button
                      className={`btn btn-outline-primary mt-auto`}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'var(--brand-primary)',
                        color: 'white',
                        borderColor: 'var(--brand-primary)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={feature.onClick}
                      style={{
                        borderRadius: '50px',
                        padding: '0.6rem 1.5rem',
                        fontWeight: '600',
                        borderWidth: '2px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <style>{`
        .modern-feature-card:hover .hover-gradient {
          opacity: 1;
        }
        .modern-feature-card:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;