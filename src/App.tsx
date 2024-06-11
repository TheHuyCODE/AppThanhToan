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
import Users from "./components/Users/Users";
import Home from "./components/home/Home";
import { TbRuler2 } from "react-icons/tb";
import AppWrapper from "./components/contentAdmin/wrapper";
import DetailUsers from "./components/Users/DetailUsers";
import ModifyUsers from "./components/Users/ModifyUsers";
import Admins from "./components/Admin/Admins";
import Groups from "./components/Admin/Groups";
import Permissions from "./components/Admin/Permissions";
import AddProduct from "./components/category/AddProduct";
import DetailProduct from "./components/category/DetailProduct";
const NotFound = () => {
  return (
    <div>
      <h1 style={{ color: "red", marginTop: "50px", marginLeft: "50px" }}>
        404 Not Found
      </h1>
    </div>
  );
};
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
          path="/admin"
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
          path="admin/products"
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
          path="admin/products/add"
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
                <AddProduct />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/products/:idProduct"
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
                <DetailProduct />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/productcatalogmanagement"
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
          path="admin/users/:userId"
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
                <DetailUsers />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/users/edit/:userId"
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
                <ModifyUsers />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/users"
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
                <Users />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/admins"
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
                <Admins />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/groups"
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
                <Groups />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/permissions"
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
                <Permissions />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
