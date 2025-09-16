import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Preloader = () => {
  return (
    <div className="preloader-overlay">
      <motion.img
        src={logo}
        alt="Loading"
        className="preloader-image logo-hover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
};

export default Preloader;


