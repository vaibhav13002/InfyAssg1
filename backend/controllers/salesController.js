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

// --- NEW FUNCTION FOR THE DATA TABLE (with $ifNull for robustness) ---
const getSummaryMetricsByShoe = async (req, res) => {
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
                    _id: "$shoeName", // Group by shoeName
                    // Use $ifNull to ensure 0 if field is missing or null
                    totalSales: { $sum: { $ifNull: ["$sales", 0] } },
                    totalAdvertisingCost: { $sum: { $ifNull: ["$advertisingCost", 0] } },
                    totalImpressions: { $sum: { $ifNull: ["$impressions", 0] } },
                    totalClicks: { $sum: { $ifNull: ["$clicks", 0] } },
                },
            },
            {
                $project: { // Reshape the output to match frontend expectation
                    _id: 0, // Exclude _id
                    shoeName: "$_id", // Rename _id to shoeName
                    totalSales: 1,
                    totalAdvertisingCost: 1,
                    totalImpressions: 1,
                    totalClicks: 1,
                },
            },
            { $sort: { shoeName: 1 } } // Sort by shoe name
        ]);

        res.json(data); // This will be an array of objects, one for each shoe
    } catch (error) {
        console.error("Error in getSummaryMetricsByShoe:", error);
        res.status(500).json({ message: "Error fetching summary by shoe", error });
    }
};

// ✅ Correct final export - make sure getSummaryMetricsByShoe is also exported
module.exports = {
    getDailyMetricsByShoe,
    getUniqueShoeNames,
    getSummaryMetrics,
    getSummaryMetricsByShoe, // 👈 Export this function
};