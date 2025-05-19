const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const scanRoutes = require('./routes/scanRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3003',  // or whichever port your React app is running on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));




app.use(express.json());

// Routes
app.use('/api/scans', scanRoutes);
app.use('/api/auth', authRoutes);

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

