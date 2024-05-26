import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PublicRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, accessToken, login, logout } = useAuth();
  console.log("tokenProtected", isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRouter;
