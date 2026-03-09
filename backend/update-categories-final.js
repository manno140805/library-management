const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected for updating categories');

  try {
    // 1. Create or Find the desired categories
    const categoriesToEnsure = [
      { name: 'Computer Courses', description: 'Books related to computer courses such as programming, databases, networking, operating systems, web development, etc.' },
      { name: 'Fiction', description: 'Fictional novels and stories.' },
      { name: 'Motivational', description: 'Motivational and self-help books.' }
    ];

    const categoryMap = {};
    for (const catData of categoriesToEnsure) {
      let cat = await Category.findOne({ name: catData.name });
      if (!cat) {
        cat = await Category.create(catData);
      } else {
        cat.description = catData.description;
        await cat.save();
      }
      categoryMap[catData.name] = cat._id;
    }

    // 2. Fetch all books and reassign categories based on title/description keywords
    const books = await Book.find({});
    let updatedBooks = 0;

    for (const book of books) {
      const textToSearch = (book.title + ' ' + book.description).toLowerCase();
      
      let assignedCategory = null;

      // Rule: Computer Courses
      if (
        textToSearch.includes('algorithm') ||
        textToSearch.includes('java') ||
        textToSearch.includes('operating system') ||
        textToSearch.includes('computer') ||
        textToSearch.includes('database') ||
        textToSearch.includes('software') ||
        textToSearch.includes('artificial intelligence') ||
        textToSearch.includes('programming') ||
        textToSearch.includes('networking') ||
        textToSearch.includes('web development')
      ) {
        assignedCategory = categoryMap['Computer Courses'];
      }
      // Rule: Fiction
      else if (
        textToSearch.includes('wizard') ||
        textToSearch.includes('hobbit') ||
        textToSearch.includes('hunger games') ||
        textToSearch.includes('sherlock') ||
        textToSearch.includes('detective') ||
        textToSearch.includes('alchemist') ||
        textToSearch.includes('narnia') ||
        textToSearch.includes('percy jackson') ||
        textToSearch.includes('da vinci') ||
        textToSearch.includes('fictional') ||
        textToSearch.includes('novel') ||
        textToSearch.includes('story') ||
        textToSearch.includes('stories')
      ) {
        assignedCategory = categoryMap['Fiction'];
      }
      // Rule: Motivational
      else if (
        textToSearch.includes('think and grow rich') ||
        textToSearch.includes('atomic habits') ||
        textToSearch.includes('poor dad') ||
        textToSearch.includes('highly effective') ||
        textToSearch.includes('positive thinking') ||
        textToSearch.includes('you can win') ||
        textToSearch.includes('giving a f*ck') ||
        textToSearch.includes('wings of fire') ||
        textToSearch.includes('motivational') ||
        textToSearch.includes('self-help') ||
        textToSearch.includes('success') ||
        textToSearch.includes('habit') ||
        textToSearch.includes('wealth')
      ) {
        assignedCategory = categoryMap['Motivational'];
      }

      // Fallback fallback parsing if not caught by exact names above
      if (!assignedCategory) {
         // Default fallback based on existing category name parsing if we could
         // but all standard seeded books should be caught above.
      }

      if (assignedCategory && String(book.category) !== String(assignedCategory)) {
        book.category = assignedCategory;
        await book.save();
        updatedBooks++;
      }
    }
    console.log(`Updated ${updatedBooks} books to correct categories.`);

    // 3. Delete old/unwanted categories (like "Degree College Books", "Fictional Books", "Motivational Books")
    const validCategoryIds = Object.values(categoryMap).map(id => String(id));
    const allCategories = await Category.find({});
    
    let deletedCategories = 0;
    for (const cat of allCategories) {
      if (!validCategoryIds.includes(String(cat._id))) {
        await Category.deleteOne({ _id: cat._id });
        console.log(`Deleted old category: ${cat.name}`);
        deletedCategories++;
      }
    }
    
    console.log(`Deleted ${deletedCategories} old categories.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
});
