const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for checking all books');

  try {
    // Get all categories
    const categories = await Category.find({});
    console.log('Categories:');
    categories.forEach(cat => {
      console.log(`- ${cat.name}: ${cat._id}`);
    });

    // Check books in each category
    for (const category of categories) {
      const books = await Book.find({ category: category._id });
      console.log(`\n${category.name} (${books.length} books):`);
      books.forEach((book, index) => {
        console.log(`  ${index + 1}. ${book.title} by ${book.author} (ISBN: ${book.isbn})`);
      });
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