const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for book cleanup and reorganization');

  try {
    // Get all categories
    const degreeCategory = await Category.findOne({ name: 'Degree College Books' });
    const fictionCategory = await Category.findOne({ name: 'Fictional Books' });
    const motivationalCategory = await Category.findOne({ name: 'Motivational Books' });

    if (!degreeCategory || !fictionCategory || !motivationalCategory) {
      console.log('One or more categories not found');
      return;
    }

    console.log('Cleaning up Degree College Books...');

    // Books to keep in Degree College Books (Computer Science only)
    const degreeBooksToKeep = [
      'Introduction to Algorithms',
      'Data Structures and Algorithms in Java',
      'Operating System Concepts',
      'Computer Networks',
      'Database System Concepts',
      'Software Engineering',
      'Artificial Intelligence: A Modern Approach',
      'Computer Organization and Design'
    ];

    // Remove books from Degree College Books that are not in the keep list
    const allDegreeBooks = await Book.find({ category: degreeCategory._id });
    for (const book of allDegreeBooks) {
      if (!degreeBooksToKeep.includes(book.title)) {
        await Book.findByIdAndDelete(book._id);
        console.log(`Removed from Degree College Books: ${book.title}`);
      }
    }

    console.log('Cleaning up Fictional Books...');

    // Books to keep in Fictional Books
    const fictionBooksToKeep = [
      'Harry Potter and the Sorcerer\'s Stone',
      'The Hobbit',
      'The Hunger Games',
      'Sherlock Holmes: The Complete Novels',
      'The Chronicles of Narnia',
      'Percy Jackson and the Lightning Thief',
      'The Da Vinci Code'
    ];

    // Remove books from Fictional Books that are not in the keep list
    const allFictionBooks = await Book.find({ category: fictionCategory._id });
    for (const book of allFictionBooks) {
      if (!fictionBooksToKeep.includes(book.title)) {
        await Book.findByIdAndDelete(book._id);
        console.log(`Removed from Fictional Books: ${book.title}`);
      }
    }

    console.log('Cleaning up Motivational Books...');

    // Books to keep in Motivational Books
    const motivationalBooksToKeep = [
      'Think and Grow Rich',
      'Atomic Habits',
      'Rich Dad Poor Dad',
      'The 7 Habits of Highly Effective People',
      'The Power of Positive Thinking',
      'You Can Win',
      'Wings of Fire'
    ];

    // Remove books from Motivational Books that are not in the keep list
    const allMotivationalBooks = await Book.find({ category: motivationalCategory._id });
    for (const book of allMotivationalBooks) {
      if (!motivationalBooksToKeep.includes(book.title)) {
        await Book.findByIdAndDelete(book._id);
        console.log(`Removed from Motivational Books: ${book.title}`);
      }
    }

    console.log('Book cleanup and reorganization completed successfully.');

    // Verify final counts
    const finalDegreeBooks = await Book.find({ category: degreeCategory._id });
    const finalFictionBooks = await Book.find({ category: fictionCategory._id });
    const finalMotivationalBooks = await Book.find({ category: motivationalCategory._id });

    console.log(`\nFinal counts:`);
    console.log(`Degree College Books: ${finalDegreeBooks.length} books`);
    console.log(`Fictional Books: ${finalFictionBooks.length} books`);
    console.log(`Motivational Books: ${finalMotivationalBooks.length} books`);

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});