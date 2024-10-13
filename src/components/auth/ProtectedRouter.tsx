import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Define route access based on role_id
  const allowedRoutesForRole1 = ["/admin/owners", "/admin/storeAdmin"];
  const allowedRoutesForRole5 = ["/SalesPage", "/admin/profile"];
  const ignoredRoutesForRole3 = ["/admin/owners", "/admin/storeAdmin"];
  const allowedRoutesForRole4 = [
    "/admin/owners",
    "/admin/storeAdmin",
    "/admin/users",
    "/admin/paymentmethod",
  ];

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has a valid role
  if (!user || !user.role_id) {
    return <Navigate to="/login" replace />;
  }

  const { role_id } = user;
  const pathname = location.pathname;

  // Check if the current pathname is accessible based on the role
  const isAccessAllowed = (role_id: number, pathname: string) => {
    if (role_id === 1) {
      // Role 1 can only access allowedRoutesForRole1
      return allowedRoutesForRole1.includes(pathname);
    }

    if (role_id === 5) {
      // Role 5 can only access allowedRoutesForRole5
      return allowedRoutesForRole5.includes(pathname);
    }
    if (role_id === 4) {
      // Role 5 can only access allowedRoutesForRole5
      return !allowedRoutesForRole4.includes(pathname);
    }
    if (role_id === 3) {
      // Role 3 can access all routes except ignoredRoutesForRole3
      return !ignoredRoutesForRole3.includes(pathname);
    }

    // Default to no access if role_id is not recognized
    return false;
  };

  if (!isAccessAllowed(role_id, pathname)) {
    // Redirect to a default page or an "access denied" page
    return <Navigate to="/admin/access-denied" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
