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
    <div className="login-page" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                     radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`,
        animation: 'backgroundShift 15s ease-in-out infinite alternate'
      }}></div>

      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
        borderRadius: '50%',
        animation: 'float 20s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
        borderRadius: '20px',
        transform: 'rotate(45deg)',
        animation: 'float 25s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        animation: 'float 18s ease-in-out infinite'
      }}></div>

      <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 align-items-center">
          {/* Left Side - Brand Section */}
          <div className="col-lg-7 d-none d-lg-block">
            <div className="text-center text-white px-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="mb-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                    className="mb-4"
                  >
                    <div style={{
                      width: '120px',
                      height: '120px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      fontSize: '4rem',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                      🕌
                    </div>
                  </motion.div>
                  
                  <h1 className="display-4 fw-bold mb-3" style={{
                    fontFamily: "'Amiri', serif",
                    background: 'linear-gradient(135deg, #ffffff, #f8f9ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    Shehryar Khan Foundation
                  </h1>
                  
                  <div className="mb-4">
                    <span style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                      Admin Dashboard
                    </span>
                  </div>
                </div>

                {/* Islamic Verse Card */}
                <motion.div
                  key={currentVerse.arabic}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    maxWidth: '500px',
                    margin: '0 auto'
                  }}
                >
                  <div className="text-center mb-3">
                    <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>📖</span>
                  </div>
                  <div style={{
                    fontSize: '1.6rem',
                    fontFamily: "'Amiri', serif",
                    lineHeight: '2',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {currentVerse.arabic}
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    opacity: 0.9,
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    "{currentVerse.translation}"
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    textAlign: 'center'
                  }}>
                    — {currentVerse.reference}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-4"
                >
                  <p style={{
                    fontSize: '1.2rem',
                    opacity: 0.9,
                    fontWeight: '300'
                  }}>
                    Serving humanity with compassion and dedication
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center">
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem 1rem' }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="mb-3"
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      fontSize: '2rem',
                      color: 'white',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                    }}>
                      🔐
                    </div>
                  </motion.div>
                  <h2 style={{
                    color: '#2d3748',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    Welcome Back
                  </h2>
                  <p style={{
                    color: '#718096',
                    fontSize: '1rem'
                  }}>
                    Sign in to your admin dashboard
                  </p>
                </div>
                {/* Error Message */}
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="alert alert-danger mb-4"
                    style={{
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                      color: 'white',
                      fontWeight: '500'
                    }}
                  >
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {errors.general}
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" style={{
                      color: '#4a5568',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      display: 'block'
                    }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
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
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '1rem 1rem 1rem 3rem',
                          fontSize: '1rem',
                          height: '50px',
                          transition: 'all 0.3s ease',
                          background: '#f8fafc'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                          e.target.style.background = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                          e.target.style.background = '#f8fafc';
                        }}
                      />
                      <i className="fas fa-envelope" style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#a0aec0',
                        fontSize: '1rem'
                      }}></i>
                    </div>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          color: '#e53e3e',
                          fontSize: '0.85rem',
                          marginTop: '0.5rem',
                          fontWeight: '500'
                        }}
                      >
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.email}
                      </motion.div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" style={{
                      color: '#4a5568',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      display: 'block'
                    }}>
                      Password
                    </label>
                    <div style={{ position: 'relative' }}>
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
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '1rem 1rem 1rem 3rem',
                          fontSize: '1rem',
                          height: '50px',
                          transition: 'all 0.3s ease',
                          background: '#f8fafc'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                          e.target.style.background = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                          e.target.style.background = '#f8fafc';
                        }}
                      />
                      <i className="fas fa-lock" style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#a0aec0',
                        fontSize: '1rem'
                      }}></i>
                    </div>
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          color: '#e53e3e',
                          fontSize: '0.85rem',
                          marginTop: '0.5rem',
                          fontWeight: '500'
                        }}
                      >
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.password}
                      </motion.div>
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
                        style={{
                          transform: 'scale(1.2)',
                          accentColor: '#667eea'
                        }}
                      />
                      <label className="form-check-label ms-2" htmlFor="rememberMe" style={{
                        color: '#718096',
                        fontSize: '0.9rem'
                      }}>
                        Remember me
                      </label>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn w-100"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '0.875rem',
                      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </span>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center">
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In to Dashboard
                      </span>
                    )}
                  </motion.button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p style={{
                    color: '#a0aec0',
                    fontSize: '0.85rem',
                    margin: 0
                  }}>
                    🤲 May Allah bless your service 🤲
                  </p>
                </div>
              </motion.div>

              {/* Back to Home */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-center mt-4"
              >
                <Link
                  to="/"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        @keyframes backgroundShift {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .form-control:focus {
          outline: none !important;
        }
        
        @media (max-width: 991.98px) {
          .col-lg-7 {
            display: none !important;
          }
          
          .col-lg-5 {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 576px) {
          .login-page > div {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
