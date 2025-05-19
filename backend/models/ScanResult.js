const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  diagnosis: String,
  imageUrl: String
});

module.exports = mongoose.model('ScanResult', scanResultSchema);

