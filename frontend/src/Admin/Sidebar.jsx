import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
const Sidebar = () => {
  const location = useLocation();
  
  // Navigation items for admin panel
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/get-involved', label: 'Get Involved', icon: '🤝' },
    { path: '/admin/projects', label: 'Projects', icon: '📋' },
    { path: '/admin/programs', label: 'Programs', icon: '📝' },
    { path: '/admin/opportunities', label: 'Opportunities', icon: '💼' },
    { path: '/admin/media', label: 'Media', icon: '📷' },
    { path: '/admin/contact', label: 'Contact Messages', icon: '✉️' },
    { path: '/admin/featured-events', label: 'Featured Events', icon: '🌟' },
    { path: '/admin/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="admin-sidebar modern-admin-sidebar">
      <div className="logo-container position-relative">
        <img 
          src={logo}
          alt="SKF Logo" 
          className="logo-img mb-2"
        />
        <h2 className="fs-5 fw-bold mb-1" style={{fontFamily: "'Amiri', serif", letterSpacing: '0.5px'}}>
          لوحة التحكم الإدارية
        </h2>
        <h3 className="fs-6 mb-0" style={{fontWeight: 600}}>Admin Panel</h3>
        <p className="subtitle mb-0">SKF Management</p>
        
      </div>
      
      <nav className="mt-3">
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                style={{transition: 'all 0.3s', borderRadius: '8px'}}
              >
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer mt-auto">
        <Link 
          to="/"
          className="nav-link d-flex align-items-center"
        >
          <span className="icon">🏠</span>
          <span>Back to Website</span>
        </Link>
        <button 
          className="nav-link d-flex align-items-center w-100 border-0 bg-transparent mt-2"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        >
          <span className="icon">🔪</span>
          <span>Logout</span>
        </button>
        <div className="text-center mt-3" style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)'}}>
          <span className="islamic-decoration">🌙</span> <span className="islamic-decoration">🤲</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;