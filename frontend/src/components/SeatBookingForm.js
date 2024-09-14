import React, { useState } from 'react';
import './SeatBookingForm.css';

const SeatBookingForm = ({ onBook }) => {
  const [requestedSeats, setRequestedSeats] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (requestedSeats > 0 && requestedSeats <= 7) {
      onBook(requestedSeats);
    } else {
      alert('Please enter a valid number of seats (1-7).');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="seat-booking-form mb-4">
      <div className="form-group">
        <label htmlFor="seats" className="form-label">
          Number of Seats to Book (1-7):
        </label>
        <input
          type="number"
          id="seats"
          className="form-control"
          min="1"
          max="7"
          value={requestedSeats}
          onChange={(e) => setRequestedSeats(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Book Seats
      </button>
    </form>
  );
};

export default SeatBookingForm;
