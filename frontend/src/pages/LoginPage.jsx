import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  // Islamic verses for charity and community service
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
      const API_URL = import.meta.env.VITE_URL;
      const response = await axios.post(`${API_URL}/user/login`, {
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
    <div className="login-page min-vh-100" style={{
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 50%, #007bff 100%)',
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }}></div>

      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Islamic Content */}
          <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center text-white position-relative">
            <div className="text-center px-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-4">
                  <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🕌</div>
                  <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: "'Amiri', serif" }}>
                    Shehryar Khan Foundation
                  </h1>
                  <h2 className="h3 mb-4">Admin Portal</h2>
                </div>

                {/* Islamic Verse Card */}
                <motion.div
                  key={currentVerse.arabic}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card border-0 shadow-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="card-body p-4">
                    <div className="arabic-text mb-3" style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      fontFamily: "'Amiri', serif",
                      lineHeight: '2',
                      color: '#ffffff'
                    }}>
                      {currentVerse.arabic}
                    </div>
                    <div className="translation mb-2" style={{
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                      "{currentVerse.translation}"
                    </div>
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600' }}>
                      — {currentVerse.reference}
                    </small>
                  </div>
                </motion.div>

                <div className="mt-4">
                  <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Serving humanity with compassion and dedication
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: '400px', padding: '2rem' }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card shadow-xl border-0"
                style={{
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="card-body p-5">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="mb-3"
                    >
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #28a745, #007bff)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        fontSize: '2rem',
                        boxShadow: '0 10px 30px rgba(40, 167, 69, 0.3)'
                      }}>
                        🔐
                      </div>
                    </motion.div>
                    <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Welcome Back</h2>
                    <p className="text-muted">Access your admin dashboard</p>
                  </div>

                  {/* Error Message */}
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="alert alert-danger"
                      style={{ borderRadius: '10px' }}
                    >
                      {errors.general}
                    </motion.div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#2c3e50' }}>
                        Email Address
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{
                          background: 'linear-gradient(135deg, #28a745, #007bff)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px 0 0 10px'
                        }}>
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          style={{
                            border: '2px solid #e9ecef',
                            borderRadius: '0 10px 10px 0',
                            padding: '12px 15px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      {errors.email && (
                        <div className="invalid-feedback d-block">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#2c3e50' }}>
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{
                          background: 'linear-gradient(135deg, #28a745, #007bff)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px 0 0 10px'
                        }}>
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          required
                          style={{
                            border: '2px solid #e9ecef',
                            borderRadius: '0 10px 10px 0',
                            padding: '12px 15px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          style={{ transform: 'scale(1.2)' }}
                        />
                        <label className="form-check-label ms-2" htmlFor="rememberMe" style={{ color: '#6c757d' }}>
                          Remember me
                        </label>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      className="btn w-100 py-3 fw-semibold"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: 'linear-gradient(135deg, #28a745, #007bff)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 25px rgba(40, 167, 69, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isLoading ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Signing In...
                        </span>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Sign In to Dashboard
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Additional Links */}
                  <div className="text-center mt-4">
                    <div className="d-flex justify-content-center align-items-center">
                      <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>🤲</span>
                      <span className="mx-2" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                        May Allah bless your service
                      </span>
                      <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>🤲</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Back to Home */}
              <div className="text-center mt-4">
                <Link 
                  to="/" 
                  className="text-decoration-none"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
