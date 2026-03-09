const mongoose = require('mongoose');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected for category update');

  try {
    // Remove the old Motivational Books category
    const deleted = await Category.findOneAndDelete({ name: 'Motivational Books' });
    if (deleted) {
      console.log('Removed category: Motivational Books');
    } else {
      console.log('Motivational Books category not found');
    }

    // Update existing categories with new descriptions
    const updates = [
      {
        name: 'Degree College Books',
        description: 'Academic books for subjects like Computer Science, Commerce, Mathematics, Economics, etc.'
      },
      {
        name: 'Fictional Books',
        description: 'Story-based books including novels, fantasy, mystery, romance, and adventure.'
      }
    ];

    for (const update of updates) {
      const result = await Category.findOneAndUpdate(
        { name: update.name },
        { description: update.description },
        { new: true }
      );
      if (result) {
        console.log(`Updated category: ${update.name}`);
      }
    }

    // Add new Computer Courses category
    const existingComputerCourses = await Category.findOne({ name: 'Computer Courses' });
    if (!existingComputerCourses) {
      const newCategory = await Category.create({
        name: 'Computer Courses',
        description: 'Books and resources to improve coding, programming, and technical skills such as Python, Java, Web Development, Data Structures, and other computer science topics.'
      });
      console.log(`Created category: ${newCategory.name}`);
    } else {
      console.log('Computer Courses category already exists');
    }

    console.log('Category update completed successfully');
  } catch (error) {
    console.error('Error updating categories:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});