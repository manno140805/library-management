import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminPages.css';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', category: '', availableCopies: 0, totalCopies: 0 });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/books', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBooks();
    setForm({ title: '', author: '', isbn: '', category: '', availableCopies: 0, totalCopies: 0 });
  };

  const deleteBook = async (id) => {
    if(!window.confirm('Are you sure you want to delete this book?')) return;
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBooks();
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Manage Books</h1>
        <Link to="/admin" className="back-link">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="admin-form-card">
        <h2>Add New Book</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <label>Book Title</label>
            <input className="admin-input" type="text" placeholder="Harry Potter" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group-inline">
            <label>Author</label>
            <input className="admin-input" type="text" placeholder="J.K. Rowling" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required />
          </div>
          <div className="form-group-inline">
            <label>ISBN</label>
            <input className="admin-input" type="text" placeholder="123-4567890123" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} required />
          </div>
          <div className="form-group-inline">
            <label>Category</label>
            <select className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group-inline" style={{ maxWidth: '120px' }}>
            <label>Total Copies</label>
            <input className="admin-input" type="number" min="1" value={form.totalCopies} onChange={(e) => setForm({ ...form, totalCopies: parseInt(e.target.value), availableCopies: parseInt(e.target.value) })} required />
          </div>
          <button type="submit" className="admin-btn">Add Book</button>
        </form>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td style={{ fontWeight: '600', color: '#4a148c' }}>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className="badge-green">{book.category?.name || 'Uncategorized'}</span>
                </td>
                <td>
                  {book.availableCopies} available / {book.totalCopies} total
                </td>
                <td>
                  <button className="btn-delete" onClick={() => deleteBook(book._id)}>Remove</button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#6a1b9a' }}>
                  No books found in the library.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;