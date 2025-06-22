const express = require('express');
const router = express.Router();

// ✅ Import both login and register handlers from controller
const { loginUser, registerUser } = require('../controllers/authController');

// ✅ Route for logging in
router.post('/login', loginUser);

// ✅ Route for registering a new user
router.post('/register', registerUser);

router.get('/debug/users', async (req, res) => {
  console.log("🔎 Fetching users from DB:", mongoose.connection.name);
  const users = await User.find();
  res.json(users);
});


module.exports = router;
