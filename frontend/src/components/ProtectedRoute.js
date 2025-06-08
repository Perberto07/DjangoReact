import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true; // Invalid token or decode error
  }
};

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken || isTokenExpired(accessToken)) {
    // Clear the token if it's expired
    localStorage.removeItem('access_token');
    return <Navigate to="/login" replace />;
  }

  // Token is valid
  return children;
};

export default ProtectedRoute;
