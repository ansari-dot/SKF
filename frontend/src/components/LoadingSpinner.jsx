import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, color = '#28a745' }) => {
  return (
    <div className="spinner-icon-container">
      <FaSpinner className="spinner-icon" style={{ 
        fontSize: size,
        color: color
      }} />
    </div>
  );
};

export default LoadingSpinner;
