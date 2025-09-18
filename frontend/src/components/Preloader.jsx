import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import '../styles/Preloader.css';

const Preloader = () => {
  return (
    <div className="preloader-overlay">
      <motion.div 
        className="preloader-logo"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.1, 0.9],
          opacity: 1,
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={logo} 
          alt="SKF Logo" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  );
};

export default Preloader;
