import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render the protected component
  return children;
};

export default ProtectedRoute;
