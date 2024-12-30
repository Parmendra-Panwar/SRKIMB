const express = require('express');
const { checkSession } = require('../controllers/sessionController');

const router = express.Router();

// Route to check user session
router.get('/', checkSession);

// Route to logout user
// router.get('/logout', logoutUser);

module.exports = router;
