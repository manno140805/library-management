import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import './Auth.css';

const Login = () => {
  // User Login State
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserError('');
    setUserLoading(true);
    
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email: userEmail, password: userPassword });
      localStorage.setItem('token', res.data.token);
      
      if (res.data.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/user';
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setUserError(err.response.data.error);
      } else {
        setUserError('Login failed. Please check your credentials.');
      }
      setUserLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);
    
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email: adminEmail, password: adminPassword });
      
      // Additional safety check to verify they are actually an admin
      if (res.data.user.role !== 'admin') {
        setAdminError('Access denied. Admin privileges required.');
        setAdminLoading(false);
        return;
      }
      
      localStorage.setItem('token', res.data.token);
      window.location.href = '/admin';

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setAdminError('Invalid Admin credentials.');
      } else {
        setAdminError('Login failed. Please check your network connection.');
      }
      setAdminLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container split-layout">
        
        {/* User Login Card */}
        <div className="auth-card">
          <h1 className="auth-title">User Login</h1>
          <p className="auth-subtitle">Sign in to your library account</p>
          
          {userError && <div className="auth-error">{userError}</div>}
          
          <form className="auth-form" onSubmit={handleUserSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="userEmail">Email Address</label>
              <input
                id="userEmail"
                className={`form-input ${userError ? 'input-error' : ''}`}
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="userPassword">Password</label>
              <input
                id="userPassword"
                className={`form-input ${userError ? 'input-error' : ''}`}
                type="password"
                placeholder="Enter your password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-btn"
              disabled={userLoading}
              style={{ opacity: userLoading ? 0.7 : 1, cursor: userLoading ? 'not-allowed' : 'pointer' }}
            >
              {userLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-footer">
            Don't have an account? 
            <Link to="/register" className="auth-link">Sign Up</Link>
          </div>
        </div>

        {/* Admin Login Card */}
        <div className="auth-card admin-card">
          <h1 className="auth-title">Admin Login</h1>
          <p className="auth-subtitle">Secure Staff Access Portal</p>
          
          {adminError && <div className="auth-error">{adminError}</div>}
          
          <form className="auth-form" onSubmit={handleAdminSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="adminEmail">Admin Email</label>
              <input
                id="adminEmail"
                className={`form-input ${adminError ? 'input-error' : ''}`}
                type="email"
                placeholder="authority@library.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="adminPassword">Admin Password</label>
              <input
                id="adminPassword"
                className={`form-input ${adminError ? 'input-error' : ''}`}
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-btn"
              disabled={adminLoading}
              style={{ opacity: adminLoading ? 0.7 : 1, cursor: adminLoading ? 'not-allowed' : 'pointer' }}
            >
              {adminLoading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
          <div className="auth-footer" style={{visibility: 'hidden'}}>
            {/* Keeps cards balanced visually */}
            Buffer line 
            <span className="auth-link">Buffer</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;