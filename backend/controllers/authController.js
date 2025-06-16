const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Login handler
const loginUser = async (req, res) => {
  try {
    console.log('\n=== LOGIN ATTEMPT ===');
    console.log('Request body:', req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("Plain password from form:", password);
    console.log("Hashed password from DB:", user.password);

    const testHash = await bcrypt.hash("aashu03", 10);
    console.log("Generated hash for aashu03:", testHash);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
  

    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login successful');
    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Register handler
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, registerUser };
