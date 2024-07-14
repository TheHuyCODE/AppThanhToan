import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { theme } from "antd";
import "./App.css";
import { useAuth } from "./components/auth/AuthContext";

import LoginRegister from "./components/Register/LoginRegister";
import CatalogManagement from "./components/Category/CatalogManagement";
import ProductMangement from "./components/Category/ProductMangement";
import ProtectedRouter from "./components/auth/ProtectedRouter";
import PublicRouter from "./components/auth/PublicRouter";
import Users from "./components/Users/Users";
import Home from "./components/Home/Home";
import AppWrapper from "./components/ContentAdmin/wrapper";
import DetailUsers from "./components/Users/DetailUsers";
import ModifyUsers from "./components/Users/ModifyUsers";
import Admins from "./components/Admin/Admins";
import Groups from "./components/Admin/Groups";
import Permissions from "./components/Admin/Permissions";
import AddProduct from "./components/Category/AddProduct";
import DetailProduct from "./components/Category/DetailProduct";
import ModifyProduct from "./components/Category/ModifyProduct";
// import SalePage from './components/SalesPage/SalePage';
import RevenueReport from "./components/Dashboard/RevenueReport";
import InventoryReport from "./components/Dashboard/InventoryReport";
import Payment from "./components/Payment/Payment";
import Invoices from "./components/Invoices/invoices";
import SalePageDemo from "./components/SalesPage/SalePageDemo";
import Profile from "./components/Profile/Profile";
import ManagementInvoices from "./components/Invoices/ManagementInvoices/ManagementInvoices";
// import SalePage from "./components/SalesPage/SalePage";
// const NotFound = () => {
//   return (
//     <div>
//       <h1 style={{ color: "red", marginTop: "50px", marginLeft: "50px" }}>404 Not Found</h1>
//     </div>
//   );
// };

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
  const { isAuthenticated, accessToken, logoutAllTabs } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated", accessToken);
    setStateLogins(true);
  }, []);
  useEffect(() => {
    logoutAllTabs;
  }, [accessToken]);
  const acces = localStorage.getItem("access_token");
  useEffect(() => {
    console.log("acces", acces);
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route
          path="admin"
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
          path="admin/revenuereport"
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
                <RevenueReport />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/profile"
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
                <Profile />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/inventoryreport"
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
                <InventoryReport />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/invoices"
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
                <ManagementInvoices />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/paymentmethod"
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
                <Payment />
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
          path="admin/products/edit/:idProduct"
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
                <ModifyProduct />
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
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route
          path="/SalesPage"
          element={
            <ProtectedRouter>
              <SalePageDemo />
            </ProtectedRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
