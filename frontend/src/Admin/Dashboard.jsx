import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    partnerships: 0,
    sponsorships: 0,
    volunteers: 0,
    projects: 0,
    programs: 0,
    media: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_URL}/api` ;

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch counts from different endpoints
      // Axios will use the default Authorization header set in AdminLayout
      const [partnershipRes, sponsorshipRes, volunteerRes, contactRes] = await Promise.all([
        axios.get(`${API_URL}/partnership/get`),
        axios.get(`${API_URL}/sponsorship/get`),
        axios.get(`${API_URL}/volunteer/get`),
        axios.get(`${API_URL}/contact/get`),
      
      ]);

      // Update stats with counts
      setStats({
        partnerships: partnershipRes.data.data?.length || 0,
        sponsorships: sponsorshipRes.data.data?.length || 0,
        volunteers: volunteerRes.data.data?.length || 0,
        contacts: contactRes.data.data?.length || 0,
        // For now, set these to 0 until we implement their APIs
       //projects:  0,
       //programs: 0,
        //media: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Stat card component
  const StatCard = ({ title, count, icon, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="d-flex align-items-center">
        <div className="stat-icon">
          <span>{icon}</span>
        </div>
        <div className="ms-3">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-value">{count}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="admin-card p-4">
        <h1 className="display-6 fw-bold mb-4">Admin Dashboard</h1>
        
        <div className="mb-5">
          <h2 className="fs-4 fw-semibold mb-3">Overview</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard title="Partnerships" count={stats.partnerships} icon="🤝" color="bg-primary bg-opacity-10" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard title="Sponsorships" count={stats.sponsorships} icon="💰" color="bg-success bg-opacity-10" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard title="Volunteers" count={stats.volunteers} icon="👥" color="bg-warning bg-opacity-10" />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard title="Contact Messages" count={stats.contacts} icon="✉️" color="bg-info bg-opacity-10" />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="fs-4 fw-semibold mb-3">Content Management</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <StatCard title="Projects" count={stats.projects} icon="📋" color="bg-danger bg-opacity-10" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <StatCard title="Programs" count={stats.programs} icon="📝" color="bg-secondary bg-opacity-10" />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <StatCard title="Media Items" count={stats.media} icon="📷" color="bg-dark bg-opacity-10" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={fetchDashboardStats}
            className="btn btn-primary admin-btn-primary"
          >
            <i className="fas fa-sync-alt me-2"></i> Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;