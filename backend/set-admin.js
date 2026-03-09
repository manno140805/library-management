const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB.');

  const adminEmail = 'admin@library.com';
  const adminPassword = 'admin'; // simple password for testing

  try {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    let adminUser = await User.findOne({ email: adminEmail });
    if (adminUser) {
      console.log('Admin user already exists. Updating password and ensuring admin role.');
      adminUser.password = hashedPassword;
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Admin user successfully updated.');
    } else {
      console.log('Admin user does not exist. Creating new admin user.');
      adminUser = new User({
        name: 'System Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user successfully created.');
    }
    
    console.log(`
--- ADMIN CREDENTIALS ---
Email: ${adminEmail}
Password: ${adminPassword}
-------------------------
`);

    process.exit(0);
  } catch (err) {
    console.error('Error setting up admin user:', err);
    process.exit(1);
  }
});
