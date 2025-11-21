import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import logo from '../assets/logo.png';
import './Header.css'; // Import the new CSS file

const Header = ({ isHeroHeader }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && window.innerWidth < 992) {
      navbarCollapse.classList.remove('show');
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler && toggler.getAttribute('aria-expanded') === 'true') {
        toggler.setAttribute('aria-expanded', 'false');
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (e) => {
    e.currentTarget.blur();
    closeMobileMenu();
  };

  return (
    <>
      <div
        className="breaking-news-banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <div className="breaking-news-content">
          Note: Shehryar Khan Foundation does not accept donations or engage in fundraising activities
        </div>
      </div>

      <motion.nav
        className={`navbar navbar-expand-lg fixed-top modern-navbar ${
          scrolled ? 'navbar-scrolled' : 'navbar-transparent'
        } ${isHeroHeader ? 'hero-header' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          top: '35px',
          minHeight: '90px',
          maxHeight: '90px',
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 0',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(10px) saturate(150%)',
          backgroundColor: isHeroHeader && !scrolled
            ? 'transparent'
            : (scrolled || !isHomePage
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(0, 0, 0, 0.12)'),
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: scrolled ? '1px solid rgba(127, 176, 105, 0.1)' : 'none',
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0 1.5rem',
          }}
        >
          <motion.div
            className="navbar-brand d-flex align-items-center py-0"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginRight: '3rem',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 10,
              position: 'relative',
            }}
          >
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none position-relative"
            >
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '12px',
                  background:
                    'linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(74, 144, 226, 0.1))',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                whileHover={{ opacity: 1 }}
              />
              <img
                src={logo}
                alt="Foundation Logo"
                className="logo-hover position-relative"
                style={{
                  height: '68px',
                  width: 'auto',
                  filter: scrolled
                    ? 'brightness(1) drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                    : 'brightness(1.25) drop-shadow(0 4px 10px rgba(255,255,255,0.4))',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: 1,
                }}
              />
            </Link>
          </motion.div>

          <button
            className="navbar-toggler custom-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-label="Toggle navigation"
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            <i
              className={`fa-solid fa-bars hamburger-icon ${scrolled ? 'scrolled' : 'not-scrolled'}`}
              style={{
                fontSize: '2.25rem',
                transition: 'all 0.3s ease',
              }}
            ></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav mx-auto flex-nowrap align-items-center"
              style={{ gap: '0.5rem' }}
            >
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/our-work', label: 'Our Work' },
                { path: '/get-involved', label: 'Get Involved' },
                { path: '/media', label: 'Media' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.path} className="nav-item">
                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Link
                      className={`nav-link modern-nav-link ${isActive(item.path) ? 'active' : ''}`}
                      to={item.path}
                      onClick={handleNavClick}
                      onMouseDown={(e) => e.preventDefault()}
                      style={{
                        padding: '1rem 2rem',
                        borderRadius: '14px',
                        fontWeight: isActive(item.path) ? '600' : '500',
                        fontSize: '1.1rem',
                        color: !scrolled && isHeroHeader
                          ? '#FFFFFF'
                          : (scrolled
                              ? (isActive(item.path) ? 'var(--brand-primary)' : '#2C3E50')
                              : '#FFFFFF'),
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        letterSpacing: '0.5px',
                        textDecoration: 'none !important',
                        textUnderlineOffset: '0 !important',
                        textDecorationLine: 'none !important',
                        outline: 'none !important',
                        WebkitTapHighlightColor: 'transparent',
                        borderBottom: 'none !important',
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 2 }}>
                        {item.label}
                      </span>
                      {/* Active indicator removed */}
                      {!isActive(item.path) && (
                        <motion.div
                          className="nav-link-hover-bg"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '14px',
                            background: scrolled
                              ? 'rgba(127, 176, 105, 0.06)'
                              : 'rgba(255, 255, 255, 0.1)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            zIndex: 1,
                          }}
                          whileHover={{ opacity: 1 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center">
              {isAuthenticated ? (
                <div className="dropdown">
                  <motion.button
                    className="btn btn-outline-success dropdown-toggle modern-user-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      borderRadius: '12px',
                      padding: '0.65rem 1.5rem',
                      fontWeight: '600',
                      borderWidth: '2px',
                      fontSize: '1rem',
                    }}
                  >
                    {user?.name || 'User'}
                  </motion.button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      padding: '0.5rem',
                    }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => {
                          handleLogout();
                          closeMobileMenu();
                        }}
                        style={{
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Header;
