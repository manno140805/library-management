const fs = require('fs');
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
  
  result += '\nCategory Counts:\n' + JSON.stringify(catCounts, null, 2);
  
  const cats = await Category.find({});
  result += '\n\nCategories in DB:\n' + JSON.stringify(cats.map(c => c.name), null, 2);
  
  fs.writeFileSync('db-dump.txt', result, 'utf8');
  console.log('Done writing db-dump.txt');
  process.exit(0);
});
