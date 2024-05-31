import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import category from "../../configs/category";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refresh_token: string | null;
  darkTheme: boolean;
  isResDataChild: string;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
  colorSidebar: () => void;
  fetchDataCategoryChild: (isKeyChild: string) => void;
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
  const [isResDataChild, setIsResDataChild] = useState("");
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

  const fetchDataCategoryChild = async (isKeyChild: string) => {
    try {
      const res = await category.getAllChild(isKeyChild);
      if (res.code === 200) {
        setIsResDataChild(res.data);
      } else {
        console.log("Error", res);
      }
    } catch (error) {
      console.log("Not get data category", error);
    }
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
        isResDataChild,
        fetchDataCategoryChild,
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
