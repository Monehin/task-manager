import React from 'react';

const ErrorMessage = ({ message }) => (
  <p className="text-center text-red-600 mt-10">Error: {message}</p>
);

export default ErrorMessage;