const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10);
    const newUser = new User({ email, username, password: hashedPassword, orders: [] });
    await newUser.save();

    // Track user in Admin users list
    const admin = await Admin.findOne();
    if (admin) {
      admin.users.push(newUser._id);
      await admin.save();
    }

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Authentication error' });
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login error' });
      res.status(200).json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};
