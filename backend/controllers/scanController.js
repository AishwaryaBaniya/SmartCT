const ScanResult = require('../models/ScanResult');

const addScanResult = async (req, res) => {
  try {
    const scan = new ScanResult({
      ...req.body,
      user: req.userId  // Link scan to logged-in user
    });

    await scan.save();
    res.status(201).json({ message: 'Scan saved successfully', scan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getScanResults = async (req, res) => {
  try {
    const scans = await ScanResult.find({ user: req.userId }); // Only user’s scans
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addScanResult, getScanResults };

