const express = require('express');
const router = express.Router();
const SalesData = require('../models/SalesData');
const {
  getDailyMetricsByShoe,
  getUniqueShoeNames,
  getSummaryMetrics
} = require('../controllers/salesController');

// 👇 Add this
router.get('/summary', getSummaryMetrics);

// 👇 Already existing
router.get('/daily', getDailyMetricsByShoe);
router.get('/shoes', getUniqueShoeNames);

module.exports = router;
