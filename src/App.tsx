import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { theme } from "antd";
import "./App.css";
import { useAuth } from "./components/auth/AuthContext";

import LoginRegister from "./components/register/LoginRegister";
import CatalogManagement from "./components/category/CatalogManagement";
import ProductMangement from "./components/category/ProductMangement";
import ProtectedRouter from "./components/auth/ProtectedRouter";
import PublicRouter from "./components/auth/PublicRouter";
import Home from "./components/home/Home";
import { TbRuler2 } from "react-icons/tb";
import AppWrapper from "./components/contentAdmin/wrapper";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsedTheme, setCollapsedTheme] = useState(false);
  const [stateLogins, setStateLogins] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const { isAuthenticated, accessToken, login, logout } = useAuth();

  useEffect(() => {
    // Logic to check if the user is logged in and update stateLogins
    console.log("isAuthenticated", accessToken);
    setStateLogins(true);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter>
              <AppWrapper
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleDarkTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
                borderRadiusLG={borderRadiusLG}
              >
                <Home />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="/productmanagement"
          element={
            <ProtectedRouter>
              <AppWrapper
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleDarkTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
                borderRadiusLG={borderRadiusLG}
              >
                <ProductMangement />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="/productcatalogmanagement"
          element={
            <ProtectedRouter>
              <AppWrapper
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleDarkTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
                borderRadiusLG={borderRadiusLG}
              >
                <CatalogManagement />
              </AppWrapper>
            </ProtectedRouter>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRouter isAuthenticated={isAuthenticated}>
              <LoginRegister />
            </PublicRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
