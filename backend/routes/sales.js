const express = require("express");
const router = express.Router();
const Sale = require("../models/SalesData"); // Adjust path to your model

// GET /api/sales/daily?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get("/daily", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const sales = await Sale.aggregate([
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
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          totalSales: { $sum: "$totalSales" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json(sales);
  } catch (err) {
    console.error("Error in /daily route:", err);
    res.status(500).json({ error: "Server error fetching daily sales" });
  }
});

module.exports = router;
