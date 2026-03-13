import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import './AdminPages.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/reports`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports([res.data]);
      } catch (e) {
        console.error("Failed to load full reports.", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Library Operations Report</h1>
        <Link to="/admin" className="back-link">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="reports-list">
        {!loading && reports.map((report, index) => (
          <div key={index} className="report-card">
            <h3 style={{ color: '#4a148c', fontSize: '1.4rem', marginBottom: '25px', marginTop: 0 }}>Current Snapshot</h3>
            
            <div className="report-item">
              <span style={{ fontWeight: 600, color: '#6a1b9a' }}>Total Library Books:</span>
              <span className="badge-green">{report.totalBooks} Volumes</span>
            </div>
            
            <div className="report-item">
              <span style={{ fontWeight: 600, color: '#6a1b9a' }}>Registered Members:</span>
              <span className="badge-green">{report.totalMembers} Active</span>
            </div>
            
            <div className="report-item">
              <span style={{ fontWeight: 600, color: '#6a1b9a' }}>Books Currently Issued:</span>
              <span style={{ color: '#0288d1', fontWeight: 'bold' }}>{report.issuedBooks} Books Out</span>
            </div>
            
            <div className="report-item" style={{ borderBottom: 'none' }}>
              <span style={{ fontWeight: 600, color: '#6a1b9a' }}>Overdue Books:</span>
              <span className={report.overdueBooks > 0 ? "badge-red" : "badge-green"}>
                {report.overdueBooks} Overdue
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'center', width: '100%', color: '#aba4b9', padding: '50px' }}>
            Compiling library reports...
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;