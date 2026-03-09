import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#6a1b9a', padding: '10px 20px', borderBottom: '1px solid #ab47bc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>📚 SyllabusHub</h2>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#e1bee7'} onMouseOut={(e) => e.target.style.color = 'white'}>Home</Link>
        <Link to="/browse" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#e1bee7'} onMouseOut={(e) => e.target.style.color = 'white'}>Browse Books</Link>
        <Link to="/categories" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#e1bee7'} onMouseOut={(e) => e.target.style.color = 'white'}>Categories</Link>
        <Link to="/about" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#e1bee7'} onMouseOut={(e) => e.target.style.color = 'white'}>About</Link>
      </nav>
      <div>
        <Link to="/login" style={{ margin: '0 10px', padding: '8px 16px', backgroundColor: '#ab47bc', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: '500', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ba68c8'} onMouseOut={(e) => e.target.style.backgroundColor = '#ab47bc'}>Login</Link>
        <Link to="/register" style={{ margin: '0 10px', padding: '8px 16px', backgroundColor: '#e1bee7', color: '#4a148c', textDecoration: 'none', borderRadius: '5px', fontWeight: '500', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#f3e5f5'} onMouseOut={(e) => e.target.style.backgroundColor = '#e1bee7'}>Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;