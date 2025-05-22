const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SalesData = require('./models/SalesData');

dotenv.config();

// Helper to generate random int in range
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shoe names to sample
const shoes = [
  'Nike Air Max',
  'Adidas Ultraboost',
  'Puma RS-X',
  'Reebok Classic',
  'New Balance 990',
  'ASICS Gel-Kayano',
  'Converse Chuck Taylor',
  'Vans Old Skool'
];

// Generate data for each month from Jan 2024 to June 2025
const start = new Date('2024-01-01');
const end = new Date('2025-06-01');
const data = [];
for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
  for (const shoe of shoes) {
    data.push({
      date: new Date(d),
      shoeName: shoe,
      sales: randInt(80, 250),
      advertisingCost: randInt(2000, 7000),
      impressions: randInt(15000, 40000),
      clicks: randInt(800, 3000)
    });
  }
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    return SalesData.deleteMany({}); // Clear old data
  })
  .then(() => SalesData.insertMany(data))
  .then(() => {
    console.log('Sample data inserted ✅');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting sample data ❌:', err);
    mongoose.disconnect();
  });
