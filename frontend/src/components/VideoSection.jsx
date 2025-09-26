import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="display-4 fw-bold mb-3">Our Story</h2>
          <p className="lead text-muted mb-0">
            Watch how we're making a difference in communities around the world
          </p>
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="col-lg-8">
            <div
              className="video-container position-relative"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <motion.div
                className="video-wrapper"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", // keeps 16:9 ratio
                }}
              >
                <video
                  src="/src/assets/video.mp4"
                  title="Our Story Video"
                  controls
                  className="rounded-3 shadow-lg"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                    objectFit: "cover"
                  }}
                />
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="row mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="col-lg-4">
            <div className="text-center">
              <motion.div
                className="feature-icon mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-heart text-primary fs-1"></i>
              </motion.div>
              <h5 className="fw-bold mb-2">Compassionate Care</h5>
              <p className="text-muted">
                We provide compassionate care and support to those in need,
                ensuring everyone feels valued and heard.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="text-center">
              <motion.div
                className="feature-icon mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-hands-helping text-primary fs-1"></i>
              </motion.div>
              <h5 className="fw-bold mb-2">Community Support</h5>
              <p className="text-muted">
                Our dedicated team works tirelessly to support communities
                through various programs and initiatives.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="text-center">
              <motion.div
                className="feature-icon mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-star text-primary fs-1"></i>
              </motion.div>
              <h5 className="fw-bold mb-2">Excellence</h5>
              <p className="text-muted">
                We strive for excellence in everything we do,
                ensuring the highest quality of service and support.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;

