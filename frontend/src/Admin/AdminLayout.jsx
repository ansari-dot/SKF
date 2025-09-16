import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  // Check if user is authenticated as admin
  useEffect(() => {
    const verifyAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to access admin panel');
          navigate('/login');
          return;
        }

        // Set default authorization header for all axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Decode JWT token to check user role
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.role !== 'admin') {
            toast.error('You do not have permission to access admin panel');
            navigate('/');
            return;
          }
        } catch (decodeError) {
          console.error('Token decode error:', decodeError);
          toast.error('Invalid token. Please login again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        toast.error('Authentication failed. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyAuth();
  }, [navigate, API_URL]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="d-flex admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;