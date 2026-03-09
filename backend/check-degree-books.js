const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for checking books');

  try {
    // Find Degree College Books category
    const degreeCategory = await Category.findOne({ name: 'Degree College Books' });
    if (!degreeCategory) {
      console.log('Degree College Books category not found');
      return;
    }

    console.log(`Degree College Books category ID: ${degreeCategory._id}`);

    // Find all books in Degree College Books category
    const books = await Book.find({ category: degreeCategory._id });

    console.log(`\nBooks in Degree College Books category (${books.length} total):`);
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title} by ${book.author} (ISBN: ${book.isbn}) - Available: ${book.availableCopies}/${book.totalCopies}`);
    });

    if (books.length === 0) {
      console.log('No books found in Degree College Books category.');
    }

  } catch (error) {
    console.error('Error checking books:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});