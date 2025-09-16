import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    {path:'/admin/profile',label:"Profile",icon:'📝' }
  ];

  return (
    <div className="admin-sidebar">
      <div className="logo-container">
        <h2 className="fs-4 fw-bold mb-0">Admin Panel</h2>
      </div>
      
      <nav className="mt-3">
        <ul className="nav flex-column">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
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
            window.location.href = '/login';
          }}
        >
          <span className="icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;