import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, text = 'Loading...' }) => {
  return (
    <div className="loading-spinner-overlay">
      <div className="spinner-container">
        <FaSpinner className="spinner-icon" style={{ fontSize: size }} />
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
