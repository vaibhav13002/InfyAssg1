// backend/scripts/DatabaseCleaner.js
const mongoose = require('mongoose');
const SalesData = require('./models/SalesData'); // Fixed path for local models directory
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

async function clearSalesData() {
  try {
    // Ensure you connect to the correct database.
    // Replace process.env.MONGO_URI with your actual MongoDB connection string
    // if you're not using dotenv or it's named differently.
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for cleaning...');

    await SalesData.deleteMany({});
    console.log('SalesData collection cleared successfully.');

  } catch (error) {
    console.error('Error clearing SalesData collection:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

// If this script is run directly, execute the clearSalesData function
if (require.main === module) {
  clearSalesData();
}

module.exports = clearSalesData; // Export the function for use in other scripts (like seed.js)