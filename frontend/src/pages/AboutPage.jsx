import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="pt-5">


      {/* Mission & Vision */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="text-primary mb-4">
                    <i className="fas fa-bullseye fa-3x"></i>
                  </div>
                  <h3 className="fw-bold mb-4">Our Mission</h3>
                  <p className="lead text-muted">
                    To provide comprehensive support to underprivileged communities through trauma relief, 
                    disaster support, domestic violence recovery, Islamic education, and compassion-based development.
                  </p>
                  <p className="text-muted">
                    We believe in creating sustainable change by addressing the root causes of poverty and 
                    inequality while promoting Islamic values of compassion, justice, and community service.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="text-success mb-4">
                    <i className="fas fa-eye fa-3x"></i>
                  </div>
                  <h3 className="fw-bold mb-4">Our Vision</h3>
                  <p className="lead text-muted">
                    To create a world where every individual has access to education, healthcare, 
                    and opportunities for personal and community development.
                  </p>
                  <p className="text-muted">
                    We envision communities that are resilient, self-sufficient, and guided by 
                    Islamic principles of compassion, justice, and mutual support.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Our Core Values</h2>
            <p className="lead text-muted">The principles that guide our work and define our impact</p>
          </motion.div>

          <div className="row g-4">
            {[
              {
                icon: "fas fa-heart",
                title: "Compassion",
                description: "We serve with empathy and understanding, treating every individual with dignity and respect."
              },
              {
                icon: "fas fa-balance-scale",
                title: "Justice",
                description: "We work to address inequalities and ensure fair access to opportunities for all."
              },
              {
                icon: "fas fa-hands-helping",
                title: "Service",
                description: "We are committed to serving our communities with dedication and selflessness."
              },
              {
                icon: "fas fa-lightbulb",
                title: "Innovation",
                description: "We continuously seek creative solutions to address complex social challenges."
              },
              {
                icon: "fas fa-users",
                title: "Community",
                description: "We believe in the power of collective action and community-driven development."
              },
              {
                icon: "fas fa-star",
                title: "Excellence",
                description: "We strive for the highest standards in all our programs and services."
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
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className="text-primary mb-3">
                      <i className={`${value.icon} fa-2x`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{value.title}</h5>
                    <p className="text-muted">{value.description}</p>
                  </div>
                </div>
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
                  "The Shehryar Khan Foundation was born from a deep commitment to serve humanity 
                  and make a meaningful difference in the lives of those who need it most. Our work 
                  is guided by Islamic principles of compassion, justice, and community service."
                </p>
                <p className="text-muted mb-4">
                  "We believe that every individual deserves access to education, healthcare, and 
                  opportunities for personal growth. Through our programs, we strive to create 
                  sustainable change that benefits not just individuals, but entire communities."
                </p>
                <footer className="blockquote-footer bg-success bg-opacity-25 p-3 rounded">
                  <strong>Shehryar Khan</strong>
                  <br />
                  <small className="text-muted">Founder & Executive Director</small>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
