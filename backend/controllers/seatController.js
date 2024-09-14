const Seat = require('../models/Seat');

// Fetch all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Book seats
exports.bookSeats = async (req, res) => {
  const { requestedSeats } = req.body;

  if (!requestedSeats || requestedSeats < 1 || requestedSeats > 7) {
    return res.status(400).json({ message: 'Invalid number of seats requested' });
  }

  try {
    const availableSeats = await Seat.find({ isBooked: false }).limit(requestedSeats);

    if (availableSeats.length < requestedSeats) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    availableSeats.forEach(async (seat) => {
      seat.isBooked = true;
      await seat.save();
    });

    res.status(200).json({
      message: `${requestedSeats} seats booked successfully`,
      bookedSeats: availableSeats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Clear all bookings
exports.clearSeats = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false }); // Reset all seats to available
    res.status(200).json({ message: 'All booked seats have been cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
