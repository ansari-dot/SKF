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
    <footer className="modern-footer py-5" style={{ 
      background: 'linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-primary) 100%)', 
      color: '#ffffff', 
      boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      
      <div className="container position-relative" style={{ zIndex: 2 }}>
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
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logo}
              alt="Foundation Logo"
              className="mb-3 logo-hover"
              style={{ 
                height: '80px', 
                filter: 'brightness(1.2) drop-shadow(0 4px 12px rgba(255,255,255,0.3))',
                transition: 'all 0.3s ease'
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-light mb-5 mx-auto"
            style={{ 
              maxWidth: '700px', 
              lineHeight: '1.8', 
              color: 'rgba(255, 255, 255, 0.95)', 
              fontWeight: '400',
              padding: '0 1rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong style={{ 
              color: '#ffffff', 
              fontWeight: '700'
            }}>Dedicated to making positive changes</strong> in communities around the world through 
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '400' }}> sustainable programs, education initiatives, and community development projects. 
            Together, we can create lasting impact and build better futures.</span>
          </motion.p>

          {/* Social Media Links */}
          <motion.div
            className="d-flex justify-content-center gap-4 mb-5 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon d-flex align-items-center justify-content-center"
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  color: social.color || '#2C3E50',
                  boxShadow: '0 8px 24px rgba(255, 255, 255, 0.4)',
                  rotate: 360
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <i className={social.icon} style={{ position: 'relative', zIndex: 1 }}></i>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-4 border-top border-light border-opacity-25"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-light mb-0" style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontWeight: '400'
            }}>
              &copy; <strong style={{ 
                color: '#ffffff', 
                fontWeight: '600'
              }}>2024 Shehryar Khan Foundation</strong>. All rights reserved. |
              <motion.a 
                href="#" 
                className="text-decoration-none ms-2 fw-medium footer-link" 
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >Privacy Policy</motion.a> |
              <motion.a 
                href="#" 
                className="text-decoration-none ms-2 fw-medium footer-link"
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >Terms of Service</motion.a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;