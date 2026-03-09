const express = require('express');
const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Issue book
router.post('/issue', auth, async (req, res) => {
  const { bookId, dueDate } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book.availableCopies <= 0) return res.status(400).json({ error: 'Book not available' });
    const record = new BorrowRecord({ user: req.user.id, book: bookId, dueDate });
    await record.save();
    book.availableCopies -= 1;
    await book.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Return book
router.post('/return/:id', auth, async (req, res) => {
  try {
    const record = await BorrowRecord.findById(req.params.id);
    if (!record || record.user.toString() !== req.user.id) return res.status(403).json({ error: 'Access denied' });
    record.returnDate = new Date();
    record.status = 'returned';
    await record.save();
    const book = await Book.findById(record.book);
    book.availableCopies += 1;
    await book.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's borrow history
router.get('/history', auth, async (req, res) => {
  try {
    const records = await BorrowRecord.find({ user: req.user.id }).populate('book');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;