import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ adminOnly }) => {
  const { user } = useSelector((state) => state.auth);
  console.log('ProtectedRoute user:', user);
  console.log('User role:', user?.role);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    console.log('Access denied: user role is not admin');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;