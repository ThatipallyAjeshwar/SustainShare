import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUtensils, FaTruck, FaDollarSign, FaChartLine, FaCog, FaSignOutAlt, FaSearch, FaEye, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const stats = {
    totalUsers: 4,
    userGrowth: 97,
    totalDonations: 5,
    donationGrowth: 16,
    totalPickups: 3,
    pickupGrowth: 8,
    totalRevenue: 0,
    revenueGrowth: 22
  };

  const users = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'DONOR', joined: '7/20/2025' },
    { id: 2, name: 'Helping Hands Foundation', email: 'charity@helpinghands.org', role: 'CHARITY', joined: '7/20/2025' },
    { id: 3, name: 'Admin User', email: 'admin@sustainshare.com', role: 'ADMIN', joined: '7/20/2025' },
    { id: 4, name: 'rajesh bhar', email: 'rajesh@gmail.com', role: 'DONOR', joined: '7/20/2025' }
  ];

  const donations = [
    { id: 1, name: 'Mixed Vegetarian Meals', donor: 'donor001', quantity: 25, location: 'Hitech City, Hyderabad', status: 'AVAILABLE' },
    { id: 2, name: 'Fresh Bread and Pastries', donor: 'donor001', quantity: 50, location: 'Banjara Hills, Hyderabad', status: 'AVAILABLE' },
    { id: 3, name: 'Cooked Rice and Dal', donor: 'donor001', quantity: 100, location: 'Jubilee Hills, Hyderabad', status: 'AVAILABLE' },
    { id: 4, name: 'Fresh Fruits and Vegetables', donor: 'donor001', quantity: 30, location: 'Madhapur, Hyderabad', status: 'AVAILABLE' }
  ];

  const pickups = [
    { id: 1, food: 'Vegetable Biryani', charity: 'Helping Hands Foundation', scheduled: '7/20/2025, 2:30:00 PM', location: 'Charminar, Hyderabad' },
    { id: 2, food: 'Fresh Bread and Pastries', charity: 'Helping Hands Foundation', scheduled: '7/20/2025, 2:30:00 PM', location: 'Charminar, Hyderabad' }
  ];

  const settings = {
    database: {
      backup: false,
      clearCache: true,
      reset: false
    },
    notifications: {
      email: false,
      sms: true,
      reports: false
    },
    security: {
      twoFactor: true,
      autoLogout: true,
      ipWhitelist: false
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAction = (action) => {
    showNotification('success', `${action} completed successfully`);
  };

  const handleLogout = () => {
    showNotification('info', 'Logging out...');
    setTimeout(() => navigate('/login'), 1500);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
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

      {/* Header */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage and monitor the SustainShare platform</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> Users
        </button>
        <button
          className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          <FaUtensils /> Donations
        </button>
        <button
          className={`tab-button ${activeTab === 'pickups' ? 'active' : ''}`}
          onClick={() => setActiveTab('pickups')}
        >
          <FaTruck /> Pickups
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> Settings
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
                <span className="growth positive">+{stats.userGrowth}% this month</span>
              </div>
              <div className="stat-card">
                <h3>{stats.totalDonations}</h3>
                <p>Food Donations</p>
                <span className="growth positive">+{stats.donationGrowth}% this week</span>
              </div>
              <div className="stat-card">
                <h3>{stats.totalPickups}</h3>
                <p>Scheduled Pickups</p>
                <span className="growth positive">+{stats.pickupGrowth}% today</span>
              </div>
              <div className="stat-card">
                <h3>${stats.totalRevenue}</h3>
                <p>Platform Revenue</p>
                <span className="growth positive">+{stats.revenueGrowth}% this month</span>
              </div>
            </div>

            <div className="analytics-section">
              <h2>Platform Analytics</h2>
              <p>Real-time analytics dashboard</p>
              
              <div className="analytics-card">
                <h3>Live Platform Activity</h3>
                <div className="map-info">
                  <p>Hide Route</p>
                  <p>Center Map</p>
                  <p>6.50 km</p>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                  <li>
                    <p>New user registered: Priya Sharma</p>
                    <span>2 minutes ago</span>
                  </li>
                  <li>
                    <p>Food donation posted: Vegetable Biryani</p>
                    <span>15 minutes ago</span>
                  </li>
                  <li>
                    <p>Pickup completed successfully</p>
                    <span>1 hour ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="users-management">
            <h2>User Management</h2>
            
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="users-list">
              <div className="users-header">
                <span>USER</span>
                <span>JOINED</span>
                <span>ACTIONS</span>
              </div>
              
              {filteredUsers.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-joined">
                    <span>{user.joined}</span>
                  </div>
                  <div className="user-actions">
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                    <button className="view-button">
                      <FaEye /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="donations-management">
            <h2>Donation Management</h2>
            
            <div className="donations-list">
              {donations.map(donation => (
                <div key={donation.id} className="donation-card">
                  <div className="donation-status">
                    <span className="status-badge">{donation.status}</span>
                  </div>
                  <div className="donation-info">
                    <h4>{donation.name}</h4>
                    <p>Donor: {donation.donor}</p>
                    <p>Quantity: {donation.quantity} servings</p>
                    <p>Location: {donation.location}</p>
                  </div>
                  <div className="donation-actions">
                    <button className="view-button">
                      <FaEye /> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pickups' && (
          <div className="pickups-management">
            <h2>Pickup Management</h2>
            
            <div className="pickups-list">
              {pickups.map(pickup => (
                <div key={pickup.id} className="pickup-card">
                  <div className="pickup-info">
                    <h4>{pickup.food}</h4>
                    <p>Charity: {pickup.charity}</p>
                    <p>Scheduled: {pickup.scheduled}</p>
                    <p>Location: {pickup.location}</p>
                  </div>
                  <div className="pickup-actions">
                    <button className="view-button">
                      <FaEye /> View Details
                    </button>
                    <button className="edit-button">
                      <FaEdit /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-management">
            <h2>Platform Settings</h2>
            
            <div className="settings-section">
              <h3>Database Management</h3>
              <div className="setting-item">
                <input type="checkbox" id="backup" checked={settings.database.backup} />
                <label htmlFor="backup">Backup Database</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="clearCache" checked={settings.database.clearCache} />
                <label htmlFor="clearCache">Clear Cache</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="reset" checked={settings.database.reset} />
                <label htmlFor="reset">Reset Platform</label>
              </div>
            </div>

            <div className="settings-section">
              <h3>Notifications</h3>
              <div className="setting-item">
                <input type="checkbox" id="emailNotif" checked={settings.notifications.email} />
                <label htmlFor="emailNotif">Email notifications for new donations</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="smsNotif" checked={settings.notifications.sms} />
                <label htmlFor="smsNotif">SMS alerts for urgent pickups</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="reports" checked={settings.notifications.reports} />
                <label htmlFor="reports">Weekly analytics reports</label>
              </div>
            </div>

            <div className="settings-section">
              <h3>Security Settings</h3>
              <div className="setting-item">
                <input type="checkbox" id="twoFactor" checked={settings.security.twoFactor} />
                <label htmlFor="twoFactor">Two-factor authentication required</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="autoLogout" checked={settings.security.autoLogout} />
                <label htmlFor="autoLogout">Auto-logout after 30 minutes</label>
              </div>
              <div className="setting-item">
                <input type="checkbox" id="ipWhitelist" checked={settings.security.ipWhitelist} />
                <label htmlFor="ipWhitelist">IP whitelist enforcement</label>
              </div>
            </div>

            <button 
              className="save-settings"
              onClick={() => handleAction('Settings saved')}
            >
              Save Settings
            </button>
          </div>
        )}
      </main>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminDashboard;