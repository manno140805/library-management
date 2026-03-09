const mongoose = require('mongoose');
const Book = require('./models/Book');
const Category = require('./models/Category');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  try {
    const catsList = await Category.find({});
    
    // Check all books
    const allBooks = await Book.find({}).populate('category');
    console.log(`Found ${allBooks.length} books in total.`);
    
    let computerCat = catsList.find(c => c.name === 'Computer Courses');
    let fictionCat = catsList.find(c => c.name === 'Fiction');
    let motivationalCat = catsList.find(c => c.name === 'Motivational');

    for (const book of allBooks) {
      if (!book.category) {
        // Book's category field is invalid (points to deleted category) or null
        const textToSearch = (book.title + ' ' + (book.description || '')).toLowerCase();
        
        // Let's use more comprehensive keywords
        // Computer
        if (textToSearch.match(/algorithm|java|operating system|computer|database|software|artificial intelligence|programming|networking|web development|data structure/i)) {
          book.category = computerCat._id;
        }
        // Fiction
        else if (textToSearch.match(/harry potter|wizard|hobbit|hunger games|sherlock|detective|alchemist|narnia|percy jackson|da vinci|fictional|novel|story/i)) {
          book.category = fictionCat._id;
        }
        // Motivational
        else if (textToSearch.match(/think and grow rich|atomic habits|poor dad|highly effective|positive thinking|you can win|giving a f\*ck|wings of fire|motivational|self-help|success|habit|wealth|mark manson|shiv khera/i)) {
          book.category = motivationalCat._id;
        }
        else {
           console.log("Unmatched text for category assignment:", book.title);
           // Put everything else in fiction for testing or leave null
           book.category = fictionCat._id;
        }
        
        await Book.updateOne({ _id: book._id }, { category: book.category });
        console.log(`Assigned '${book.title}' -> ${book.category}`);
      }
    }
    
    const finalBooks = await Book.find({}).populate('category');
    finalBooks.forEach((b) => {
        console.log(`Book: ${b.title} -> ${b.category?.name}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
