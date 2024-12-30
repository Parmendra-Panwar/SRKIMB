const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel'); // Ensure correct path

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Both username and password are required' });
  }

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username }).populate('users');

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // If login is successful, return admin data with users
    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        username: admin.username,
        users: admin.users,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};
