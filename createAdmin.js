const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Admin model
const Admin = require('./models/adminModel'); // Adjust the path as needed

// Database connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Orhan')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create Admin Function
const createAdmin = async () => {
  const username = 'admin'; // Replace with your desired username
  const password = 'securepassword'; // Replace with your desired password

  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists. No need to create.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({ username, password: hashedPassword, users: [] });
    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
};

// Run the function
createAdmin();
