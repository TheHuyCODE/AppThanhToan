import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout, theme } from "antd";
import "./App.css";
import { useAuth } from "./components/auth/AuthContext";

import LoginRegister from "./components/Register/LoginRegister";
import CatalogManagement from "./components/Category/CatalogManagement";
import ProductMangement from "./components/Category/ProductMangement";
import ProtectedRouter from "./components/auth/ProtectedRouter";
import AppSider from "./components/contentAdmin/AppSider";
import PublicRouter from "./components/auth/PublicRouter";
import Home from "./components/home/Home";
import AppHeader from "./components/contentAdmin/AppHeader";
import { TbRuler2 } from "react-icons/tb";

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
              <AppSider
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
              />
              <AppHeader
                collapsedTheme={collapsedTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
              />
              <Layout
                style={{
                  padding: "24px",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Home />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/productmanagement"
          element={
            <ProtectedRouter>
              <AppSider
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
              />
              <AppHeader
                collapsedTheme={collapsedTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
              />
              <Layout
                style={{
                  padding: "24px",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <ProductMangement />
              </Layout>
            </ProtectedRouter>
          }
        />
        <Route
          path="/productcatalogmanagement"
          element={
            <ProtectedRouter>
              <AppSider
                darkTheme={darkTheme}
                collapsedTheme={collapsedTheme}
                toggleTheme={toggleDarkTheme}
                setCollapsedTheme={setCollapsedTheme}
              />
              <AppHeader
                collapsedTheme={collapsedTheme}
                setCollapsedTheme={setCollapsedTheme}
                colorBgContainer={colorBgContainer}
              />
              <Layout
                style={{
                  padding: "24px",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <CatalogManagement />
              </Layout>
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
