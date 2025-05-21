const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SalesData = require('./models/SalesData');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    return SalesData.insertMany([
      {
        date: new Date('2024-05-01'),
        shoeName: 'Nike Air Max',
        sales: 150,
        advertisingCost: 5000,
        impressions: 30000,
        clicks: 2000
      },
      {
        date: new Date('2024-05-01'),
        shoeName: 'Adidas Ultraboost',
        sales: 120,
        advertisingCost: 4500,
        impressions: 28000,
        clicks: 1700
      },
      {
        date: new Date('2024-05-02'),
        shoeName: 'Nike Air Max',
        sales: 180,
        advertisingCost: 5500,
        impressions: 31000,
        clicks: 2200
      },
      {
        date: new Date('2024-05-02'),
        shoeName: 'Puma RS-X',
        sales: 90,
        advertisingCost: 3000,
        impressions: 22000,
        clicks: 1300
      }
    ]);
  })
  .then(() => {
    console.log('Sample data inserted ✅');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting sample data ❌:', err);
    mongoose.disconnect();
  });
