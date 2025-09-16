import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all contact submissions
  const fetchContacts = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`${API_URL}/api/contact/get`);

      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;

    try {
      await axios.delete(`${API_URL}/api/contact/delete/${id}`);

      toast.success('Contact message deleted successfully');
      fetchContacts();
      if (showModal) setShowModal(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact message');
    }
  };

  // View contact details
  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // Automatically mark as read when viewing
    if (!contact.read) {
      handleMarkAsRead(contact._id, true);
    }
  };

  // Mark as read/unread
  const handleMarkAsRead = async (id, read) => {
    try {
      await axios.patch(`${API_URL}/api/contact/read-status/${id}`, { read });
      toast.success(`Message marked as ${read ? 'read' : 'unread'}`);
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card admin-card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold">Contact Messages</h1>
            <button
              onClick={fetchContacts}
              className="btn btn-success"
            >
              <i className="fas fa-sync-alt me-2"></i> Refresh
            </button>
          </div>



          {contacts.length === 0 ? (
            <div className="alert alert-info">No contact messages found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table admin-table table-hover">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className={!contact.read ? 'table-warning' : ''}>
                      <td>
                        <span className={`badge ${contact.read ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {contact.read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td>{contact.firstName} {contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || 'Not provided'}</td>
                      <td>{contact.subject}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleViewDetails(contact)}
                            className="btn btn-sm btn-primary"
                          >
                            <i className="fas fa-eye me-1"></i> View
                          </button>

                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fas fa-trash me-1"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Contact Message Details</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              
              <div className="modal-body p-4">
                <div className="list-group list-group-flush">
                  <div className="list-group-item">
                    <strong>Status:</strong> 
                    <span className={`badge ms-2 ${selectedContact.read ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {selectedContact.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                  <div className="list-group-item">
                    <strong>Name:</strong> {selectedContact.firstName} {selectedContact.lastName}
                  </div>
                  <div className="list-group-item">
                    <strong>Email:</strong> {selectedContact.email}
                  </div>
                  <div className="list-group-item">
                    <strong>Phone:</strong> {selectedContact.phone || 'Not provided'}
                  </div>
                  <div className="list-group-item">
                    <strong>Subject:</strong> {selectedContact.subject}
                  </div>
                  <div className="list-group-item">
                    <strong>Message:</strong>
                    <div className="mt-2 p-3 bg-light rounded">
                      {selectedContact.message}
                    </div>
                  </div>
                  <div className="list-group-item">
                    <strong>Received:</strong> {formatDate(selectedContact.createdAt)}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
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

export default Contact;