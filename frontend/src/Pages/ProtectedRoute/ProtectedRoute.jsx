import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashBoard from '../DashBoard/DashBoard';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useSelector((state) => state.user);

    { user && user.isAuthenticated ? console.log("isAuthenticated User") : console.log("no") }
};

export default ProtectedRoute;
