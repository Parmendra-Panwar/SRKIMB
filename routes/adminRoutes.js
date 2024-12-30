const express = require('express');
const { login } = require('../controllers/authController'); // Ensure correct path

const router = express.Router();

// Login route
router.post('/login', login);
router.get("/hi", (req, res) => {
  res.send("hi")
})
module.exports = router;
