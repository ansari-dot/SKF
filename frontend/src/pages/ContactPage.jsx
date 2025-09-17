import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/contact/add`, contactForm);
      toast.success('Message sent successfully! We will get back to you soon.');
      
      // Reset form
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-5">


      {/* Contact Information */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <motion.div
              className="col-lg-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="fw-bold mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required 
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      required 
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subject *</label>
                    <select 
                      className="form-select" 
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="volunteer">Volunteer Information</option>
                      <option value="support">Support Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="request">Request for Support</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message *</label>
                    <textarea 
                      className="form-control" 
                      rows="6" 
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={submitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              className="col-lg-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4">Contact Information</h3>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Main Office
                    </h6>
                    <p className="text-muted mb-0">
                      Shehryar Khan Foundation<br />
                      Islamabad F-11 Sector, Pakistan
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-phone me-2"></i>
                      Phone Number
                    </h6>
                    <p className="text-muted mb-0">
                      +1 (571) 299-7157
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-envelope me-2"></i>
                      Email Address
                    </h6>
                    <p className="text-muted mb-0">
                      shehryarkhanfoundation@gmail.com
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-map-marked-alt me-2"></i>
                      Our Location
                    </h6>
                    <div className="map-responsive">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.866167664654!2d73.0298493152093!3d33.6844209807098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf92d999e9f7%3A0x2a1192801e03c1a!2sF-11%20Markaz%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fab fa-instagram me-2"></i>
                      Instagram
                    </h6>
                    <p className="text-muted mb-0">
                      <a href="https://www.instagram.com/shehryarkhanfoundation?igsh=MXYwbGl3ajN5ejNseQ==" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        @shehryarkhanfoundation
                      </a>
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fab fa-facebook me-2"></i>
                      Facebook
                    </h6>
                    <p className="text-muted mb-0">
                      <a href="https://www.facebook.com/share/1CNRUnGEdi/" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        Shehryar Khan Foundation
                      </a>
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-clock me-2"></i>
                      Office Hours
                    </h6>
                    <p className="text-muted mb-1">
                      <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Saturday:</strong> 9:00 AM - 2:00 PM
                    </p>
                    <p className="text-muted mb-0">
                      <strong>Sunday:</strong> Closed
                    </p>
                  </div>

                 {/* <div>
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="fas fa-share-alt me-2"></i>
                      Follow Us
                    </h6>
                    <div className="d-flex gap-2">
  <motion.a
    href="#"
    className="btn btn-outline-primary"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className="fab fa-facebook-f"></i>
  </motion.a>

  <motion.a
    href="#"
    className="btn btn-outline-primary"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className="fab fa-twitter"></i>
  </motion.a>

  <motion.a
    href="#"
    className="btn btn-outline-primary"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className="fab fa-instagram"></i>
  </motion.a>

  <motion.a
    href="#"
    className="btn btn-outline-primary"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <i className="fab fa-linkedin-in"></i>
  </motion.a>
</div>

                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section  
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Find Us</h2>
            <p className="lead text-muted">Visit our main office or any of our regional centers</p>
          </motion.div>

          <div className="row g-4">
            {[
              {
                title: "Main Office",
                address: "123 Charity Street, Islamabad",
                phone: "+92-51-1234567",
                email: "info@skf.org.pk",
                hours: "Mon-Fri: 9AM-6PM",
                image: "/charity-foundation-logo.png"
              },
              {
                title: "Karachi Center",
                address: "456 Relief Avenue, Karachi",
                phone: "+92-21-1234567",
                email: "karachi@skf.org.pk",
                hours: "Mon-Fri: 9AM-6PM",
                image: "/charity-volunteers-helping.png"
              },
              {
                title: "Lahore Center",
                address: "789 Hope Road, Lahore",
                phone: "+92-42-1234567",
                email: "lahore@skf.org.pk",
                hours: "Mon-Fri: 9AM-6PM",
                image: "/happy-children.png"
              }
            ].map((center, index) => (
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
                    src={center.image}
                    className="card-img-top"
                    alt={center.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{center.title}</h5>
                    <p className="text-muted mb-2">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {center.address}
                    </p>
                    <p className="text-muted mb-2">
                      <i className="fas fa-phone me-1"></i>
                      {center.phone}
                    </p>
                    <p className="text-muted mb-2">
                      <i className="fas fa-envelope me-1"></i>
                      {center.email}
                    </p>
                    <p className="text-muted mb-3">
                      <i className="fas fa-clock me-1"></i>
                      {center.hours}
                    </p>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* Interactive Map 
      <section className="py-5">
        <div className="container">
          <motion.div
            className="card border-0 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-lg-8">
                  <div 
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ height: '400px' }}
                  >
                    <div className="text-center">
                      <i className="fas fa-map fa-4x text-muted mb-3"></i>
                      <h5 className="text-muted">Interactive Map</h5>
                      <p className="text-muted">Map integration would be implemented here</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="p-4">
                    <h4 className="fw-bold mb-4">Our Locations</h4>
                    <div className="mb-3">
                      <h6 className="fw-bold text-primary">Main Office</h6>
                      <p className="text-muted small mb-2">123 Charity Street, Islamabad</p>
                      <button className="btn btn-sm btn-outline-primary">View on Map</button>
                    </div>
                    <div className="mb-3">
                      <h6 className="fw-bold text-primary">Karachi Center</h6>
                      <p className="text-muted small mb-2">456 Relief Avenue, Karachi</p>
                      <button className="btn btn-sm btn-outline-primary">View on Map</button>
                    </div>
                    <div className="mb-3">
                      <h6 className="fw-bold text-primary">Lahore Center</h6>
                      <p className="text-muted small mb-2">789 Hope Road, Lahore</p>
                      <button className="btn btn-sm btn-outline-primary">View on Map</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
*/}
      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="lead text-muted">Find answers to common questions about our organization</p>
          </motion.div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {[
                  {
                    question: "How can I volunteer with SKF?",
                    answer: "You can volunteer by filling out our volunteer registration form on the Get Involved page, or by contacting us directly. We have various opportunities available for different skill sets and time commitments."
                  },
                  {
                    question: "How can I get support?",
                    answer: "You can request support through our website, by calling our support hotline, or by visiting any of our centers. We provide various forms of assistance and community support programs."
                  },
                  {
                    question: "What areas do you serve?",
                    answer: "We serve communities across Pakistan, with main centers in Islamabad, Karachi, and Lahore. We also respond to emergency situations nationwide and have partnerships with international organizations."
                  },
                  {
                    question: "How can I report an emergency or request assistance?",
                    answer: "For emergencies, please call our emergency hotline at +92-51-1234568. For general assistance requests, you can contact us through our contact form or call our main office."
                  },
                  {
                    question: "Do you provide financial assistance to individuals?",
                    answer: "We primarily focus on community development and emergency relief programs. For individual financial assistance, we work through our partner organizations and have specific criteria for eligibility."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="accordion-item border-0 shadow-sm mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`faq-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
