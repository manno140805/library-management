const express = require('express');
const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reports (admin only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  try {
    const totalBooks = await Book.countDocuments();
    const totalMembers = await User.countDocuments({ role: 'user' });
    const issuedBooks = await BorrowRecord.countDocuments({ status: 'borrowed' });
    const overdueBooks = await BorrowRecord.countDocuments({ status: 'overdue' });
    res.json({ totalBooks, totalMembers, issuedBooks, overdueBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;