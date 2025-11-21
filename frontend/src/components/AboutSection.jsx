import React from "react";
import { motion } from "framer-motion";
import a1 from '../assets/hero/a1.webp';
import a2 from '../assets/hero/a2.webp';
const AboutSection = () => {
  return (
    <section className="py-5 modern-about-section" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)' }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <motion.div
              className="about-image-container position-relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <div className="main-image-wrapper position-relative">
                <motion.img
                  src={a1}
                  alt="About Us"
                  className="img-fluid"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
                  }}
                />
              </div>

              <motion.div
                className="position-absolute"
                style={{ 
                  bottom: "-30px",
                  right: "-30px",
                  width: '220px',
                  height: '220px',
                  zIndex: 2
                }}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                <img
                  src={a2}
                  alt="Our Team"
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    border: '5px solid white',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}>
              <motion.h2
                className="display-5 fw-bold mb-4"
                style={{ color: '#2C3E50' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}>
                About Us
              </motion.h2>

              <motion.p
                className="text-muted mb-4 lead"
                style={{ fontSize: '1.15rem', lineHeight: '1.8' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}>
                We are a dedicated organization committed to making positive
                changes in communities around the world. Our mission is to
                provide essential services and support to those who need it
                most.
              </motion.p>

              <motion.p
                className="text-muted mb-4"
                style={{ fontSize: '1rem', lineHeight: '1.7' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                Through our various programs including food distribution,
                education initiatives, and community development projects, we
                strive to create lasting impact and empower individuals to build
                better futures.
              </motion.p>

              <motion.div
                className="row mb-4 g-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="col-12 col-md-6">
                  <motion.div 
                    className="p-3 rounded-3"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(74, 144, 226, 0.05))',
                      border: '1px solid rgba(127, 176, 105, 0.2)'
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-check-circle" style={{ color: 'var(--brand-primary)', fontSize: '1.2rem' }}></i>
                      <span className="ms-2 fw-bold" style={{ color: '#2C3E50' }}>OUR VISION</span>
                    </div>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      A world where everyone has access to basic necessities and
                      opportunities for growth.
                    </p>
                  </motion.div>
                </div>
                <div className="col-12 col-md-6">
                  <motion.div 
                    className="p-3 rounded-3"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(127, 176, 105, 0.05))',
                      border: '1px solid rgba(74, 144, 226, 0.2)'
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-check-circle" style={{ color: 'var(--brand-accent)', fontSize: '1.2rem' }}></i>
                      <span className="ms-2 fw-bold" style={{ color: '#2C3E50' }}>OUR MISSION</span>
                    </div>
                    <p className="small text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      To provide sustainable solutions and support to underserved
                      communities.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.button
                className="btn btn-primary btn-lg px-5 py-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onClick={() => window.location.href = '/about'}
                style={{
                  borderRadius: '50px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(127, 176, 105, 0.3)',
                  border: 'none'
                }}>
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
