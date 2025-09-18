import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaLock, FaEnvelope, FaSignInAlt, FaArrowLeft, FaGoogle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentVerse, setCurrentVerse] = useState({
    arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    translation: "And cooperate in righteousness and piety.",
    reference: "Quran 5:2"
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const islamicContent = [
    {
      arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
      translation: "And cooperate in righteousness and piety.",
      reference: "Quran 5:2"
    },
    {
      arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
      translation: "And whoever does an atom's weight of good will see it.",
      reference: "Quran 99:7"
    },
    {
      arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
      translation: "The believers are but brothers.",
      reference: "Quran 49:10"
    },
    {
      arabic: "مَن كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ",
      translation: "Whoever fulfills the needs of his brother, Allah will fulfill his needs.",
      reference: "Hadith - Bukhari"
    }
  ];

  // Rotate verses every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicContent.length);
      setCurrentVerse(islamicContent[randomIndex]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await axios.post(`https://shehryarkhanfoundation.com/api/user/login`, {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch(login({ user, token }));
      toast.success('Login successful!');

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Islamic Content */}
        <div className="login-content">
          <motion.div 
            className="logo-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="SKF Logo" className="login-logo" />
            <h2>Welcome Back</h2>
            <p>Sign in to access your account</p>
          </motion.div>

          <motion.div 
            className="verse-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="arabic-verse">{currentVerse.arabic}</p>
            <p className="translation">{currentVerse.translation}</p>
            <p className="reference">{currentVerse.reference}</p>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="login-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/" className="back-button">
            <FaArrowLeft /> Back to Home
          </Link>
          
          <div className="form-wrapper">
            <h1>Sign In</h1>
            
            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email */}
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <span className="input-icon"><FaEnvelope /></span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              {/* Password */}
              <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <div className="d-flex justify-content-between">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>
                <div className="input-group">
                  <span className="input-icon"><FaLock /></span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>
              
              {/* Remember Me */}
              <div className="form-group remember-me">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
