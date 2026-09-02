import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@sustainshare.com',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Login successful! Redirecting...'
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  const handleDemoLogin = (role) => {
    setNotification({
      type: 'info',
      message: `Logged in as ${role} for demo purposes`
    });
    // Redirect based on role
    setTimeout(() => {
      // Convert role to lowercase for consistent routing
      const routeRole = role.toLowerCase();
      navigate(`/${routeRole}-dashboard`);
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Notification System */}
      {notification && (
        <motion.div
          className={`notification ${notification.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          }}
        >
          {notification.message}
        </motion.div>
      )}

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey with SustainShare</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : '+ Sign In'}
          </button>
        </form>

        <div className="demo-access">
          <p>Quick Demo Access</p>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-button"
              onClick={() => handleDemoLogin('donor')}
            >
              Try as Donor
            </button>
            <button
              type="button"
              className="demo-button"
              onClick={() => handleDemoLogin('charity')}
            >
              Try as Charity
            </button>
            <button
              type="button"
              className="demo-button"
              onClick={() => handleDemoLogin('admin')}
            >
              Try as Admin
            </button>
          </div>
        </div>

        <div className="login-footer">
          <div className="footer-links">
            <Link to="/signup">Don't have an account? Create one here</Link>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;