const express = require('express');
const { getAllSeats, bookSeats, clearSeats } = require('../controllers/seatController');

const router = express.Router();

// Define routes
router.get('/', getAllSeats);  // Fetch all seats
router.post('/book', bookSeats);  // Book seats
router.post('/clear', clearSeats);  // Clear all seats

module.exports = router;
