import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-page min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card shadow-lg border-0 text-center"
              >
                <div className="card-body p-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-4"
                  >
                    <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                  </motion.div>
                  
                  <h3 className="fw-bold text-dark mb-3">Check Your Email</h3>
                  <p className="text-muted mb-4">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    If you don't see the email, check your spam folder or try again.
                  </div>
                  
                  <div className="d-grid gap-2 mt-4">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Try Another Email
                    </button>
                    <Link to="/login" className="btn btn-link text-decoration-none">
                      Back to Login
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Back to Home */}
              <div className="text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card shadow-lg border-0"
            >
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-3"
                  >
                    <i className="fas fa-key text-primary" style={{ fontSize: '3rem' }}></i>
                  </motion.div>
                  <h2 className="fw-bold text-dark mb-2">Forgot Password?</h2>
                  <p className="text-muted">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="alert alert-danger"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending Reset Link...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </motion.button>
                </form>

                {/* Help Text */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    Remember your password?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Back to Home */}
            <div className="text-center mt-3">
              <Link to="/" className="text-decoration-none">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
