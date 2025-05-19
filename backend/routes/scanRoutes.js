const express = require('express');
const { addScanResult, getScanResults } = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addScanResult);
router.get('/', authMiddleware, getScanResults);

module.exports = router;




