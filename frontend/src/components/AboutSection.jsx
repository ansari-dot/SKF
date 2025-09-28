import React from "react";
import { motion } from "framer-motion";
import a1 from '../assets/hero/a1.webp';
import a2 from '../assets/hero/a2.webp';
const AboutSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
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
                  className="img-fluid rounded-4 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <motion.div
                className="position-absolute"
                style={{ 
                  bottom: "-20px",
                  right: "-20px",
                  width: '200px',
                  height: '200px',
                  zIndex: 2
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                <img
                  src={a2}
                  alt="Our Team"
                  className="img-fluid rounded-4 border border-4 border-white shadow"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}>
                About us
              </motion.h2>

              <motion.p
                className="text-muted mb-4 lead"
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
                className="row mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    <span>OUR VISION</span>
                  </div>
                  <p className="small text-muted">
                    A world where everyone has access to basic necessities and
                    opportunities for growth.
                  </p>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    <span>OUR MISSION</span>
                  </div>
                  <p className="small text-muted">
                    To provide sustainable solutions and support to underserved
                    communities.
                  </p>
                </div>
              </motion.div>

              <motion.button
                className="btn btn-primary btn-lg px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}>
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
