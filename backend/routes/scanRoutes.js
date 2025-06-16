const express = require('express');
const { addScanResult, getScanResults } = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to add a scan result
router.post('/', authMiddleware, addScanResult);

// Protected route to fetch scan results
router.get('/', authMiddleware, getScanResults);

module.exports = router;



