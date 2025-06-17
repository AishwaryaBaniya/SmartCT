const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const scanRoutes = require('./routes/scanRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['http://localhost:3000', 'http://localhost:3003'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/scans', scanRoutes);
app.use('/api/auth', authRoutes);

// Start Server after MongoDB connects
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

