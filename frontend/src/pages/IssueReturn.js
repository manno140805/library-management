import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';
import './AdminPages.css';

const IssueReturn = () => {
  const [books, setBooks] = useState([]);
  const [borrowForm, setBorrowForm] = useState({ bookId: '', dueDate: '' });
  const [returnId, setReturnId] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/books`);
      setBooks(res.data);
    } catch(e) {
      console.error(e);
    }
  };



  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/borrow/issue`, borrowForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book physically issued successfully.');
      fetchBooks();
      setBorrowForm({ bookId: '', dueDate: '' });
    } catch (err) {
      if(err.response?.data?.error) alert(err.response.data.error);
      else alert('Error issuing book');
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/borrow/return/${returnId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book physically returned to Library.');
      fetchBooks();
      setReturnId('');
    } catch(err) {
      if(err.response?.data?.error) alert(err.response.data.error);
      else alert('Error returning book');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Issue / Return Books</h1>
        <Link to="/admin" className="back-link">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap'}}>
        {/* Issue Book Form */}
        <div className="admin-form-card" style={{flex: '1 1 400px'}}>
          <h2>Issue a Book</h2>
          <form className="admin-form" onSubmit={handleIssue}>
            <div className="form-group-inline" style={{width: '100%'}}>
              <label>Select Book</label>
              <select className="admin-input" value={borrowForm.bookId} onChange={(e) => setBorrowForm({ ...borrowForm, bookId: e.target.value })} required>
                <option value="" disabled>Choose an available book</option>
                {books.filter(b => b.availableCopies > 0).map(book => (
                  <option key={book._id} value={book._id}>{book.title} ({book.availableCopies} available)</option>
                ))}
              </select>
            </div>
            <div className="form-group-inline" style={{width: '100%'}}>
              <label>Expected Due Date</label>
              <input className="admin-input" type="date" value={borrowForm.dueDate} onChange={(e) => setBorrowForm({ ...borrowForm, dueDate: e.target.value })} required />
            </div>
            <button type="submit" className="admin-btn" style={{width: '100%', alignSelf: 'center', marginTop: '10px'}}>Issue to Member</button>
          </form>
        </div>

        {/* Return Book Form */}
        <div className="admin-form-card" style={{flex: '1 1 400px'}}>
          <h2>Return a Book</h2>
          <form className="admin-form" onSubmit={handleReturn}>
            <div className="form-group-inline" style={{width: '100%'}}>
              <label>Borrow Record ID</label>
              <input 
                className="admin-input" 
                type="text" 
                placeholder="Enter unique receipt ID (63e...)" 
                value={returnId} 
                onChange={(e) => setReturnId(e.target.value)} 
                required 
              />
            </div>
            <p style={{fontSize: '0.85rem', color: '#6a1b9a', marginTop: '-10px', marginBottom: '20px'}}>Ask the member for their unique checkout receipt ID.</p>
            <button 
              type="submit" 
              className="admin-btn" 
              style={{
                width: '100%', 
                alignSelf: 'center',
                background: 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.25)' 
              }}
            >
              Verify & Return to Library
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueReturn;