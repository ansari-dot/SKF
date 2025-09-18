import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/1CNRUnGEdi/', color: '#1877f2' },
    { icon: 'fab fa-twitter', url: '#', color: '#1da1f2' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shehryarkhanfoundation?igsh=MXYwbGl3ajN5ejNseQ==', color: '#e4405f' },
    { icon: 'fab fa-linkedin-in', url: '#', color: '#0077b5' }
  ];

  return (
    <footer className="py-5" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00aa55 100%)', color: '#ffffff', boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.5)' }}>
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Foundation Name */}
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={logo}
              alt="Foundation Logo"
              className="mb-3 logo-hover"
              style={{ height: '75px', filter: 'brightness(1.3) drop-shadow(0 2px 4px rgba(255,255,255,0.1))' }}
            />
           {/*<h4 className="fw-bold text-primary mb-2">SHEHRYAR KHAN</h4>
            <h5 className="text-light">FOUNDATION</h5> */}
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-light mb-4 mx-auto"
            style={{ maxWidth: '600px', fontSize: '1.3rem', lineHeight: '1.9', color: '#ffffff', fontWeight: '400', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong style={{ color: '#ffffff', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>Dedicated to making positive changes</strong> in communities around the world through 
            <span style={{ color: '#f8f9fa', fontWeight: '500' }}> sustainable programs, education initiatives, and community development projects. 
            Together, we can create lasting impact and build better futures.</span>
          </motion.p>

          {/* Social Media Links */}
          <motion.div
            className="d-flex justify-content-center gap-5 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="social-icon d-flex align-items-center justify-content-center"
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.4)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  color: social.color || '#0a0a0a',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <i className={social.icon} style={{ position: 'relative', zIndex: 1 }}></i>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-light mb-0" style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              &copy; <strong style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>2024 Shehryar Khan Foundation</strong>. All rights reserved. |
              <a href="#" className="text-primary text-decoration-none ms-2 fw-bold" style={{ color: '#0d6efd', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Privacy Policy</a> |
              <a href="#" className="text-primary text-decoration-none ms-2 fw-bold" style={{ color: '#0d6efd', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Terms of Service</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;