const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for book cleanup');

  try {
    // Find Degree College Books category
    const degreeCategory = await Category.findOne({ name: 'Degree College Books' });
    if (!degreeCategory) {
      console.log('Degree College Books category not found');
      return;
    }

    // Books to remove from Degree College Books category
    const booksToRemove = [
      { title: 'Dreams Don\'t Have Deadlines', author: 'Ratan Tata' },
      { title: 'Ignited Minds', author: 'APJ Abdul Kalam' },
      { title: 'Wings of Fire', author: 'APJ Abdul Kalam' },
      { title: 'The Z Factor', author: 'Sandeep Maheshwari' },
      { title: 'Discover Your Destiny', author: 'Sandeep Maheshwari' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
      { title: 'Mystery of the Blue Diamond', author: 'Agatha Christie' },
      { title: 'Pride and Prejudice', author: 'Jane Austen' }
    ];

    let removedCount = 0;
    for (const bookInfo of booksToRemove) {
      const deleted = await Book.findOneAndDelete({
        title: bookInfo.title,
        author: bookInfo.author,
        category: degreeCategory._id
      });
      if (deleted) {
        console.log(`Removed book: ${bookInfo.title} by ${bookInfo.author}`);
        removedCount++;
      } else {
        console.log(`Book not found: ${bookInfo.title} by ${bookInfo.author}`);
      }
    }

    console.log(`Cleanup completed. Removed ${removedCount} books from Degree College Books category.`);

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});