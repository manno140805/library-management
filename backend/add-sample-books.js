const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for adding sample books');

  try {
    // Ensure all categories exist
    const categories = [
      {
        name: 'Degree College Books',
        description: 'Academic books for subjects like Computer Science, Commerce, Mathematics, Economics, etc.'
      },
      {
        name: 'Fictional Books',
        description: 'Story-based books including novels, fantasy, mystery, romance, and adventure.'
      },
      {
        name: 'Motivational Books',
        description: 'Self-improvement and inspirational books that help readers develop confidence, positive thinking, productivity, and personal growth.'
      }
    ];

    const categoryMap = {};
    for (const cat of categories) {
      let category = await Category.findOne({ name: cat.name });
      if (!category) {
        category = await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        // Update description if different
        if (category.description !== cat.description) {
          category.description = cat.description;
          await category.save();
          console.log(`Updated category: ${cat.name}`);
        }
      }
      categoryMap[cat.name] = category._id;
    }

    // Sample books data
    const booksData = [
      // Degree College Books
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        category: categoryMap['Degree College Books'],
        isbn: '978-0262033848',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Comprehensive textbook covering algorithms and data structures with mathematical analysis.',
        publishedYear: 2009
      },
      {
        title: 'Data Structures and Algorithms in Java',
        author: 'Robert Lafore',
        category: categoryMap['Degree College Books'],
        isbn: '978-0672324536',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Master data structures and algorithms with Java examples.',
        publishedYear: 2002
      },
      {
        title: 'Operating System Concepts',
        author: 'Abraham Silberschatz',
        category: categoryMap['Degree College Books'],
        isbn: '978-1119800361',
        availableCopies: 3,
        totalCopies: 3,
        description: 'Fundamental concepts of operating systems including processes, memory management, and file systems.',
        publishedYear: 2020
      },
      {
        title: 'Computer Networks',
        author: 'Andrew S. Tanenbaum',
        category: categoryMap['Degree College Books'],
        isbn: '978-0132126953',
        availableCopies: 5,
        totalCopies: 5,
        description: 'Comprehensive guide to computer networking principles and protocols.',
        publishedYear: 2010
      },
      {
        title: 'Database System Concepts',
        author: 'Henry F. Korth',
        category: categoryMap['Degree College Books'],
        isbn: '978-0073523323',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Foundations of database systems including relational model, SQL, and transaction management.',
        publishedYear: 2014
      },
      {
        title: 'Software Engineering',
        author: 'Ian Sommerville',
        category: categoryMap['Degree College Books'],
        isbn: '978-0137035151',
        availableCopies: 3,
        totalCopies: 3,
        description: 'Principles and practices of software engineering including requirements, design, and testing.',
        publishedYear: 2010
      },
      {
        title: 'Artificial Intelligence: A Modern Approach',
        author: 'Stuart Russell',
        category: categoryMap['Degree College Books'],
        isbn: '978-0136042594',
        availableCopies: 2,
        totalCopies: 2,
        description: 'Comprehensive introduction to artificial intelligence concepts and algorithms.',
        publishedYear: 2009
      },
      {
        title: 'Computer Organization and Design',
        author: 'David A. Patterson',
        category: categoryMap['Degree College Books'],
        isbn: '978-0124077263',
        availableCopies: 3,
        totalCopies: 3,
        description: 'Computer architecture and organization including processors, memory, and I/O systems.',
        publishedYear: 2013
      },

      // Fictional Books
      {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        category: categoryMap['Fictional Books'],
        isbn: '978-0439708180',
        availableCopies: 6,
        totalCopies: 6,
        description: 'A young wizard discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.',
        publishedYear: 1997
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: categoryMap['Fictional Books'],
        isbn: '978-0547928227',
        availableCopies: 5,
        totalCopies: 5,
        description: 'Bilbo Baggins embarks on an unexpected journey with dwarves to reclaim treasure from Smaug.',
        publishedYear: 1937
      },
      {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        category: categoryMap['Fictional Books'],
        isbn: '978-0439023481',
        availableCopies: 4,
        totalCopies: 4,
        description: 'In a dystopian future, Katniss volunteers for the Hunger Games to save her sister.',
        publishedYear: 2008
      },
      {
        title: 'Sherlock Holmes: The Complete Novels',
        author: 'Arthur Conan Doyle',
        category: categoryMap['Fictional Books'],
        isbn: '978-0553212419',
        availableCopies: 3,
        totalCopies: 3,
        description: 'Complete collection of Sherlock Holmes novels featuring the famous detective.',
        publishedYear: 1986
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        category: categoryMap['Fictional Books'],
        isbn: '978-0061122415',
        availableCopies: 5,
        totalCopies: 5,
        description: 'A shepherd boy follows his dreams on a journey of self-discovery.',
        publishedYear: 1988
      },
      {
        title: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
        category: categoryMap['Fictional Books'],
        isbn: '978-0066238501',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Magical adventures in the land of Narnia through the wardrobe.',
        publishedYear: 1950
      },
      {
        title: 'Percy Jackson and the Lightning Thief',
        author: 'Rick Riordan',
        category: categoryMap['Fictional Books'],
        isbn: '978-0786838653',
        availableCopies: 5,
        totalCopies: 5,
        description: 'A modern demigod discovers his heritage and battles mythological creatures.',
        publishedYear: 2005
      },
      {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        category: categoryMap['Fictional Books'],
        isbn: '978-0307474278',
        availableCopies: 4,
        totalCopies: 4,
        description: 'A symbologist and cryptologist unravel secrets hidden in Da Vinci\'s works.',
        publishedYear: 2003
      },

      // Motivational Books
      {
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        category: categoryMap['Motivational Books'],
        isbn: '978-0449214923',
        availableCopies: 5,
        totalCopies: 5,
        description: 'Classic guide to achieving success through positive thinking and goal setting.',
        publishedYear: 1937
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        category: categoryMap['Motivational Books'],
        isbn: '978-0735211292',
        availableCopies: 6,
        totalCopies: 6,
        description: 'Practical guide to building good habits and breaking bad ones for lasting change.',
        publishedYear: 2018
      },
      {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        category: categoryMap['Motivational Books'],
        isbn: '978-1612680194',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Lessons on financial literacy and building wealth from different perspectives.',
        publishedYear: 1997
      },
      {
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey',
        category: categoryMap['Motivational Books'],
        isbn: '978-0743269516',
        availableCopies: 5,
        totalCopies: 5,
        description: 'Timeless principles for personal and professional effectiveness.',
        publishedYear: 1989
      },
      {
        title: 'The Power of Positive Thinking',
        author: 'Norman Vincent Peale',
        category: categoryMap['Motivational Books'],
        isbn: '978-0743234804',
        availableCopies: 3,
        totalCopies: 3,
        description: 'How to develop a positive mental attitude for success and happiness.',
        publishedYear: 1952
      },
      {
        title: 'You Can Win',
        author: 'Shiv Khera',
        category: categoryMap['Motivational Books'],
        isbn: '978-9382951710',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Motivational guide to achieving success through attitude and action.',
        publishedYear: 1998
      },
      {
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        category: categoryMap['Motivational Books'],
        isbn: '978-0062457714',
        availableCopies: 5,
        totalCopies: 5,
        description: 'Counterintuitive approach to living a good life by embracing life\'s imperfections.',
        publishedYear: 2016
      },
      {
        title: 'Wings of Fire',
        author: 'A.P.J. Abdul Kalam',
        category: categoryMap['Motivational Books'],
        isbn: '978-8173711466',
        availableCopies: 4,
        totalCopies: 4,
        description: 'Autobiography of India\'s missile man inspiring readers to pursue their dreams.',
        publishedYear: 1999
      }
    ];

    let addedCount = 0;
    let skippedCount = 0;

    for (const bookData of booksData) {
      // Check if book already exists (by title and author)
      const existingBook = await Book.findOne({
        title: bookData.title,
        author: bookData.author
      });

      if (!existingBook) {
        await Book.create(bookData);
        console.log(`Added: ${bookData.title} by ${bookData.author}`);
        addedCount++;
      } else {
        console.log(`Skipped (already exists): ${bookData.title} by ${bookData.author}`);
        skippedCount++;
      }
    }

    console.log(`\nSeeding completed. Added ${addedCount} books, skipped ${skippedCount} duplicates.`);

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});