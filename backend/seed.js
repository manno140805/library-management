const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for seeding');

  // Create main categories
  const categories = [
    { 
      name: 'Degree College Books', 
      description: 'Academic books used by degree college students such as Computer Science, Commerce, Mathematics, Economics, and other syllabus-related textbooks.'
    },
    { 
      name: 'Fictional Books', 
      description: 'Story-based books including novels, fantasy, mystery, romance, and adventure that are written for entertainment and imagination.'
    },
    { 
      name: 'Motivational Books', 
      description: 'Self-improvement and inspirational books that help readers develop confidence, positive thinking, productivity, and personal growth.'
    }
  ];

  const categoryMap = {};
  for (const cat of categories) {
    const existing = await Category.findOne({ name: cat.name });
    if (!existing) {
      const created = await Category.create(cat);
      categoryMap[cat.name] = created._id;
      console.log(`Created category: ${cat.name}`);
    } else {
      categoryMap[cat.name] = existing._id;
    }
  }

  // Sample books for each category
  const books = [
    // Degree College Books - Computer Science
    {
      title: 'Head First Java',
      author: 'Kathy Sierra & Bert Bates',
      isbn: '978-0596009205',
      category: categoryMap['Degree College Books'],
      availableCopies: 5,
      totalCopies: 5,
      description: 'Learn Java programming with visual approach.',
      publishedYear: 2005
    },
    {
      title: 'Python Crash Course',
      author: 'Eric Matthes',
      isbn: '978-1593275906',
      category: categoryMap['Degree College Books'],
      availableCopies: 6,
      totalCopies: 6,
      description: 'A comprehensive guide to Python programming for beginners.',
      publishedYear: 2015
    },
    {
      title: 'Data Structures and Algorithms in Java',
      author: 'Robert Lafore',
      isbn: '978-0672324536',
      category: categoryMap['Degree College Books'],
      availableCopies: 4,
      totalCopies: 4,
      description: 'Master data structures and algorithms with Java examples.',
      publishedYear: 2002
    },
    {
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan & Dennis M. Ritchie',
      isbn: '978-0131103627',
      category: categoryMap['Degree College Books'],
      availableCopies: 3,
      totalCopies: 3,
      description: 'The definitive guide to the C programming language.',
      publishedYear: 1988
    },
    {
      title: 'Web Development with HTML, CSS, and JavaScript',
      author: 'Jon Duckett',
      isbn: '978-1118871271',
      category: categoryMap['Degree College Books'],
      availableCopies: 5,
      totalCopies: 5,
      description: 'Learn to build interactive web applications.',
      publishedYear: 2014
    },

    // Fictional Books
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      category: categoryMap['Fictional Books'],
      availableCopies: 6,
      totalCopies: 6,
      description: 'A classic novel of the Jazz Age and the American Dream.',
      publishedYear: 1925
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '978-0547928227',
      category: categoryMap['Fictional Books'],
      availableCopies: 5,
      totalCopies: 5,
      description: 'An epic fantasy adventure in a magical world.',
      publishedYear: 1937
    },
    {
      title: 'Mystery of the Blue Diamond',
      author: 'Agatha Christie',
      isbn: '978-0062073556',
      category: categoryMap['Fictional Books'],
      availableCopies: 4,
      totalCopies: 4,
      description: 'A thrilling mystery novel with unexpected twists.',
      publishedYear: 1928
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '978-0141439518',
      category: categoryMap['Fictional Books'],
      availableCopies: 5,
      totalCopies: 5,
      description: 'A timeless romance novel set in Regency England.',
      publishedYear: 1813
    },

    // Motivational Books
    {
      title: 'Dreams Don\'t Have Deadlines',
      author: 'Ratan Tata',
      isbn: '978-0670093626',
      category: categoryMap['Motivational Books'],
      availableCopies: 5,
      totalCopies: 5,
      description: 'A collection of inspiring thoughts and life lessons by Ratan Tata.',
      publishedYear: 2020
    },
    {
      title: 'Ignited Minds',
      author: 'APJ Abdul Kalam',
      isbn: '978-0140280494',
      category: categoryMap['Motivational Books'],
      availableCopies: 3,
      totalCopies: 3,
      description: 'Inspiring young minds to achieve their dreams and aspirations.',
      publishedYear: 2002
    },
    {
      title: 'Wings of Fire',
      author: 'APJ Abdul Kalam',
      isbn: '978-8173711466',
      category: categoryMap['Motivational Books'],
      availableCopies: 4,
      totalCopies: 4,
      description: 'Autobiography of a visionary leader and great scientist.',
      publishedYear: 1999
    },
    {
      title: 'The Z Factor',
      author: 'Sandeep Maheshwari',
      isbn: '978-9384061922',
      category: categoryMap['Motivational Books'],
      availableCopies: 6,
      totalCopies: 6,
      description: 'Practical principles for achieving success and happiness.',
      publishedYear: 2018
    }
  ];

  for (const book of books) {
    const existing = await Book.findOne({ isbn: book.isbn });
    if (!existing) {
      await Book.create(book);
      console.log(`Added book: ${book.title} by ${book.author}`);
    }
  }

  console.log('Seeding completed successfully!');
  process.exit();
})
.catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});