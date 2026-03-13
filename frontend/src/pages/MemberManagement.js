import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import './AdminPages.css';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/members`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to load members", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/members`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMembers();
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      alert("Error adding new member.");
    }
  };

  const deleteMember = async (id) => {
    if(!window.confirm('Are you sure you want to completely delete this member user context?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMembers();
    } catch (err) {
      alert("Error deleting member.");
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Manage Members</h1>
        <Link to="/admin" className="back-link">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="admin-form-card">
        <h2>Add New Library Member</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <label>Member Name</label>
            <input className="admin-input" type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group-inline">
            <label>Email Address</label>
            <input className="admin-input" type="email" placeholder="jane.doe@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group-inline">
            <label>Temporary Password</label>
            <input className="admin-input" type="password" placeholder="Generate a starter password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="admin-btn">Add Member</button>
        </form>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>System Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td><span className="badge-green">UID-{String(member._id).slice(-6).toUpperCase()}</span></td>
                <td style={{ fontWeight: '600', color: '#4a148c' }}>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <span className={member.role === 'admin' ? 'badge-red' : 'badge-green'}>
                    {member.role === 'admin' ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>
                  {member.role !== 'admin' ? (
                     <button className="btn-delete" onClick={() => deleteMember(member._id)}>Remove Account</button>
                  ) : (
                     <span style={{ fontSize: '0.8rem', color: '#9e9e9e' }}>Cannot Delete Amin</span>
                  )}
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#6a1b9a' }}>
                  No members are registered in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;