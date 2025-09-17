import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import  logo from '../assets/logo.png';

const Header = ({ isHeroHeader }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const handleLogout = () => {
    dispatch(logout());
    // Clear cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const closeMobileMenu = () => {
    // Close mobile navbar when clicking on nav items
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && window.innerWidth < 992) {
      // Remove show class to collapse the navbar
      navbarCollapse.classList.remove('show');
      
      // Also update the toggler button state if needed
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler && toggler.getAttribute('aria-expanded') === 'true') {
        toggler.setAttribute('aria-expanded', 'false');
      }
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="breaking-news-banner" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <div className="breaking-news-content">
        Note: Shehryar Khan Foundation does not accept donations or engage in fundraising activities
      </div>
    </div>
    <motion.nav
      className={`navbar navbar-expand-lg fixed-top transition-all ${
        scrolled ? 'navbar-light bg-white shadow-sm' : 'navbar-dark'
      } ${isHeroHeader ? 'hero-header' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ top: '35px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          className="navbar-brand d-flex align-items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logo}
              alt="SKF Logo"
              className="me-2 logo-hover"
              style={{ height: '55px', width: 'auto', maxWidth: '120px' }}
            />
            {/* <span className="fw-bold text-primary d-none d-md-inline">Shehryar Khan Foundation</span>*/}
          </Link>
        </motion.div>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars toggler-icon"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto flex-nowrap">
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  to="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                  to="/about"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/our-work') ? 'active' : ''}`}
                  to="/our-work"
                  onClick={closeMobileMenu}
                >
                  Our Work
                </Link>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/get-involved') ? 'active' : ''}`}
                  to="/get-involved"
                  onClick={closeMobileMenu}
                >
                  Get Involved
                </Link>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/media') ? 'active' : ''}`}
                  to="/media"
                  onClick={closeMobileMenu}
                >
                  Media
                </Link>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  to="/contact"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </motion.div>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  {user?.name || 'User'}
                </button>
                <ul className="dropdown-menu">

                  <li>
                    <button className="dropdown-item" onClick={(e) => { handleLogout(); closeMobileMenu(); }}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                

              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
    </>
  );
};

export default Header;