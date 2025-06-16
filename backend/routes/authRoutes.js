const express = require('express');
const router = express.Router();

// ✅ Import both login and register handlers from controller
const { loginUser, registerUser } = require('../controllers/authController');

// ✅ Route for logging in
router.post('/login', loginUser);

// ✅ Route for registering a new user
router.post('/register', registerUser);

module.exports = router;
