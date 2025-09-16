import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import { Form, Row, Col } from 'react-bootstrap';

const GetInvolved = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('partnerships');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  


  const API_URL = `${import.meta.env.VITE_API_URL}/api`;

  // Fetch all submissions
  const fetchAllSubmissions = async () => {
    try {
      setLoading(true);
      
      const [
        partnershipRes,
        sponsorshipRes,
        volunteerRes
      ] = await Promise.all([
        axios.get(`${API_URL}/partnership/get`),
        axios.get(`${API_URL}/sponsorship/get`),
        axios.get(`${API_URL}/volunteer/get`)
      ]);

      setPartnerships(partnershipRes.data.data || []);
      setSponsorships(sponsorshipRes.data.data || []);
      setVolunteers(volunteerRes.data.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load form submissions');
    } finally {
      setLoading(false);
    }
  };

  // Mark as read/unread
   const handleMarkAsRead = async (type, id, read) => {
     try {
       const endpoint =
         type === 'partnership' ? 'partnership' :
         type === 'sponsorship' ? 'sponsorship' : 'volunteer';
 
       await axios.patch(`${API_URL}/${endpoint}/read-status/${id}`, { read },{
        withCredentials:true,
       });
 
       toast.success(`Marked as ${read ? 'read' : 'unread'}`);
       fetchAllSubmissions();
     } catch (error) {
       console.error('Error updating status:', error);
       toast.error('Failed to update status');
     }
   };

  // Delete submission
  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const endpoint =
        type === 'partnership' ? 'partnership' :
        type === 'sponsorship' ? 'sponsorship' : 'volunteer';

      await axios.delete(`${API_URL}/${endpoint}/delete/${id}`);

      toast.success('Submission deleted successfully');
      fetchAllSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  // View submission details
  const handleViewDetails = async (item, type) => {
        // Mark as read if not already read
        if (!item.read) {
            await handleMarkAsRead(type, item._id, true);
        }
        
        setSelectedItem({ ...item, type });
        setShowModal(true);
    };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchAllSubmissions();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  const TabButton = ({ tab, label, count }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
    >
      {label} <span className="badge bg-light text-dark ms-1">{count}</span>
    </button>
  );

  const SubmissionCard = ({ item, type, onView, onDelete }) => (
    <div className="card mb-3 admin-card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">
              {type === 'partnership' ? item.organizationName :
               type === 'sponsorship' ? item.organizationName :
               `${item.firstName} ${item.lastName}`}
            </h5>
            <p className="card-text mb-1"><strong>Email:</strong> {item.email}</p>
            <p className="card-text mb-1"><strong>Phone:</strong> {item.phone || 'Not provided'}</p>

            {type === 'partnership' && (
              <p className="card-text mb-1"><strong>Types:</strong> {Array.isArray(item.partnershipTypes) ? item.partnershipTypes.join(', ') : item.partnershipTypes}</p>
            )}
            {type === 'sponsorship' && (
              <p className="card-text mb-1"><strong>Level:</strong> {item.sponsorshipLevel || 'Not specified'}</p>
            )}
            {type === 'volunteer' && (
              <p className="card-text mb-1"><strong>Interests:</strong> {Array.isArray(item.areasOfInterest) ? item.areasOfInterest.join(', ') : item.areasOfInterest}</p>
            )}

            <p className="card-text text-muted small">
              Submitted: {formatDate(item.createdAt)}
            </p>
          </div>

          <div className="d-flex align-items-start">
            <div className="me-3">
              <span className={`badge ${item.read ? 'bg-secondary' : 'bg-warning text-dark'}`}>
                {item.read ? 'Read' : 'Unread'}
              </span>
            </div>
            <div className="d-flex">
              <button onClick={() => onView(item, type)} className="btn btn-sm btn-primary me-2">
                <i className="fas fa-eye me-1"></i> View
              </button>
              <button onClick={() => onDelete(type, item._id)} className="btn btn-sm btn-danger">
                <i className="fas fa-trash me-1"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="card admin-card mb-4">
        <div className="card-body">
          <h1 className="display-6 fw-bold mb-4">Get Involved Form Submissions</h1>

          {/* Refresh Button */}
          <div className="mb-4">
            <button onClick={fetchAllSubmissions} className="btn btn-success">
              <i className="fas fa-sync-alt me-2"></i> Refresh
            </button>
          </div>

          {/* Tabs */}
          <div className="d-flex flex-wrap mb-4">
            <TabButton tab="partnerships" label="Partnerships" count={partnerships.length} />
            <TabButton tab="sponsorships" label="Sponsorships" count={sponsorships.length} />
            <TabButton tab="volunteers" label="Volunteers" count={volunteers.length} />
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'partnerships' && (
              <div>
                <h2 className="fs-4 fw-semibold mb-3">Partnership Applications</h2>
                {partnerships.length === 0 ? (
                  <div className="alert alert-info">No partnership applications found.</div>
                ) : (
                  partnerships.map((p) => (
                    <SubmissionCard
                      key={p._id}
                      item={p}
                      type="partnership"
                      onView={handleViewDetails}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'sponsorships' && (
              <div>
                <h2 className="fs-4 fw-semibold mb-3">Sponsorship Inquiries</h2>
                {sponsorships.length === 0 ? (
                  <div className="alert alert-info">No sponsorship inquiries found.</div>
                ) : (
                  sponsorships.map((s) => (
                    <SubmissionCard
                      key={s._id}
                      item={s}
                      type="sponsorship"
                      onView={handleViewDetails}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div>
                <h2 className="fs-4 fw-semibold mb-3">Volunteer Applications</h2>
                {volunteers.length === 0 ? (
                  <div className="alert alert-info">No volunteer applications found.</div>
                ) : (
                  volunteers.map((v) => (
                    <SubmissionCard
                      key={v._id}
                      item={v}
                      type="volunteer"
                      onView={handleViewDetails}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submission Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <strong>Status:</strong> 
                  <span className={`badge ${selectedItem.read ? 'bg-secondary' : 'bg-warning text-dark'} ms-2`}>
                    {selectedItem.read ? 'Read' : 'Unread'}
                  </span>
                </div>

                {selectedItem.type === 'partnership' && (
                  <div className="list-group list-group-flush">
                    <div className="list-group-item"><strong>Organization Name:</strong> {selectedItem.organizationName}</div>
                    <div className="list-group-item"><strong>Organization Type:</strong> {selectedItem.organizationType || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Contact Person:</strong> {selectedItem.contactPerson}</div>
                    <div className="list-group-item"><strong>Position:</strong> {selectedItem.position || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Email:</strong> {selectedItem.email}</div>
                    <div className="list-group-item"><strong>Phone:</strong> {selectedItem.phone || 'Not provided'}</div>
                    <div className="list-group-item"><strong>Partnership Types:</strong> {Array.isArray(selectedItem.partnershipTypes) ? selectedItem.partnershipTypes.join(', ') : selectedItem.partnershipTypes}</div>
                    <div className="list-group-item"><strong>Description:</strong> {selectedItem.description}</div>
                  </div>
                )}

                {selectedItem.type === 'sponsorship' && (
                  <div className="list-group list-group-flush">
                    <div className="list-group-item"><strong>Organization Name:</strong> {selectedItem.organizationName}</div>
                    <div className="list-group-item"><strong>Contact Person:</strong> {selectedItem.contactPerson || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Email:</strong> {selectedItem.email}</div>
                    <div className="list-group-item"><strong>Phone:</strong> {selectedItem.phone || 'Not provided'}</div>
                    <div className="list-group-item"><strong>Programs of Interest:</strong> {Array.isArray(selectedItem.programsOfInterest) ? selectedItem.programsOfInterest.join(', ') : selectedItem.programsOfInterest}</div>
                    <div className="list-group-item"><strong>Sponsorship Level:</strong> {selectedItem.sponsorshipLevel || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Duration:</strong> {selectedItem.duration || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Additional Info:</strong> {selectedItem.additionalInfo || 'None provided'}</div>
                  </div>
                )}

                {selectedItem.type === 'volunteer' && (
                  <div className="list-group list-group-flush">
                    <div className="list-group-item"><strong>Name:</strong> {selectedItem.firstName} {selectedItem.lastName}</div>
                    <div className="list-group-item"><strong>Email:</strong> {selectedItem.email}</div>
                    <div className="list-group-item"><strong>Phone:</strong> {selectedItem.phone || 'Not provided'}</div>
                    <div className="list-group-item"><strong>Areas of Interest:</strong> {Array.isArray(selectedItem.areasOfInterest) ? selectedItem.areasOfInterest.join(', ') : selectedItem.areasOfInterest}</div>
                    <div className="list-group-item"><strong>Availability:</strong> {selectedItem.availability}</div>
                    <div className="list-group-item"><strong>Time Commitment:</strong> {selectedItem.timeCommitment || 'Not specified'}</div>
                    <div className="list-group-item"><strong>Why Join:</strong> {selectedItem.whyJoin}</div>
                  </div>
                )}

                <div className="text-muted small mt-3 pt-3 border-top">
                  Submitted on: {formatDate(selectedItem.createdAt)}
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={() => setShowModal(false)} className="btn btn-secondary">Close</button>
                <button
                  onClick={() => {
                    handleDelete(selectedItem.type, selectedItem._id);
                    setShowModal(false);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetInvolved;
