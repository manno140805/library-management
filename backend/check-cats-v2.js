const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const books = await Book.find({}).populate('category');
  let result = "Books Summary:\n";
  const catCounts = {};
  
  books.forEach(b => {
    const catName = b.category ? b.category.name : 'NO CATEGORY';
    catCounts[catName] = (catCounts[catName] || 0) + 1;
    result += `- ${b.title} [${catName}]\n`;
  });
  
  console.log('Category Counts:', catCounts);
  
  // Also log the actual categories available in the db
  const cats = await Category.find({});
  console.log('Categories in DB:', cats.map(c => c.name));
  
  process.exit(0);
});
