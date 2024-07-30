import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken: string | null = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  return token;
};
