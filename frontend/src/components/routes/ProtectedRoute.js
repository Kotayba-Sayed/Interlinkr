import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUsername } from '../context/UserContext';

const ProtectedRoute = () => {
  const { username } = useUsername();
  console.log(username)
  console.log(username === 'admin')
  return username === 'admin' ? <Outlet /> : <Navigate to="/login" />;

};

export default ProtectedRoute;
