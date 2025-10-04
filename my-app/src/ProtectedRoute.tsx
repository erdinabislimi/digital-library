import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    // not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  // logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
