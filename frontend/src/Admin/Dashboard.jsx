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

  const API_URL = `${import.meta.env.VITE_API_URL}`;

  // Islamic verses for community service and management
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
      arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
      translation: "The believing men and believing women are allies of one another.",
      reference: "Quran 9:71"
    },
    {
      arabic: "مَن كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ",
      translation: "Whoever fulfills the needs of his brother, Allah will fulfill his needs.",
      reference: "Hadith - Bukhari"
    }
  ];

  // Utility function for time ago formatting
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes
    if (diff < 60) return `${diff} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Try new dashboard API
      try {
        const dashboardResponse = await axios.get(`${API_URL}/dashboard/stats`);
        if (dashboardResponse.data.success) {
          const dashboardData = dashboardResponse.data.data;
          setStats(dashboardData);
          setRecentActivities(dashboardData.recentActivities || []);
          setMonthlyData(dashboardData.monthlyData || []);
          return;
        }
      } catch (dashboardError) {
        console.log('Dashboard API not available, falling back to individual endpoints');
      }

      // Fallback to individual endpoints
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
        donations: Math.floor(Math.random() * 100000) + 50000,
        beneficiaries: Math.floor(Math.random() * 10000) + 5000
      });

      // Generate mock data
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
    const recentVolunteers = [
      { firstName: 'John', lastName: 'Doe', createdAt: '2024-03-01T12:00:00.000Z' },
      { firstName: 'Jane', lastName: 'Doe', createdAt: '2024-03-02T12:00:00.000Z' },
    ];
    const recentContacts = [
      { subject: 'Partnership Opportunity', createdAt: '2024-03-03T12:00:00.000Z' },
      { subject: 'Volunteer Inquiry', createdAt: '2024-03-04T12:00:00.000Z' },
    ];
    const activities = [
      ...recentVolunteers.map(volunteer => ({
        type: 'volunteer',
        message: 'New volunteer registered',
        name: `${volunteer.firstName} ${volunteer.lastName}`,
        time: getTimeAgo(volunteer.createdAt),
        icon: '🤝'
      })),
      {
        type: 'project',
        message: 'Project milestone completed',
        project: 'Clean Water Initiative',
        time: '1 hour ago',
        icon: '🎯'
      },
      ...recentContacts.map(contact => ({
        type: 'contact',
        message: 'New inquiry received',
        subject: contact.subject,
        time: getTimeAgo(contact.createdAt),
        icon: '✉️'
      })),
      {
        type: 'event',
        message: 'Event registration opened',
        event: 'Community Food Drive',
        time: '3 hours ago',
        icon: '🌟'
      },
      {
        type: 'partnership',
        message: 'New partnership established',
        partner: 'Local Community Center',
        time: '5 hours ago',
        icon: '🤝'
      },
      {
        type: 'program',
        message: 'Educational program launched',
        program: 'Youth Development Initiative',
        time: '1 day ago',
        icon: '📚'
      }
    ].slice(0, 8);
    setRecentActivities(activities);
  };

  // Generate monthly data
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

  // Islamic verse rotation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * islamicContent.length);
      setCurrentVerse(islamicContent[randomIndex]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Stat Card component
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
      <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header with logo and Islamic branding */}
      <div className="admin-header mb-4 position-relative">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div className="d-flex align-items-center mb-3">
              <div className="dashboard-logo-container me-3" style={{position: 'relative', width: 64, height: 64}}>
                <img 
                  src="/charity-foundation-logo.png" 
                  alt="SKF Logo" 
                  style={{width: 60, height: 60, borderRadius: 14, boxShadow: '0 4px 15px rgba(0,0,0,0.12)', background: 'white', border: '2px solid #28a745'}}
                />
                <span className="islamic-decoration position-absolute" style={{bottom: 0, right: 0, fontSize: '1.2rem', opacity: 0.5}}>🕌</span>
              </div>
              <div>
                <h1 className="display-6 fw-bold mb-1" style={{background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Amiri', serif"}}>
                  لوحة التحكم الإدارية
                </h1>
                <h2 className="h4 text-muted mb-0" style={{fontWeight: 700}}>Admin Dashboard</h2>
                <span className="islamic-decoration" style={{fontSize: '1.2rem', marginLeft: '0.5rem'}}>☪️</span>
              </div>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">🏠 الرئيسية Home</li>
                <li className="breadcrumb-item active">🗂️ Dashboard</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-5">
            <div className="islamic-verse-card p-4 text-center fade-in" style={{
              background: 'var(--gradient-light)', 
              borderRadius: '16px', 
              border: '2px solid var(--primary-green)',
              boxShadow: 'var(--shadow-medium)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                fontSize: '1.7rem',
                opacity: '0.3'
              }}>
                🌙
              </div>
              <div className="arabic-text mb-3" style={{
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-green)',
                lineHeight: '1.8',
                fontFamily: "'Amiri', 'Times New Roman', serif"
              }}>
                {currentVerse.arabic}
              </div>
              <div className="translation mb-2" style={{
                fontSize: '0.95rem', 
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                fontWeight: '500'
              }}>
                "{currentVerse.translation}"
              </div>
              <small className="reference" style={{
                color: 'var(--primary-blue)',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}>
                — {currentVerse.reference}
              </small>
              <div className="islamic-decoration" style={{position: 'absolute', bottom: 8, left: 18, fontSize: '1.2rem', opacity: 0.4}}>🤲</div>
            </div>
          </div>
        </div>
        <div className="islamic-decoration position-absolute" style={{top: 0, right: 25, fontSize: '1.3rem', opacity: 0.2}}>📿</div>
      </div>
      {/* Statistics Section */}
      <div className="admin-card mb-4" style={{background: 'var(--gradient-card)', border: '2px solid var(--primary-green)', borderRadius: '20px'}}>
        <div className="admin-card-header" style={{background: 'var(--gradient-primary)', color: 'white', borderRadius: '18px 18px 0 0'}}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="me-3" style={{fontSize: '1.5rem'}}>📊</span>
              <div>
                <h3 className="mb-0" style={{color: 'white'}}>Overview Statistics</h3>
                <small style={{opacity: '0.9'}}>Real-time charity impact metrics</small>
              </div>
            </div>
            <div className="islamic-decoration" style={{fontSize: '2rem', opacity: '0.3'}}>☪️</div>
          </div>
        </div>
        <div className="admin-card-body p-4">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <StatCard 
                title="Beneficiaries" 
                count={stats.beneficiaries.toLocaleString()} 
                icon="❤️" 
                color="bg-primary-custom" 
                trend="up" 
                trendValue="8"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <StatCard 
                title="Active Volunteers" 
                count={stats.volunteers} 
                icon="🤝" 
                color="bg-success-custom" 
                trend="up" 
                trendValue="15"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
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
        {/* Engagement Statistics with Islamic Enhancement */}
        <div className="col-lg-8">
          <div className="admin-card" style={{background: 'var(--gradient-card)', border: '2px solid var(--primary-blue)', borderRadius: '20px'}}>
            <div className="admin-card-header" style={{background: 'var(--gradient-secondary)', color: 'white', borderRadius: '18px 18px 0 0'}}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3" style={{fontSize: '1.5rem'}}>📈</span>
                  <div>
                    <h3 className="mb-0" style={{color: 'white'}}>Engagement & Outreach</h3>
                    <small style={{opacity: '0.9'}}>Community connection metrics</small>
                  </div>
                </div>
                <div className="islamic-decoration" style={{fontSize: '1.8rem', opacity: '0.3'}}>🤲</div>
              </div>
            </div>
            <div className="admin-card-body p-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <StatCard 
                    title="Partnerships" 
                    count={stats.partnerships} 
                    icon="🤝" 
                    color="bg-success-custom" 
                    trend="up" 
                    trendValue="3"
                  />
                </div>
                <div className="col-md-6">
                  <StatCard 
                    title="Events" 
                    count={stats.events} 
                    icon="🎉" 
                    color="bg-warning-custom" 
                    trend="up" 
                    trendValue="2"
                  />
                </div>
              </div>
              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <StatCard 
                    title="Programs" 
                    count={stats.programs} 
                    icon="📚" 
                    color="bg-info-custom" 
                    trend="up" 
                    trendValue="4"
                  />
                </div>
                <div className="col-md-6">
                  <StatCard 
                    title="Messages" 
                    count={stats.contacts} 
                    icon="✉️" 
                    color="bg-primary-custom" 
                    trend="up" 
                    trendValue="6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Activities with Islamic Enhancement */}
        <div className="col-lg-4">
          <div className="admin-card" style={{background: 'var(--gradient-card)', border: '2px solid var(--primary-green)', borderRadius: '20px'}}>
            <div className="admin-card-header" style={{background: 'var(--gradient-primary)', color: 'white', borderRadius: '18px 18px 0 0'}}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-3" style={{fontSize: '1.5rem'}}>🔔</span>
                  <div>
                    <h3 className="mb-0" style={{color: 'white'}}>Recent Activities</h3>
                    <small style={{opacity: '0.9'}}>Live charity updates</small>
                  </div>
                </div>
                <div className="islamic-decoration" style={{fontSize: '1.5rem', opacity: '0.3'}}>📿</div>
              </div>
            </div>
            <div className="admin-card-body p-0">
              <div className="activities-list" style={{maxHeight: '400px', overflowY: 'auto'}}>
                {recentActivities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
              {/* Islamic Motivation at Bottom */}
              <div className="p-3 mt-2" style={{
                background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.05), rgba(0, 123, 255, 0.05))',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div className="text-center">
                  <div className="arabic-text mb-1" style={{
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-green)',
                    fontFamily: "'Amiri', serif"
                  }}>
                    وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ
                  </div>
                  <small className="text-muted fst-italic">
                    "Whatever good you put forward for yourselves, you will find it with Allah"
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
