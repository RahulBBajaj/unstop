import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatGrid from './components/SeatGrid';
import SeatBookingForm from './components/SeatBookingForm';
import ErrorAlert from './components/ErrorAlert';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [seats, setSeats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/seats`)
      .then(response => {
        setSeats(response.data);
      })
      .catch(error => {
        setError('Failed to fetch seats. Please try again later.');
        console.error(error);
      });
  };

  const handleBooking = (requestedSeats) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/seats/book`, { requestedSeats })
      .then(response => {
        const bookedSeatIds = response.data.bookedSeats.map(seat => seat._id);
        setSeats(seats.map(seat => 
          bookedSeatIds.includes(seat._id) ? { ...seat, isBooked: true } : seat
        ));
        setError('');
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Failed to book seats. Please try again.');
        console.error(error);
      });
  };

  const handleClearSeats = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/seats/clear`)
      .then(response => {
        fetchSeats(); // Re-fetch seats to update UI after clearing
        setError('');
      })
      .catch(error => {
        setError('Failed to clear seats. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="App container">
      <h1 className="my-4 text-center">Train Seat Booking System</h1>
      {error && <ErrorAlert message={error} />}
      <SeatBookingForm onBook={handleBooking} />
      <SeatGrid seats={seats} />
      <div className="mt-4 text-center">
        <button className="btn btn-warning" onClick={handleClearSeats}>
          Clear All Booked Seats
        </button>
      </div>
    </div>
  );
}

export default App;
