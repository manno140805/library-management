import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    issuedBooks: 0,
    overdueBooks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/reports`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Monitor your library system overview and manage content securely.</p>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Books</div>
          <div className="stat-value">{loading ? '...' : stats.totalBooks || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Members</div>
          <div className="stat-value">{loading ? '...' : stats.totalMembers || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Issued Books</div>
          <div className="stat-value" style={{ color: '#0288d1' }}>{loading ? '...' : stats.issuedBooks || 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Overdue Books</div>
          <div className="stat-value" style={{ color: '#d32f2f' }}>{loading ? '...' : stats.overdueBooks || 0}</div>
        </div>
      </section>

      <section className="actions-section">
        <h2 className="actions-header">Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/books" className="action-btn">
            <span className="action-icon">📚</span>
            <span className="action-text">Manage Books</span>
          </Link>
          <Link to="/admin/members" className="action-btn">
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Members</span>
          </Link>
          <Link to="/admin/issue-return" className="action-btn">
            <span className="action-icon">🔄</span>
            <span className="action-text">Issue / Return Books</span>
          </Link>
          <Link to="/admin/reports" className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">View Reports</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;