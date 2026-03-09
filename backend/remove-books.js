const mongoose = require('mongoose');
const Book = require('./models/Book');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for removing specific books');

  try {
    // Books to remove completely from database
    const booksToRemove = [
      { title: 'Dreams Don\'t Have Deadlines', author: 'Ratan Tata', isbn: '978-0670093626' },
      { title: 'Ignited Minds', author: 'APJ Abdul Kalam', isbn: '978-0140280494' },
      { title: 'Wings of Fire', author: 'APJ Abdul Kalam', isbn: '978-8173711466' },
      { title: 'The Z Factor', author: 'Sandeep Maheshwari', isbn: '978-9384061922' },
      { title: 'Discover Your Destiny', author: 'Sandeep Maheshwari', isbn: '978-9384061939' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565' },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227' },
      { title: 'Mystery of the Blue Diamond', author: 'Agatha Christie', isbn: '978-0062073556' },
      { title: 'Pride and Prejudice', author: 'Jane Austen' } // Note: ISBN not provided in user message
    ];

    let removedCount = 0;
    for (const bookInfo of booksToRemove) {
      const query = { title: bookInfo.title, author: bookInfo.author };
      if (bookInfo.isbn) {
        query.isbn = bookInfo.isbn;
      }

      const deleted = await Book.findOneAndDelete(query);
      if (deleted) {
        console.log(`Removed book: ${bookInfo.title} by ${bookInfo.author}`);
        removedCount++;
      } else {
        console.log(`Book not found: ${bookInfo.title} by ${bookInfo.author}`);
      }
    }

    console.log(`\nRemoval completed. Removed ${removedCount} books from database.`);

  } catch (error) {
    console.error('Error during removal:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});