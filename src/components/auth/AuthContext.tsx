import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refresh_token: string | null;
  darkTheme: boolean;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
  colorSidebar: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    // Check local storage for an existing token on initial load
    return localStorage.getItem("access_token");
  });
  const [refresh_token, setRefresh_token] = useState<string | null>(() => {
    // Check local storage for an existing token on initial load
    return localStorage.getItem("access_token");
  });
  const [darkTheme, setDarkTheme] = useState(false);
  const login = (access_token: string, refresh_token: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setAccessToken(access_token);
  };
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
  };
  const colorSidebar = () => {
    // console.log("sidebar_color", sidebar);
    setDarkTheme(!darkTheme);
  };
  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refresh_token,
        login,
        logout,
        colorSidebar,
        darkTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
