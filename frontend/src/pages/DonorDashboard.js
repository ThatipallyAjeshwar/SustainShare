import React, { useState } from 'react';
import { FaSearch, FaPlus, FaUtensils, FaChartLine, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const stats = {
    totalDonations: 5,
    peopleHelped: 10,
    foodSaved: 12
  };

  const [foodForm, setFoodForm] = useState({
    foodName: '',
    category: '',
    quantity: '',
    bestBefore: '',
    salesLevel: 'Medium',
    location: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitDonation = (e) => {
    e.preventDefault();
    const newDonation = {
      ...foodForm,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: 'Active'
    };
    setDonations([...donations, newDonation]);
    setFoodForm({
      foodName: '',
      category: '',
      quantity: '',
      bestBefore: '',
      salesLevel: 'Medium',
      location: '',
      description: '',
      image: null
    });
    setShowFoodForm(false);
    setActiveTab('manage');
  };

  const filteredDonations = donations.filter(donation =>
    donation.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="donor-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome back, Donor!</h1>
        <p>Make a difference today by sharing surplus food with those in need</p>
      </header>

      {/* Stats Overview */}
      <section className="stats-overview">
        <div className="stat-card">
          <h3>{stats.totalDonations}</h3>
          <p>Total Donations</p>
        </div>
        <div className="stat-card">
          <h3>{stats.peopleHelped}</h3>
          <p>People Helped</p>
        </div>
        <div className="stat-card">
          <h3>{stats.foodSaved}kg</h3>
          <p>Food Saved</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          <FaPlus /> Post Food
        </button>
        <button
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          <FaUtensils /> Manage Donations
        </button>
        <button
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <FaChartLine /> Analytics
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {activeTab === 'post' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="post-food-section"
          >
            <h2>Sustainability</h2>
            <form onSubmit={handleSubmitDonation} className="food-form">
              <div className="form-group">
                <label>Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="e.g., Vegetable Biryani"
                  value={foodForm.foodName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={foodForm.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="North Indian">North Indian</option>
                  <option value="South Indian">South Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Continental">Continental</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity (servings)</label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Number of servings"
                    value={foodForm.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Best Before Time</label>
                  <input
                    type="datetime-local"
                    name="bestBefore"
                    value={foodForm.bestBefore}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sales Level</label>
                  <select
                    name="salesLevel"
                    value={foodForm.salesLevel}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Pickup Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Restaurant Name, Area, Hyderabad"
                    value={foodForm.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Brief description of the food, ingredients, etc."
                  value={foodForm.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Food Image (Optional)</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoodForm({...foodForm, image: e.target.files[0]})}
                  />
                  <button type="button" className="upload-button">
                    Choose image
                  </button>
                  {foodForm.image && (
                    <span className="file-name">{foodForm.image.name}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Post Food Donation
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'manage' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="manage-donations"
          >
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search your donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredDonations.length > 0 ? (
              <div className="donations-list">
                <h3>Active Donations</h3>
                {filteredDonations.map(donation => (
                  <div key={donation.id} className="donation-card">
                    <div className="donation-info">
                      <h4>{donation.foodName}</h4>
                      <p><strong>Category:</strong> {donation.category}</p>
                      <p><strong>Quantity:</strong> {donation.quantity} servings</p>
                      <p><strong>Status:</strong> {donation.status}</p>
                    </div>
                    <div className="donation-actions">
                      <button className="edit-button">Edit</button>
                      <button className="cancel-button">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No donations found</h3>
                <p>Start by posting your first food donation!</p>
                <button 
                  className="post-food-button"
                  onClick={() => setActiveTab('post')}
                >
                  <FaPlus /> Post Food
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="analytics-section"
          >
            <h2>Your Impact Analytics</h2>
            <div className="analytics-cards">
              <div className="analytics-card">
                <h3>Total Donations</h3>
                <p>{stats.totalDonations}</p>
              </div>
              <div className="analytics-card">
                <h3>People Helped</h3>
                <p>{stats.peopleHelped}</p>
              </div>
              <div className="analytics-card">
                <h3>Food Saved</h3>
                <p>{stats.foodSaved} kg</p>
              </div>
            </div>
            {/* Additional charts/graphs would go here */}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DonorDashboard;