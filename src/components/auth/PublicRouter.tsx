import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";

const PublicRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  useEffect(() => {
    if (isAuthenticated && user) {
      const { role_id } = user;
      if (role_id === 1) {
        // Redirect to "/admin/owners" if role_id is 1
        window.location.replace("/admin/owners");
      } else if (role_id === 5) {
        // Redirect to "/SalesPage" if role_id is 5
        window.location.replace("/SalesPage");
      } else if (role_id === 4) {
        // Redirect to "/SalesPage" if role_id is 5
        window.location.replace("/admin/products");
      } else {
        window.location.replace("/admin/revenuereport");
      }
    }
  }, [isAuthenticated, user]);
  if (isAuthenticated) {
    // Optionally, show a loading spinner or similar while handling redirection
    return <div>Redirecting...</div>;
  }

  return children;
};

export default PublicRouter;
