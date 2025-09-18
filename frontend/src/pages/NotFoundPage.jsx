import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="moon">
        <div className="crescent"></div>
      </div>
      
      <motion.div 
        className="not-found-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="error-code"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.div>
        
        <motion.h1 
          className="error-title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          className="error-message"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! We couldn't find the page you're looking for.
          <br />
          The page may have been moved or deleted.
        </motion.p>
        
        <motion.div 
          className="search-box"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search the site..." />
          </div>
        </motion.div>
        
        <motion.div 
          className="action-buttons"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/" className="btn btn-primary">
            <FaHome className="btn-icon" />
            Back to Home
          </Link>
          <button className="btn btn-secondary" onClick={() => window.history.back()}>
            <FaArrowLeft className="btn-icon" />
            Go Back
          </button>
        </motion.div>
      </motion.div>
      
      <div className="islamic-pattern"></div>
    </div>
  );
};

export default NotFoundPage;
