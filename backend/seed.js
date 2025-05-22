// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const SalesData = require('./models/SalesData');

// dotenv.config();

// // Helper to generate random int in range
// function randInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// // Shoe names to sample
// const shoes = [
//   'Nike Air Max',
//   'Adidas Ultraboost',
//   'Puma RS-X',
//   'Reebok Classic',
//   'New Balance 990',
//   'ASICS Gel-Kayano',
//   'Converse Chuck Taylor',
//   'Vans Old Skool'
// ];

// // Generate data for each month from Jan 2024 to June 2025
// const start = new Date('2024-01-01');
// const end = new Date('2025-06-01');
// const data = [];
// for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
//   for (const shoe of shoes) {
//     data.push({
//       date: new Date(d),
//       shoeName: shoe,
//       sales: randInt(80, 250),
//       advertisingCost: randInt(2000, 7000),
//       impressions: randInt(15000, 40000),
//       clicks: randInt(800, 3000)
//     });
//   }
// }

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     return SalesData.deleteMany({}); // Clear old data
//   })
//   .then(() => SalesData.insertMany(data))
//   .then(() => {
//     console.log('Sample data inserted ✅');
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error('Error inserting sample data ❌:', err);
//     mongoose.disconnect();
//   });

// backend/seed.js
const mongoose = require('mongoose');
const SalesData = require('./models/SalesData'); // Adjust path as per your project structure
const dotenv = require('dotenv');
const clearSalesData = require('./DatabaseCleaner'); // Import the cleaner function

dotenv.config(); // Load environment variables

const SHOE_NAMES = [
  "Nike Air Max",
  "Adidas Ultraboost",
  "Puma RS-X",
  "ASICS Gel-Kayano",
  "New Balance 990",
  "Converse Chuck Taylor",
  "Vans Old Skool",
  "Reebok Classic",
];

const generateRandomSalesData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    SHOE_NAMES.forEach(shoeName => {
      // Generate more realistic values
      const sales = Math.floor(Math.random() * (25000 - 5000 + 1)) + 5000; // Sales from 5k to 25k
      const advertisingCost = Math.floor(Math.random() * (sales * 0.15 - sales * 0.03 + 1)) + (sales * 0.03); // Ad Cost 3-15% of sales
      const impressions = Math.floor(Math.random() * (1000000 - 200000 + 1)) + 200000; // Impressions 200k-1M
      const clicks = Math.floor(Math.random() * (impressions * 0.05 - impressions * 0.01 + 1)) + (impressions * 0.01); // Clicks 1-5% of impressions

      data.push({
        date: new Date(currentDate), // Ensure a new Date object for each entry
        shoeName,
        sales: Math.round(sales),
        advertisingCost: Math.round(advertisingCost),
        impressions: Math.round(clicks * (Math.random() * 8 + 10)), // Impressions related to clicks
        clicks: Math.round(Math.min(clicks, impressions * 0.05)), // Ensure clicks <= 5% of impressions
      });
    });
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return data;
};


async function seedDatabase() {
  try {
    // 1. Clear existing data using the imported cleaner function
    await clearSalesData(); // This will connect, clear, and disconnect.

    // 2. Reconnect for seeding (if clearSalesData disconnected)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB reconnected for seeding...');


    // Generate data for the full range: 1 Jan 2024 to 25 May 2025
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-05-25');
    const generatedData = generateRandomSalesData(startDate, endDate);

    console.log(`Inserting ${generatedData.length} new dummy sales records...`);
    await SalesData.insertMany(generatedData);
    console.log('Dummy data inserted successfully!');

  } catch (error) {
    console.error('Error during seeding process:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

seedDatabase();