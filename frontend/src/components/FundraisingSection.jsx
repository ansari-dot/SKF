import React from 'react';
import { motion } from 'framer-motion';
import BackgroundAnimation from './BackgroundAnimation';

const FundraisingSection = () => {
  return (
    <section className="py-5 position-relative">
      <BackgroundAnimation />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-primary mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join Us in Supporting Our Cause
              </motion.p>
              
              <motion.h2
                className="display-5 fw-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Fundraising for the People and<br />
                Causes you Care About
              </motion.h2>
              
              <motion.p
                className="lead text-muted mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Every contribution, no matter the size, makes a meaningful difference in the lives 
                of those we serve. Together, we can create lasting positive change in communities 
                around the world.
              </motion.p>
            </motion.div>
          </div>
          
          <div className="col-lg-4 text-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.button
                className="btn btn-primary btn-lg px-5 py-3"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(74,144,226,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-heart me-2"></i>
                GET INVOLVED NOW
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundraisingSection; 