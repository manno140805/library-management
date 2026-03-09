import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import Categories from './pages/Categories';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BookManagement from './pages/BookManagement';
import MemberManagement from './pages/MemberManagement';
import IssueReturn from './pages/IssueReturn';
import Reports from './pages/Reports';
import UserDashboard from './pages/UserDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<BookManagement />} />
          <Route path="/admin/members" element={<MemberManagement />} />
          <Route path="/admin/issue-return" element={<IssueReturn />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;