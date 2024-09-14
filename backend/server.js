const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const seatRoutes = require('./routes/seatRoutes');
const Seat = require('./models/Seat');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  // Populate seats if not already populated
  populateSeatsIfNotExist();
}).catch((err) => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/seats', seatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to populate seats if not present
const populateSeatsIfNotExist = async () => {
  try {
    const seatCount = await Seat.countDocuments(); // Check if any seats exist
    if (seatCount === 0) {
      console.log('No seats found, populating seats...');
      const seats = [];
      // First 11 rows with 7 seats each
      for (let i = 1; i <= 77; i++) {
        seats.push({ seatNumber: i, isBooked: false });
      }
      // Last row with 3 seats
      for (let i = 78; i <= 80; i++) {
        seats.push({ seatNumber: i, isBooked: false });
      }
      await Seat.insertMany(seats); // Insert seats into the database
      console.log('80 seats have been populated in the database.');
    } else {
      console.log('Seats already exist in the database.');
    }
  } catch (error) {
    console.error('Error populating seats:', error);
  }
};
