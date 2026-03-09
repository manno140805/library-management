import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Organize Knowledge, One Syllabus at a Time.</h1>
          <p className="hero-subheading">Streamline your educational resources.</p>
          <p className="hero-description">
            Manage syllabi, track progress, and collaborate seamlessly. Our platform helps educators and students organize course materials efficiently.
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn-primary">Browse Syllabi</Link>
            <Link to="/about" className="btn-secondary">How It Works</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Educational Resources" />
        </div>
      </section>
    </div>
  );
};

export default Home;