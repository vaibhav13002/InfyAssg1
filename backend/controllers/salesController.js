// backend/controllers/salesController.js
const Sale = require('../models/SalesData');

const getDailyMetricsByShoe = async (req, res) => {
    console.log("GET /daily called with query:", req.query);
  try {
    const { startDate, endDate, shoeName } = req.query;

    const data = await Sale.aggregate([
      {
        $match: {
          date: { $gte: new Date(startDate), $lte: new Date(endDate) },
          shoeName,
        },
      },
      {
        $group: {
          _id: "$date",
          totalSales: { $sum: "$sales" },
          totalAdvertisingCost: { $sum: "$advertisingCost" },
          totalImpressions: { $sum: "$impressions" },
          totalClicks: { $sum: "$clicks" },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting daily data", error });
  }
};

const getUniqueShoeNames = async (req, res) => {
  try {
    const shoeNames = await Sale.distinct("shoeName");
    res.json(shoeNames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shoes", error });
  }
};

// const Sale = require('../models/SalesData');

const getSummaryMetrics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const data = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$sales" },
          totalAdvertisingCost: { $sum: "$advertisingCost" },
          totalImpressions: { $sum: "$impressions" },
          totalClicks: { $sum: "$clicks" },
        },
      },
    ]);

    if (data.length > 0) {
      res.json(data[0]); // send a flat object
    } else {
      res.json({
        totalSales: 0,
        totalAdvertisingCost: 0,
        totalImpressions: 0,
        totalClicks: 0,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error });
  }
};



// ✅ Correct final export
module.exports = {
  getDailyMetricsByShoe,
  getUniqueShoeNames,
  getSummaryMetrics, // 👈 Don't forget this
};