const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const books = await Book.find({}).populate('category');
  let result = "Books Summary:\n";
  books.forEach(b => {
    result += `- ${b.title} [${b.category?.name}]\n`;
  });
  console.log(result);
  process.exit(0);
});
