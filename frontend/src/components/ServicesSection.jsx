import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const ServicesSection = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: 'fas fa-users',
      title: 'Become a Volunteer',
      description: 'Our organization is actively seeking passionate individuals who want to join our team and make a meaningful impact. As a volunteer, you will have the opportunity to contribute your skills, time, and energy towards our mission. We believe that together we can create positive change and make a difference in the lives of those we serve.',
      buttonText: 'Join Now',
      buttonColor: 'primary',
      onClick: () => navigate('/get-involved')
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Community Support',
      description: 'We provide essential support and resources to help communities thrive and overcome challenges together. Our community support programs focus on building strong, resilient communities through various initiatives and partnerships.',
      buttonText: 'Get Support',
      buttonColor: 'primary',
      onClick: () => navigate('/our-work')
    },
    {
      icon: 'fas fa-handshake',
      title: 'Become a Partner',
      description: 'We are always looking for like-minded organizations and individuals to partner with us in our mission to create positive change. As a partner, you will have the opportunity to collaborate with us on various initiatives and projects that align with our values and goals.',
      buttonText: 'Partner Us',
      buttonColor: 'primary',
      onClick: () => navigate('/get-involved')
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
    <section className="py-5 modern-services-section" style={{ background: '#f8f9fa' }}>
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>How You Can Help</h2>
          <p className="lead text-muted">Join us in making a difference</p>
        </motion.div>
        
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                className="service-card h-100"
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card border-0 h-100 p-4" style={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  background: '#ffffff',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Decorative gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: `linear-gradient(90deg, var(--brand-primary), var(--brand-accent))`,
                    opacity: 0.8
                  }}></div>
                  
                  <div className="card-body text-center position-relative" style={{ zIndex: 1 }}>
                    <motion.div
                      className="service-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '90px', 
                        height: '90px',
                        background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.15), rgba(74, 144, 226, 0.15))',
                        border: '3px solid var(--brand-primary)'
                      }}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        borderColor: 'var(--brand-accent)',
                        boxShadow: '0 8px 20px rgba(127, 176, 105, 0.3)'
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${service.icon} fs-2`} style={{ color: 'var(--brand-primary)' }}></i>
                    </motion.div>
                    
                    <h4 className="card-title fw-bold mb-3" style={{ color: '#2C3E50', fontSize: '1.4rem' }}>
                      {service.title}
                    </h4>
                    <p className="card-text text-muted mb-4" style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: '1.7',
                      minHeight: '100px'
                    }}>
                      {service.description}
                    </p>
                    
                    <motion.button
                      className={`btn btn-primary mt-auto`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        boxShadow: '0 8px 20px rgba(127, 176, 105, 0.4)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={service.onClick}
                      style={{ 
                        cursor: 'pointer',
                        borderRadius: '50px',
                        padding: '0.7rem 2rem',
                        fontWeight: '600',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {service.buttonText}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;