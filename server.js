const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/p2pverse', {
  // Removed deprecated options
});

// Define the Ad schema
const adSchema = new mongoose.Schema({
  coinType: String,
  price: Number,
  quantity: Number,
  contactNumber: String,
  email: String,
  action: String, // 'buy' or 'sell'
});

// Create the Ad model
const Ad = mongoose.model('Ad', adSchema);

// POST endpoint to create an ad
app.post('/api/postAd', async (req, res) => {
  try {
    const ad = new Ad(req.body);
    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to fetch ads based on action
app.get('/api/postAd', async (req, res) => {
  const { action } = req.query;
  try {
    const ads = await Ad.find(action ? { action } : {});
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 