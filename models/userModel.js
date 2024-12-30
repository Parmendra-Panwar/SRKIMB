const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  orders: [{ item: String, quantity: Number }],
});

module.exports = mongoose.model('User', userSchema);
