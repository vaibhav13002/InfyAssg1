const express = require('express');
const router = express.Router();
// const SalesData = require('../models/SalesData'); // No longer needed here if controllers handle model interaction
const {
    getDailyMetricsByShoe,
    getUniqueShoeNames,
    getSummaryMetrics,
    getSummaryMetricsByShoe // 👈 New: Import the new controller function
} = require('../controllers/salesController');

router.get('/summary', getSummaryMetrics);

router.get('/daily', getDailyMetricsByShoe);
router.get('/shoes', getUniqueShoeNames);

// 👇 Add this new route for the data table
router.get('/summary-by-shoe', getSummaryMetricsByShoe);

module.exports = router;