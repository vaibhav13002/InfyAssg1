const mongoose = require('mongoose');

const salesDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  shoeName: {
    type: String,
    required: true
  },
  sales: {
    type: Number,
    required: true
  },
  advertisingCost: {
    type: Number,
    required: true
  },
  impressions: {
    type: Number,
    required: true
  },
  clicks: {
    type: Number,
    required: true
  }
});

const SalesData = mongoose.model('SalesData', salesDataSchema);

module.exports = SalesData;
