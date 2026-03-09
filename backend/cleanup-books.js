const mongoose = require('mongoose');
const Book = require('./models/Book');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for cleanup');

  // Remove old degree college books that are not Computer Science
  const oldBooks = [
    'Introduction to Algorithms',
    'Calculus: Early Transcendentals',
    'Principles of Economics',
    'Financial Accounting'
  ];

  for (const bookTitle of oldBooks) {
    const deleted = await Book.findOneAndDelete({ title: bookTitle });
    if (deleted) {
      console.log(`Deleted book: ${bookTitle}`);
    }
  }

  console.log('Cleanup completed successfully!');
  process.exit();
})
.catch(err => {
  console.error('Cleanup error:', err);
  process.exit(1);
});