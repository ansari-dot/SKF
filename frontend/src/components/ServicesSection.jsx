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
    <section className="py-5">
      <div className="container">
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
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card border-0 shadow-sm h-100 p-4">
                  <div className="card-body text-center">
                    <motion.div
                      className="service-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-light"
                      style={{ width: '80px', height: '80px' }}
                      whileHover={{ rotate: 360, backgroundColor: '#87CEEB' }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.i 
                        className={`${service.icon} text-primary fs-2`}
                        whileHover={{ color: '#ffffff' }}
                      ></motion.i>
                    </motion.div>
                    
                    <h4 className="card-title fw-bold mb-3 text-primary">{service.title}</h4>
                    <p className="card-text text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {service.description}
                    </p>
                    
                    <motion.button
                      className={`btn btn-${service.buttonColor} mt-auto`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={service.onClick}
                      style={{ cursor: 'pointer' }}
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