require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://infy-assg1.vercel.app', // your Vercel frontend
  'https://infyassg1.onrender.com' // allow self for health checks
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const salesRoutes = require('./routes/salesRoutes');
app.use('/api/sales', salesRoutes);

