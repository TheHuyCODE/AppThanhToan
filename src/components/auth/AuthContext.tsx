import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import category from "../../configs/category";
import products from "../../configs/products";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refresh_token: string | null;
  darkTheme: boolean;
  isResDataChild: string;
  isResDataChildSeconds: string;
  isCategoryProduct: object;
  user: object | null;
  setIsResDataChild: (value: string) => void;
  setIsResDataChildSeconds: (value: string) => void;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
  logoutAllTabs: () => void;
  colorSidebar: () => void;
  fetchDataCategoryChild: (isKeyChild: string | undefined) => void;
  fetchDataCategorySecondChild: (isKeyChild: string | undefined) => void;
  fetchDataCategory: () => void;
}
interface UserInfo {
  // Define the structure of user info based on your requirements
  email?: string;
  role?: { id: string; key: string; name: string };
  role_id?: number;
  // Add other fields if necessary
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("access_token");
  });
  const [refresh_token, setRefresh_token] = useState<string | null>(() => {
    return localStorage.getItem("refresh_token");
  });
  const [darkTheme, setDarkTheme] = useState(true);
  const [isResDataChild, setIsResDataChild] = useState("");
  const [isResDataChildSeconds, setIsResDataChildSeconds] = useState("");
  const [isCategoryProduct, setIsCategoryProduct] = useState([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const login = (access_token: string, refresh_token: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setAccessToken(access_token);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("INFO_USER");
    localStorage.setItem("logout", Date.now().toString());
    setAccessToken(null);
    window.location.href = window.location.origin + "/";
  }, []);

  useEffect(() => {
    const storedInfo = localStorage.getItem("INFO_USER");
    if (storedInfo) {
      const info: UserInfo = JSON.parse(storedInfo);
      setUser(info);
      console.log("info", info.role?.id);
    }
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout") {
        console.log("Detected logout in another tab");
        setAccessToken(null);
        window.location.href = window.location.origin + "/";
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const colorSidebar = () => {
    setDarkTheme(!darkTheme);
  };

  const logoutAllTabs = () => {
    logout();
  };

  const fetchDataCategoryChild = async (isKeyChild: string | undefined) => {
    try {
      const res = await category.getAllChild(isKeyChild);

      setIsResDataChild(res.data);
    } catch (error) {
      console.log("Not get data category", error);
    }
  };

  const fetchDataCategorySecondChild = async (isKeyChild: string | undefined) => {
    try {
      const res = await category.getAllChildThirds(isKeyChild);

      setIsResDataChildSeconds(res.data);
    } catch (error) {
      console.log("Not get data category", error);
    }
  };

  const fetchDataCategory = async () => {
    try {
      const res = await products.getFiltersCategoryProduct();

      setIsCategoryProduct(res.data.category);
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
        logoutAllTabs,
        colorSidebar,
        darkTheme,
        isResDataChild,
        setIsResDataChild,
        setIsResDataChildSeconds,
        isResDataChildSeconds,
        user,
        fetchDataCategoryChild,
        fetchDataCategorySecondChild,
        isCategoryProduct,
        fetchDataCategory,
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
