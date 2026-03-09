import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchHistory();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data);
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/borrow/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHistory(res.data);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const borrowBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days
    await axios.post('http://localhost:5000/api/borrow/issue', { bookId, dueDate: dueDate.toISOString().split('T')[0] }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Book requested');
    fetchBooks();
    fetchHistory();
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <input type="text" placeholder="Search books" value={search} onChange={(e) => setSearch(e.target.value)} />
      <h2>Available Books</h2>
      <ul>
        {filteredBooks.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - Available: {book.availableCopies}
            {book.availableCopies > 0 && <button onClick={() => borrowBook(book._id)}>Borrow</button>}
          </li>
        ))}
      </ul>
      <h2>Borrowing History</h2>
      <ul>
        {history.map(record => (
          <li key={record._id}>
            {record.book.title} - Borrowed: {new Date(record.borrowDate).toLocaleDateString()} - Due: {new Date(record.dueDate).toLocaleDateString()} - Status: {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;