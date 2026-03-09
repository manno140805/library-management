import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#4a148c', textAlign: 'center', marginBottom: '30px' }}>About LibraryHub</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div>
          <h2 style={{ color: '#7b1fa2', marginBottom: '20px' }}>Our Mission</h2>
          <p style={{ color: '#6a1b9a', lineHeight: '1.6' }}>
            LibraryHub is dedicated to fostering a love for reading and learning by providing easy access to a vast collection of books.
            Our digital library system allows users to browse, borrow, and explore thousands of titles from the comfort of their homes.
          </p>
          <h2 style={{ color: '#7b1fa2', marginBottom: '20px', marginTop: '30px' }}>Features</h2>
          <ul style={{ color: '#6a1b9a', lineHeight: '1.8' }}>
            <li>Extensive book collection across all genres</li>
            <li>User-friendly search and browse functionality</li>
            <li>Online borrowing and reservation system</li>
            <li>Personalized reading history and recommendations</li>
            <li>Mobile-responsive design for access anywhere</li>
          </ul>
        </div>
        <div>
          <h2 style={{ color: '#7b1fa2', marginBottom: '20px' }}>How It Works</h2>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#ab47bc' }}>1. Sign Up</h3>
            <p style={{ color: '#6a1b9a' }}>Create your free account to start exploring our library.</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#ab47bc' }}>2. Browse & Search</h3>
            <p style={{ color: '#6a1b9a' }}>Use our search tools to find books by title, author, or category.</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#ab47bc' }}>3. Borrow & Enjoy</h3>
            <p style={{ color: '#6a1b9a' }}>Borrow books instantly and enjoy reading at your own pace.</p>
          </div>
          <div>
            <h3 style={{ color: '#ab47bc' }}>4. Return & Repeat</h3>
            <p style={{ color: '#6a1b9a' }}>Return books when you're done and discover new titles.</p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#4a148c', marginBottom: '10px' }}>Contact Us</h2>
        <p style={{ color: '#6a1b9a' }}>Have questions? Reach out to us at support@libraryhub.com</p>
      </div>
    </div>
  );
};

export default About;