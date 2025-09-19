import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fas fa-utensils',
      title: 'A Healthy Food',
      description: 'Providing nutritious meals to those in need, ensuring no one goes hungry in our community.',
      color: 'primary'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'A Tomorrow',
      description: 'Investing in education and skills development to create brighter futures for underprivileged children.',
      color: 'primary'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Community Support',
      description: 'We provide essential support and resources to help communities thrive and overcome challenges together.',
      color: 'primary'
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
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                className="feature-card h-100"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card border-0 shadow-sm h-100 text-center p-4">
                  <div className="card-body">
                    <motion.div
                      className="mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '80px',
                        height: '80px',
                        border: '2px solid #7FB069',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ 
                        rotate: 360,
                        borderColor: '#4A90E2',
                        boxShadow: '0 0 15px rgba(127, 176, 105, 0.5)'
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${feature.icon} fs-2`} style={{ color: '#7FB069' }}></i>
                    </motion.div>
                    
                    <h4 className="card-title fw-bold mb-3">{feature.title}</h4>
                    <p className="card-text text-muted">{feature.description}</p>
                    
                    <motion.button
                      className={`btn btn-outline-${feature.color} mt-3`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
    </section>
  );
};

export default FeaturesSection;