import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const GetInvolvedPage = () => {
  const [activeTab, setActiveTab] = useState('volunteer');
  
  // Form states
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areasOfInterest: [],
    availability: '',
    timeCommitment: '',
    whyJoin: ''
  });

  const [sponsorForm, setSponsorForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    programsOfInterest: [],
    sponsorshipLevel: '',
    duration: '',
    additionalInfo: ''
  });

  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    organizationType: '',
    contactPerson: '',
    position: '',
    email: '',
    phone: '',
    partnershipTypes: [],
    description: ''
  });

  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch opportunities
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/opportunities`);
        setOpportunities(response.data.opportunities || response.data || []);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        toast.error('Failed to load opportunities. Please try again.');
        setOpportunities([]);
      } finally {
        setLoadingOpportunities(false);
      }
    };

    fetchOpportunities();
  }, [API_URL]);

  // Handle checkbox changes for arrays
  const handleCheckboxChange = (formType, field, value, checked) => {
    if (formType === 'volunteer') {
      setVolunteerForm(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value)
      }));
    } else if (formType === 'sponsor') {
      setSponsorForm(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value)
      }));
    } else if (formType === 'partner') {
      setPartnerForm(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value)
      }));
    }
  };

  // Handle form submissions
  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/volunteer/add`, volunteerForm);
      toast.success('Volunteer application submitted successfully!');
      setVolunteerForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        areasOfInterest: [],
        availability: '',
        timeCommitment: '',
        whyJoin: ''
      });
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      toast.error('Failed to submit volunteer application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/sponsorship/add`, sponsorForm);
      toast.success('Sponsorship interest submitted successfully!');
      setSponsorForm({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        programsOfInterest: [],
        sponsorshipLevel: '',
        duration: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting sponsor form:', error);
      toast.error('Failed to submit sponsorship interest. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/partnership/add`, partnerForm);
      toast.success('Partnership inquiry submitted successfully!');
      setPartnerForm({
        organizationName: '',
        organizationType: '',
        contactPerson: '',
        position: '',
        email: '',
        phone: '',
        partnershipTypes: [],
        description: ''
      });
    } catch (error) {
      console.error('Error submitting partner form:', error);
      toast.error('Failed to submit partnership inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-5">


      {/* Ways to Get Involved */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Ways to Get Involved</h2>
            <p className="lead text-muted">Choose how you'd like to make a difference</p>
          </motion.div>

          <div className="row g-4 mb-5">
            {[
              {
                title: "Volunteer",
                icon: "fas fa-hands-helping",
                 color: "primary",
                description: "Join our team of dedicated volunteers and contribute your time and skills to our programs.",
                benefits: [
                  "Make a direct impact in communities",
                  "Gain valuable experience",
                  "Meet like-minded individuals",
                  "Flexible time commitments"
                ]
              },
              {
                title: "Sponsor",
                icon: "fas fa-heart",
                 color: "primary",
                description: "Support our programs through financial sponsorship and help us reach more communities.",
                benefits: [
                  "Transparent impact reporting",
                  "Regular updates on projects",
                  "Tax-deductible contributions",
                  "Recognition opportunities"
                ]
              },
              {
                title: "Partner",
                icon: "fas fa-handshake",
                 color: "primary",
                description: "Partner with us to create sustainable change through collaborative initiatives.",
                benefits: [
                  "Strategic collaboration opportunities",
                  "Shared expertise and resources",
                  "Long-term impact creation",
                  "Network expansion"
                ]
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <div className={`text-${option.color} mb-3`}>
                      <i className={`${option.icon} fa-3x`}></i>
                    </div>
                    <h4 className="fw-bold mb-3">{option.title}</h4>
                    <p className="text-muted mb-4">{option.description}</p>
                    <h6 className="fw-bold mb-3">Benefits:</h6>
                    <ul className="list-unstyled">
                      {option.benefits.map((benefit, idx) => (
                        <li key={idx} className="mb-2">
                           <i className="fas fa-check text-primary me-2"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Forms Section */}
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-light">
                  <ul className="nav nav-tabs card-header-tabs" id="involvementTabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'volunteer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('volunteer')}
                      >
                        <i className="fas fa-hands-helping me-2"></i>
                        Volunteer Registration
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'sponsor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sponsor')}
                      >
                        <i className="fas fa-heart me-2"></i>
                        Sponsorship Interest
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'partner' ? 'active' : ''}`}
                        onClick={() => setActiveTab('partner')}
                      >
                        <i className="fas fa-handshake me-2"></i>
                        Partnership Inquiry
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-5">
                  {activeTab === 'volunteer' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="fw-bold mb-4">Volunteer Registration</h3>
                      <form onSubmit={handleVolunteerSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">First Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              value={volunteerForm.firstName}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Last Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              value={volunteerForm.lastName}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email *</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              required 
                              value={volunteerForm.email}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input 
                              type="tel" 
                              className="form-control" 
                              value={volunteerForm.phone}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Areas of Interest *</label>
                            <div className="row g-2">
                              {[
                                'Disaster Relief', 'Education', 'Healthcare', 'Trauma Support',
                                'Islamic Education', 'Community Development', 'Administrative Support'
                              ].map((area, index) => (
                                <div key={index} className="col-md-4">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      id={`area-${index}`}
                                      checked={volunteerForm.areasOfInterest.includes(area)}
                                      onChange={(e) => handleCheckboxChange('volunteer', 'areasOfInterest', area, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={`area-${index}`}>
                                      {area}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Availability *</label>
                            <select 
                              className="form-select" 
                              required
                              value={volunteerForm.availability}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, availability: e.target.value }))}
                            >
                              <option value="">Select availability</option>
                              <option value="weekdays">Weekdays</option>
                              <option value="weekends">Weekends</option>
                              <option value="evenings">Evenings</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Time Commitment</label>
                            <select 
                              className="form-select"
                              value={volunteerForm.timeCommitment}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, timeCommitment: e.target.value }))}
                            >
                              <option value="">Select commitment</option>
                              <option value="1-5">1-5 hours/week</option>
                              <option value="5-10">5-10 hours/week</option>
                              <option value="10-20">10-20 hours/week</option>
                              <option value="20+">20+ hours/week</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Why do you want to volunteer with SKF? *</label>
                            <textarea 
                              className="form-control" 
                              rows="4" 
                              required
                              value={volunteerForm.whyJoin}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, whyJoin: e.target.value }))}
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
                              {submitting ? 'Submitting...' : 'Submit Volunteer Application'}
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === 'sponsor' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="fw-bold mb-4">Sponsorship Interest</h3>
                      <form onSubmit={handleSponsorSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Organization/Individual Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              value={sponsorForm.organizationName}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, organizationName: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Contact Person</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={sponsorForm.contactPerson}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email *</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              required 
                              value={sponsorForm.email}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input 
                              type="tel" 
                              className="form-control" 
                              value={sponsorForm.phone}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Programs of Interest *</label>
                            <div className="row g-2">
                              {[
                                'Disaster Relief', 'Education & Empowerment', 'Trauma Support',
                                'Islamic Education', 'Healthcare', 'Community Development'
                              ].map((program, index) => (
                                <div key={index} className="col-md-4">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      id={`program-${index}`}
                                      checked={sponsorForm.programsOfInterest.includes(program)}
                                      onChange={(e) => handleCheckboxChange('sponsor', 'programsOfInterest', program, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={`program-${index}`}>
                                      {program}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Sponsorship Level</label>
                            <select 
                              className="form-select"
                              value={sponsorForm.sponsorshipLevel}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, sponsorshipLevel: e.target.value }))}
                            >
                              <option value="">Select level</option>
                              <option value="bronze">Bronze ($1,000 - $5,000)</option>
                              <option value="silver">Silver ($5,000 - $10,000)</option>
                              <option value="gold">Gold ($10,000 - $25,000)</option>
                              <option value="platinum">Platinum ($25,000+)</option>
                              <option value="custom">Custom Amount</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Duration</label>
                            <select 
                              className="form-select"
                              value={sponsorForm.duration}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, duration: e.target.value }))}
                            >
                              <option value="">Select duration</option>
                              <option value="one-time">One-time</option>
                              <option value="monthly">Monthly</option>
                              <option value="quarterly">Quarterly</option>
                              <option value="annual">Annual</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Additional Information</label>
                            <textarea 
                              className="form-control" 
                              rows="4"
                              value={sponsorForm.additionalInfo}
                              onChange={(e) => setSponsorForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
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
                              {submitting ? 'Submitting...' : 'Submit Sponsorship Interest'}
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === 'partner' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="fw-bold mb-4">Partnership Inquiry</h3>
                      <form onSubmit={handlePartnerSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Organization Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              value={partnerForm.organizationName}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, organizationName: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Organization Type</label>
                            <select 
                              className="form-select"
                              value={partnerForm.organizationType}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, organizationType: e.target.value }))}
                            >
                              <option value="">Select type</option>
                              <option value="ngo">NGO</option>
                              <option value="government">Government Agency</option>
                              <option value="corporate">Corporate</option>
                              <option value="educational">Educational Institution</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Contact Person *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              value={partnerForm.contactPerson}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Position</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={partnerForm.position}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, position: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email *</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              required 
                              value={partnerForm.email}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input 
                              type="tel" 
                              className="form-control" 
                              value={partnerForm.phone}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, phone: e.target.value }))}
                            />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Partnership Type *</label>
                            <div className="row g-2">
                              {[
                                'Program Collaboration', 'Resource Sharing', 'Joint Fundraising',
                                'Capacity Building', 'Advocacy', 'Research & Development'
                              ].map((type, index) => (
                                <div key={index} className="col-md-4">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      id={`type-${index}`}
                                      checked={partnerForm.partnershipTypes.includes(type)}
                                      onChange={(e) => handleCheckboxChange('partner', 'partnershipTypes', type, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={`type-${index}`}>
                                      {type}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Proposed Partnership Description *</label>
                            <textarea 
                              className="form-control" 
                              rows="4" 
                              required
                              value={partnerForm.description}
                              onChange={(e) => setPartnerForm(prev => ({ ...prev, description: e.target.value }))}
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
                              {submitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
                            </motion.button>
                          </div>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-5 fw-bold mb-3">Current Opportunities</h2>
            <p className="lead text-muted">Immediate needs and upcoming projects</p>
          </motion.div>

          <div className="row g-4">
            {loadingOpportunities ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading opportunities...</p>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No opportunities available</h4>
                <p className="text-muted">Check back later for updates.</p>
              </div>
            ) : (
              opportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity._id || index}
                  className="col-lg-4 col-md-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="card h-100 border-0 shadow-sm">

                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className={`badge bg-${opportunity.status === 'Active' ? 'success' : opportunity.status === 'Urgent' ? 'danger' : 'primary'}`}>
                          {opportunity.type}
                        </span>
                        <small className="text-muted">{opportunity.duration}</small>
                      </div>
                      <h5 className="card-title fw-bold">{opportunity.title}</h5>
                      <p className="text-muted mb-2">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {opportunity.location}
                      </p>
                      <p className="card-text text-muted">{opportunity.description}</p>
                      {opportunity.applicationDeadline && (
                        <p className="text-muted mb-2">
                          <i className="fas fa-calendar-alt me-1"></i>
                          Deadline: {new Date(opportunity.applicationDeadline).toLocaleDateString()}
                        </p>
                      )}
                      {opportunity.requirements && opportunity.requirements.length > 0 && (
                        <>
                          <h6 className="fw-bold mb-2">Requirements:</h6>
                          <ul className="list-unstyled">
                            {opportunity.requirements.map((req, idx) => (
                              <li key={idx} className="mb-1">
                                <i className="fas fa-check text-primary me-2"></i>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
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

export default GetInvolvedPage;
