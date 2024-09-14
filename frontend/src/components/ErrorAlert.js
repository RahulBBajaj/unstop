import React from 'react';
import './ErrorAlert.css';

const ErrorAlert = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default ErrorAlert;
