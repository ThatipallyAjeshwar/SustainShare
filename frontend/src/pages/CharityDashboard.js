import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaClock, FaHistory, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './CharityDashboard.css';

const CharityDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [donations, setDonations] = useState([]);

  // Sample stats data
  const stats = {
    totalClaimed: 43,
    completed: 31,
    peopleServed: 575,
    activePickups: 4
  };

  // Fetch donations (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDonations([
        {
          id: 1,
          title: "Mixed Vegetarian Meals",
          location: "Hitech City, Hyderabad",
          bestBefore: "18:30",
          status: "available"
        },
        {
          id: 2,
          title: "Fresh Bread and Pastries",
          location: "Banjara Hills, Hyderabad",
          bestBefore: "19:00",
          status: "available"
        },
        {
          id: 3,
          title: "Cooked Rice and Dal",
          location: "Jubilee Hills, Hyderabad",
          bestBefore: "20:00",
          status: "available"
        }
      ]);
    }, 500);
  }, []);

  const handleClaimDonation = (id) => {
    setNotification({
      type: 'success',
      message: 'Donation claimed successfully!'
    });
    
    // Update the donation status
    setDonations(donations.map(donation => 
      donation.id === id ? { ...donation, status: 'claimed' } : donation
    ));
    
    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    setNotification({
      type: 'info',
      message: 'Logging out...'
    });
    setTimeout(() => navigate('/login'), 1500);
  };

  const filteredDonations = donations.filter(donation =>
    donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donation.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="charity-dashboard">
      {/* Notification System */}
      {notification && (
        <motion.div
          className={`notification ${notification.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome, Helping Hands Foundation!</h1>
        <p>Help distribute food to those who need it most in your community</p>
      </header>

      {/* Stats Overview */}
      <section className="stats-overview">
        <div className="stat-card">
          <h3>{stats.totalClaimed}</h3>
          <p>Total Claimed</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{stats.peopleServed}</h3>
          <p>People Served</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activePickups}</h3>
          <p>Active Pickups</p>
        </div>
      </section>

      {/* Available Donations */}
      <section className="donations-section">
        <h2>Available Food Donations</h2>
        
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search food or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="donations-list">
          {filteredDonations.length > 0 ? (
            filteredDonations.map(donation => (
              <div key={donation.id} className="donation-card">
                <div className="donation-info">
                  <h4>{donation.title}</h4>
                  <p className="location">
                    <FaMapMarkerAlt /> {donation.location}
                  </p>
                  <p className="time">
                    <FaClock /> Best before {donation.bestBefore}
                  </p>
                </div>
                <div className="donation-actions">
                  {donation.status === 'available' ? (
                    <button
                      className="claim-button"
                      onClick={() => handleClaimDonation(donation.id)}
                    >
                      <FaCheckCircle /> Claim
                    </button>
                  ) : (
                    <button className="claimed-button" disabled>
                      Claimed
                    </button>
                  )}
                  <button className="view-button">
                    <FaMapMarkerAlt /> View Location
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No available donations matching your search</p>
            </div>
          )}
        </div>
      </section>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default CharityDashboard;