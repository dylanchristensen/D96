import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'; // Use context for authentication

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth(); // Get authentication state from context

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
