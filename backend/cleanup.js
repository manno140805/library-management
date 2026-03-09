const mongoose = require('mongoose');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for cleanup');

  // Delete old categories
  const oldCategories = ['Motivational', 'Biography', 'Self-Help', 'Computer Science', 'Mathematics', 'Commerce', 'Economics', 'Physics', 'English'];
  
  for (const catName of oldCategories) {
    const deleted = await Category.findOneAndDelete({ name: catName });
    if (deleted) {
      console.log(`Deleted category: ${catName}`);
    }
  }

  // Keep only the 3 main categories
  const mainCategories = [
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

  for (const cat of mainCategories) {
    const existing = await Category.findOne({ name: cat.name });
    if (!existing) {
      await Category.create(cat);
      console.log(`Created category: ${cat.name}`);
    } else {
      console.log(`Category already exists: ${cat.name}`);
    }
  }

  console.log('Cleanup completed successfully!');
  process.exit();
})
.catch(err => {
  console.error('Cleanup error:', err);
  process.exit(1);
});