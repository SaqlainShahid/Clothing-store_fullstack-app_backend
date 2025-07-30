const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser(); 