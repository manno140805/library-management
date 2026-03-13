import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../api';

const BrowseBooks = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryIdParam = queryParams.get('categoryId') || '';

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryIdParam);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [books, search]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const getBooksByCategory = (categoryId) => {
    return filteredBooks.filter(book => book.category && book.category._id === categoryId);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: '#4a148c',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>Browse Books</h1>
      <p style={{
        textAlign: 'center',
        color: '#6a1b9a',
        marginBottom: '30px',
        fontSize: '1.1rem'
      }}>
        Explore our collection of books organized by categories.
      </p>
      <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '12px 20px',
            width: '40%',
            borderRadius: '25px',
            border: '2px solid #ba68c8',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px 20px',
            borderRadius: '25px',
            border: '2px solid #ba68c8',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            color: '#4a148c',
            cursor: 'pointer'
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {categories.length > 0 ? (
        categories
          .filter(cat => selectedCategory ? cat._id === selectedCategory : true)
          .map(category => {
          const categoryBooks = getBooksByCategory(category._id);
          if (categoryBooks.length === 0) return null;

          return (
            <div key={category._id} style={{ marginBottom: '50px' }}>
              <h2 style={{
                color: '#4a148c',
                marginBottom: '20px',
                fontSize: '1.8rem',
                borderBottom: '2px solid #ba68c8',
                paddingBottom: '10px'
              }}>
                {category.name}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {categoryBooks.map(book => (
                  <div key={book._id} style={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '20px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #e1bee7',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                  >
                    <h3 style={{
                      color: '#4a148c',
                      marginBottom: '10px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {book.title}
                    </h3>
                    <p style={{
                      color: '#7b1fa2',
                      marginBottom: '8px',
                      fontWeight: '500'
                    }}>
                      Author: {book.author}
                    </p>
                    <p style={{
                      color: '#6a1b9a',
                      marginBottom: '10px',
                      lineHeight: '1.5',
                      fontSize: '0.95rem'
                    }}>
                      {book.description || 'No description available.'}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #f3e5f5'
                    }}>
                      <span style={{
                        color: '#ab47bc',
                        fontSize: '0.9rem'
                      }}>
                        ISBN: {book.isbn}
                      </span>
                      <span style={{
                        color: '#4a148c',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}>
                        Available: {book.availableCopies}/{book.totalCopies}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ textAlign: 'center', color: '#6a1b9a', fontSize: '1.1rem' }}>
          Loading categories...
        </p>
      )}

      {categories.length > 0 && filteredBooks.length === 0 && search && (
        <p style={{
          textAlign: 'center',
          color: '#6a1b9a',
          fontSize: '1.1rem',
          marginTop: '40px'
        }}>
          No books found matching your search.
        </p>
      )}
    </div>
  );
};

export default BrowseBooks;