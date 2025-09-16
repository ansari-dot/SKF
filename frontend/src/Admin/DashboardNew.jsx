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
    contacts: 0,
    donations: 0,
    beneficiaries: 0,
    events: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVerse, setCurrentVerse] = useState({
    arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
    translation: "And whoever does an atom's weight of good will see it.",
    reference: "Quran 99:7"
  });

  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  // Islamic verses and Hadith for charity
  const islamicContent = [
    {
      arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
      translation: "And whoever does an atom's weight of good will see it.",
      reference: "Quran 99:7"
    },
    {
      arabic: "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً",
      translation: "Who is it that would loan Allah a goodly loan so He may multiply it for him many times over?",
      reference: "Quran 2:245"
    },
    {
      arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
      translation: "Charity extinguishes sin as water extinguishes fire.",
      reference: "Hadith - Tirmidhi"
    },
    {
      arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      translation: "No wealth decreases because of charity.",
      reference: "Hadith - Muslim"
    },
    {
      arabic: "وَأَنفِقُوا مِن مَّا رَزَقْنَاكُم",
      translation: "And spend from what We have provided for you.",
      reference: "Quran 63:10"
    }
  ];

  // Fetch comprehensive dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [
        partnershipRes, 
        sponsorshipRes, 
        volunteerRes, 
        contactRes,
        projectRes,
        programRes,
        mediaRes,
        eventRes
      ] = await Promise.all([
        axios.get(`${API_URL}/partnership/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/sponsorship/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/volunteer/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/contact/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/project/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/program/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/media/get`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_URL}/featured-event/all`).catch(() => ({ data: { data: [] } }))
      ]);

      // Calculate statistics
      setStats({
        partnerships: partnershipRes.data.data?.length || 0,
        sponsorships: sponsorshipRes.data.data?.length || 0,
        volunteers: volunteerRes.data.data?.length || 0,
        contacts: contactRes.data.data?.length || 0,
        projects: projectRes.data.data?.length || 0,
        programs: programRes.data.data?.length || 0,
        media: mediaRes.data.data?.length || 0,
        events: eventRes.data.data?.length || 0,
        donations: Math.floor(Math.random() * 1000) + 500, // Simulated data
        beneficiaries: Math.floor(Math.random() * 5000) + 2000 // Simulated data
      });

      // Generate recent activities
      generateRecentActivities();
      generateMonthlyData();

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  // Generate recent activities
  const generateRecentActivities = () => {
    const activities = [
      { type: 'donation', message: 'New donation received', amount: '$250', time: '2 minutes ago', icon: '💰' },
      { type: 'volunteer', message: 'New volunteer registered', name: 'Ahmed Hassan', time: '15 minutes ago', icon: '🤝' },
      { type: 'project', message: 'Project milestone completed', project: 'Clean Water Initiative', time: '1 hour ago', icon: '🎯' },
      { type: 'contact', message: 'New inquiry received', subject: 'Partnership Opportunity', time: '2 hours ago', icon: '✉️' },
      { type: 'event', message: 'Event registration opened', event: 'Ramadan Food Drive', time: '3 hours ago', icon: '🌟' }
    ];
    setRecentActivities(activities);
  };

  // Generate monthly data for charts
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = months.map(month => ({
      month,
      donations: Math.floor(Math.random() * 50000) + 20000,
      volunteers: Math.floor(Math.random() * 100) + 50,
      projects: Math.floor(Math.random() * 10) + 5
    }));
    setMonthlyData(data);
  };

  // Change Islamic content periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicContent.length);
      setCurrentVerse(islamicContent[randomIndex]);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Enhanced Stat Card component
  const StatCard = ({ title, count, icon, color, trend, trendValue }) => (
    <div className={`stat-card ${color} fade-in`}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="stat-icon">
            <span>{icon}</span>
          </div>
          <div className="ms-3">
            <h3 className="stat-title">{title}</h3>
            <p className="stat-value">{count}</p>
            {trend && (
              <small className={`trend ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
                {trend === 'up' ? '↗️' : '↘️'} {trendValue}% this month
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Activity Card component
  const ActivityCard = ({ activity }) => (
    <div className="activity-item d-flex align-items-center p-3 border-bottom">
      <div className="activity-icon me-3">
        <span className="fs-4">{activity.icon}</span>
      </div>
      <div className="flex-grow-1">
        <p className="mb-1 fw-semibold">{activity.message}</p>
        {activity.amount && <span className="badge admin-badge-success">{activity.amount}</span>}
        {activity.name && <span className="text-muted">by {activity.name}</span>}
        {activity.project && <span className="text-muted">- {activity.project}</span>}
        {activity.subject && <span className="text-muted">- {activity.subject}</span>}
        {activity.event && <span className="text-muted">- {activity.event}</span>}
        <small className="d-block text-muted">{activity.time}</small>
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
      {/* Header with Islamic Content */}
      <div className="admin-header mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-6 fw-bold mb-2">Admin Dashboard</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-4">
            <div className="islamic-verse-card p-3 text-center">
              <div className="arabic-text mb-2" style={{fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-green)'}}>
                {currentVerse.arabic}
              </div>
              <div className="translation mb-1" style={{fontSize: '0.9rem', fontStyle: 'italic'}}>
                {currentVerse.translation}
              </div>
              <small className="reference text-muted">- {currentVerse.reference}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Statistics */}
      <div className="admin-card admin-card-body mb-4">
        <div className="admin-card-header">
          <h3>📊 Overview Statistics</h3>
        </div>
        <div className="admin-card-body">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard 
                title="Total Donations" 
                count={`$${stats.donations.toLocaleString()}`} 
                icon="💰" 
                color="bg-success-custom" 
                trend="up" 
                trendValue="12"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard 
                title="Beneficiaries" 
                count={stats.beneficiaries.toLocaleString()} 
                icon="❤️" 
                color="bg-primary-custom" 
                trend="up" 
                trendValue="8"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard 
                title="Active Volunteers" 
                count={stats.volunteers} 
                icon="🤝" 
                color="bg-warning-custom" 
                trend="up" 
                trendValue="15"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <StatCard 
                title="Ongoing Projects" 
                count={stats.projects} 
                icon="🎯" 
                color="bg-info-custom" 
                trend="up" 
                trendValue="5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Engagement Statistics */}
        <div className="col-lg-8">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>📈 Engagement & Outreach</h3>
            </div>
            <div className="admin-card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <StatCard 
                    title="Partnerships" 
                    count={stats.partnerships} 
                    icon="🤝" 
                    color="bg-primary-custom"
                  />
                </div>
                <div className="col-md-4">
                  <StatCard 
                    title="Sponsorships" 
                    count={stats.sponsorships} 
                    icon="🏢" 
                    color="bg-success-custom"
                  />
                </div>
                <div className="col-md-4">
                  <StatCard 
                    title="Events" 
                    count={stats.events} 
                    icon="🌟" 
                    color="bg-warning-custom"
                  />
                </div>
                <div className="col-md-4">
                  <StatCard 
                    title="Programs" 
                    count={stats.programs} 
                    icon="📚" 
                    color="bg-info-custom"
                  />
                </div>
                <div className="col-md-4">
                  <StatCard 
                    title="Media Items" 
                    count={stats.media} 
                    icon="📷" 
                    color="bg-primary-custom"
                  />
                </div>
                <div className="col-md-4">
                  <StatCard 
                    title="Messages" 
                    count={stats.contacts} 
                    icon="✉️" 
                    color="bg-success-custom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="col-lg-4">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>🔔 Recent Activities</h3>
            </div>
            <div className="admin-card-body p-0">
              <div className="activities-list" style={{maxHeight: '400px', overflowY: 'auto'}}>
                {recentActivities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="admin-card mt-4">
        <div className="admin-card-header">
          <h3>📊 Monthly Progress Overview</h3>
        </div>
        <div className="admin-card-body">
          <div className="row">
            {monthlyData.map((month, index) => (
              <div key={index} className="col-md-2 text-center">
                <div className="month-progress p-3 border rounded">
                  <h5 className="fw-bold text-primary">{month.month}</h5>
                  <div className="progress-item mb-2">
                    <small className="text-muted">Donations</small>
                    <div className="fw-bold text-success">${(month.donations / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="progress-item mb-2">
                    <small className="text-muted">Volunteers</small>
                    <div className="fw-bold text-info">{month.volunteers}</div>
                  </div>
                  <div className="progress-item">
                    <small className="text-muted">Projects</small>
                    <div className="fw-bold text-warning">{month.projects}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 mt-4">
        <button
          onClick={fetchDashboardStats}
          className="btn admin-btn-primary"
        >
          <span className="me-2">🔄</span> Refresh Data
        </button>
        <button className="btn admin-btn-secondary">
          <span className="me-2">📊</span> Generate Report
        </button>
        <button className="btn admin-btn-secondary">
          <span className="me-2">📧</span> Send Newsletter
        </button>
        <button className="btn admin-btn-secondary">
          <span className="me-2">🎯</span> Create Campaign
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
