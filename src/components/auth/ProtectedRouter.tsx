import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuthenticated, children }: { isAuthenticated: any, children: React.ReactNode }) => {
  console.log("tokenProtected", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
