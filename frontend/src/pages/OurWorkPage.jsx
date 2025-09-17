
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const OurWorkPage = () => {
  const [programs, setPrograms] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch programs and projects
  const fetchData = async () => {
    try {
      setLoading(true);
      const [programsResponse, projectsResponse] = await Promise.all([
        axios.get(`${API_URL}/program/get`),
        axios.get(`${API_URL}/project/get`)
      ]);
      
      setPrograms(programsResponse.data.programs || []);
      setProjects(projectsResponse.data.projects || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load content');
      setPrograms([]);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-5">


      {/* Main Programs */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Our Core Programs</h2>
            <p className="lead text-muted">Comprehensive initiatives addressing critical community needs</p>
          </motion.div>

          <div className="row g-5">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading programs...</p>
              </div>
            ) : programs.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="fas fa-tasks fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No programs available</h4>
                <p className="text-muted">Check back later for updates.</p>
              </div>
            ) : (
              programs.map((program, index) => (
              <motion.div
                key={index}
                className="col-lg-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow-lg">
                  <div className="card-body p-5">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <img
                          src={program.image ? (program.image.startsWith('/uploads/') ? `${API_URL.replace('/api', '')}${program.image}` : program.image) : '/placeholder-logo.png'}
                            alt={program.name}
                          className="img-fluid rounded mb-3"
                          style={{ height: '200px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/placeholder-logo.png';
                            }}
                        />
                          <div className="text-primary text-center mb-3">
                            <i className="fas fa-tasks fa-3x"></i>
                        </div>
                      </div>
                      <div className="col-md-8">
                          <h3 className="fw-bold mb-3">{program.name}</h3>
                        <p className="text-muted mb-4">{program.description}</p>
                        
                        <h6 className="fw-bold mb-3">Key Features:</h6>
                        <ul className="list-unstyled mb-4">
                            {program.keyFeatures &&
                              program.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="mb-2">
                               <i className="fas fa-check text-primary me-2"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="row text-center">
                            <div className="col-4">
                              <div className="fw-bold text-primary">{program.impact.beneficiaries}+</div>
                              <small className="text-muted">Beneficiaries</small>
                            </div>
                            <div className="col-4">
                              <div className="fw-bold text-primary">{program.impact.locations}+</div>
                              <small className="text-muted">Locations</small>
                            </div>
                            <div className="col-4">
                              <div className="fw-bold text-primary">{program.impact.responseTime}</div>
                              <small className="text-muted">Response Time</small>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Our Impact</h2>
            <p className="lead text-muted">Numbers that tell the story of our commitment to community transformation</p>
          </motion.div>

          <div className="row g-4">
            {[
              { number: "80,000+", label: "Lives Impacted", icon: "fas fa-users" },
              { number: "50+", label: "Communities Served", icon: "fas fa-map-marker-alt" },
              { number: "200+", label: "Active Volunteers", icon: "fas fa-hands-helping" },
              { number: "15+", label: "Years of Service", icon: "fas fa-calendar-alt" },
              { number: "95%", label: "Success Rate", icon: "fas fa-chart-line" },
              { number: "25+", label: "Programs Active", icon: "fas fa-tasks" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="text-primary mb-3">
                      <i className={`${stat.icon} fa-3x`}></i>
                    </div>
                    <h3 className="fw-bold text-primary mb-2">{stat.number}</h3>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Recent Projects</h2>
            <p className="lead text-muted">Latest initiatives making a difference in communities</p>
          </motion.div>

          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="fas fa-project-diagram fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No projects available</h4>
                <p className="text-muted">Check back later for updates.</p>
              </div>
            ) : (
              projects.map((project, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={project.image ? (project.image.startsWith('/uploads/') ? `${API_URL.replace('/api', '')}${project.image}` : project.image) : '/placeholder-logo.png'}
                    className="card-img-top"
                    alt={project.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/placeholder-logo.png';
                    }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span
                          className={`badge bg-${
                            project.status === 'Completed'
                              ? 'success'
                              : project.status === 'Ongoing'
                              ? 'warning'
                              : 'secondary'
                          }`}
                        >
                        {project.status}
                      </span>
                        <small className="text-muted">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </small>
                    </div>
                    <h5 className="card-title fw-bold">{project.title}</h5>
                    <p className="text-muted mb-2">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {project.location}
                    </p>
                    <p className="card-text text-muted">{project.description}</p>
                    <div className="mt-3">
                        <strong className="text-primary">
                          {project.impact.familiesAssisted} families assisted
                          {project.impact.otherImpact && ` - ${project.impact.otherImpact}`}
                        </strong>
                    </div>
                    <motion.button
                      className="btn btn-outline-primary mt-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkPage;
