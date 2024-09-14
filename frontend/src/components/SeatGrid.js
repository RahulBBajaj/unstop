import React from 'react';
import './SeatGrid.css';

const SeatGrid = ({ seats }) => {
  // Split seats into rows for display (first 11 rows have 7 seats, the last row has 3 seats)
  const rows = [];
  let index = 0;

  // First 11 rows with 7 seats
  for (let i = 0; i < 11; i++) {
    rows.push(seats.slice(index, index + 7));
    index += 7;
  }

  // Last row with 3 seats
  rows.push(seats.slice(index, index + 3));

  return (
    <div className="seat-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row seat-row">
          {row.map((seat, seatIndex) => (
            <div key={seatIndex} className="col seat-container">
              <button
                className={`btn seat-btn ${seat.isBooked ? 'btn-danger' : 'btn-success'}`}
                disabled={seat.isBooked}
              >
                {seat.seatNumber}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
