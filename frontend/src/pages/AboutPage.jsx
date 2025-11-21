import React from 'react';
import { motion } from 'framer-motion';
import '../styles/BrandIcons.css';

const AboutPage = () => {
  return (
    <div className="pt-5" style={{ marginTop: 'calc(-1 * var(--header-height) - 35px)' }}>


      {/* Mission & Vision */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>Our Mission & Vision</h2>
            <p className="lead text-muted">Guiding principles that drive our commitment to change</p>
          </motion.div>
          
          <div className="row g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="card h-100 border-0 modern-mission-card"
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
              >
                <div className="card-body p-5">
                  <motion.div 
                    className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '90px',
                      height: '90px',
                      background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.15), rgba(74, 144, 226, 0.15))',
                      border: '3px solid var(--brand-primary)'
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-bullseye fa-3x" style={{ color: 'var(--brand-primary)' }}></i>
                  </motion.div>
                  <h3 className="fw-bold mb-4" style={{ color: '#2C3E50' }}>Our Mission</h3>
                  <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
                    To provide comprehensive support to underprivileged communities through trauma relief, 
                    disaster support, domestic violence recovery, Islamic education, and compassion-based development.
                  </p>
                  <p className="text-muted" style={{ lineHeight: '1.7' }}>
                    We believe in creating sustainable change by addressing the root causes of poverty and 
                    inequality while promoting Islamic values of compassion, justice, and community service.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="card h-100 border-0 modern-vision-card"
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
              >
                <div className="card-body p-5">
                  <motion.div 
                    className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '90px',
                      height: '90px',
                      background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(127, 176, 105, 0.15))',
                      border: '3px solid var(--brand-accent)'
                    }}
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className="fas fa-eye fa-3x" style={{ color: 'var(--brand-accent)' }}></i>
                  </motion.div>
                  <h3 className="fw-bold mb-4" style={{ color: '#2C3E50' }}>Our Vision</h3>
                  <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
                    To create a world where every individual has access to education, healthcare, 
                    and opportunities for personal and community development.
                  </p>
                  <p className="text-muted" style={{ lineHeight: '1.7' }}>
                    We envision communities that are resilient, self-sufficient, and guided by 
                    Islamic principles of compassion, justice, and mutual support.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5" style={{ background: '#ffffff' }}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#2C3E50' }}>Our Core Values</h2>
            <p className="text-muted">The principles that guide our work and define our impact</p>
          </motion.div>

          <div className="row g-4">
            {[
              {
                icon: "fas fa-heart",
                title: "Compassion",
                description: "We serve with empathy and understanding, treating every individual with dignity and respect.",
                color: "var(--brand-primary)"
              },
              {
                icon: "fas fa-balance-scale",
                title: "Justice",
                description: "We work to address inequalities and ensure fair access to opportunities for all.",
                color: "var(--brand-accent)"
              },
              {
                icon: "fas fa-hands-helping",
                title: "Service",
                description: "We are committed to serving our communities with dedication and selflessness.",
                color: "var(--brand-primary)"
              },
              {
                icon: "fas fa-lightbulb",
                title: "Innovation",
                description: "We continuously seek creative solutions to address complex social challenges.",
                color: "var(--brand-accent)"
              },
              {
                icon: "fas fa-users",
                title: "Community",
                description: "We believe in the power of collective action and community-driven development.",
                color: "var(--brand-primary)"
              },
              {
                icon: "fas fa-star",
                title: "Excellence",
                description: "We strive for the highest standards in all our programs and services.",
                color: "var(--brand-accent)"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="card h-100 border-0 text-center modern-values-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    background: '#ffffff',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <div className="card-body p-4">
                    <motion.div 
                      className="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '70px',
                        height: '70px',
                        background: `linear-gradient(135deg, ${value.color}15, ${value.color}05)`,
                        border: `2px solid ${value.color}`
                      }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${value.icon} fa-2x`} style={{ color: value.color }}></i>
                    </motion.div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>{value.title}</h5>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>{value.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/placeholder-user.jpg"
                alt="Founder"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </motion.div>

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="display-6 fw-bold mb-4">Founder's Message</h2>
              <blockquote className="blockquote">
                <p className="lead text-muted mb-4">
                 "The Shehryar Khan Foundation was born from a deep commitment to serve humanity and make 
                 a meaningful difference in the lives of those who need it most. Our work is guided by Islamic
                  principles of compassion, justice, and community service."

                </p>
                <p className="text-muted mb-4">
                 
"We believe that every individual deserves access to education, 
healthcare, and opportunities for personal growth. Through our 
programs, we strive to create sustainable change that benefits not
 just individuals,
 but entire communities.
                </p>
                <motion.footer 
                  className="p-4 rounded-3 mt-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(74, 144, 226, 0.1))',
                    border: '1px solid rgba(127, 176, 105, 0.2)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div className="rounded-circle overflow-hidden" style={{ width: '60px', height: '60px', border: '2px solid rgba(127, 176, 105, 0.3)' }}>
                          <img 
                            src="/placeholder-user.jpg" 
                            alt="Founder" 
                            className="img-fluid"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                      <div>
                        <motion.div
                          className="fw-bold mb-1"
                          style={{
                            fontSize: '1.4rem',
                            background: 'linear-gradient(135deg, #7FB069, #4A90E2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline-block'
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.5, delay: 0.2 }
                          }}
                          viewport={{ once: true }}
                        >
                          Shehryar Khan
                        </motion.div>
                        <motion.div
                          className="text-uppercase fw-medium tracking-wider"
                          style={{
                            fontSize: '1rem',
                            letterSpacing: '1px',
                            color: '#4A90E2'
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.5, delay: 0.4 }
                          }}
                          viewport={{ once: true }}
                        >
                          Founder & Executive Director
                        </motion.div>
                      </div>
                    </div>
                    
                   
                  </motion.div>
                </motion.footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
