const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ✅ Login handler (no bcrypt)
const loginUser = async (req, res) => {
  try {
    console.log('\n=== LOGIN ATTEMPT ===');
    console.log('Request body:', req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("✅ Plain password from form:", password);
    console.log("🗃️ Stored password in DB:", user.password);

    const isMatch = bcrypt.compare(password, user.password)
    console.log("🟢 Password match:", isMatch);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('✅ Login successful');
    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Register handler (no bcrypt)
const registerUser = async (req, res) => {
  try {
    console.log('\n=== REGISTERING USER ===');

    const { email, password } = req.body;
    console.log("📧 Email:", email);
    console.log("🔓 Plain password:", JSON.stringify(password));

    const exists = await User.findOne({ email });
    if (exists) {
      console.log('❌ User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log(password)
    const newUser = new User({ email, password }); // saving plain text password
    await newUser.save();
    console.log('✅ User saved:', newUser);

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('✅ User registered successfully');
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser._id, email: newUser.email },
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, registerUser };
