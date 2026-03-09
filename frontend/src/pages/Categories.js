import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const sampleCategories = [
    { name: 'Computer Courses', description: 'Books related to computer courses such as programming, databases, networking, operating systems, web development, etc.' },
    { name: 'Fiction', description: 'Fictional novels and stories.' },
    { name: 'Motivational', description: 'Motivational and self-help books.' }
  ];

  const displayCategories = categories.length > 0 ? categories : sampleCategories;

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
      }}>Subjects</h1>
      <p style={{
        textAlign: 'center',
        color: '#6a1b9a',
        marginBottom: '40px',
        fontSize: '1.1rem',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        Discover syllabi organized by subjects. Find resources for your favorite topics and explore new areas of study.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {displayCategories.map((category, index) => (
          <div key={category._id || index} style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            border: '1px solid #e1bee7',
            textAlign: 'center',
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
            <h3 style={{ color: '#4a148c', marginBottom: '15px', fontSize: '1.5rem' }}>{category.name}</h3>
            <p style={{ color: '#6a1b9a', marginBottom: '20px', lineHeight: '1.6' }}>
              {category.description || 'Explore syllabi in this fascinating subject.'}
            </p>
            <Link
              to={`/browse?categoryId=${category._id || ''}`}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#7b1fa2',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: '500',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6a1b9a'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#7b1fa2'}
            >
              View Books
            </Link>
          </div>
        ))}
      </div>
      {categories.length === 0 && (
        <p style={{
          textAlign: 'center',
          color: '#6a1b9a',
          fontSize: '1.1rem',
          marginTop: '40px'
        }}>
          No categories available at the moment.
        </p>
      )}
    </div>
  );
};

export default Categories;