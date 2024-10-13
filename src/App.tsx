import { Button, Result, theme } from "antd";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Admins from "./components/Admin/Admins";
import Groups from "./components/Admin/Groups";
import Permissions from "./components/Admin/Permissions";
import { useAuth } from "./components/auth/AuthContext";
import ProtectedRouter from "./components/auth/ProtectedRouter";
import PublicRouter from "./components/auth/PublicRouter";
import AppWrapper from "./components/ContentAdmin/wrapper";
import Home from "./components/Home/Home";
import AddProduct from "./components/Products/AddProducts/AddProduct";
import DetailProduct from "./components/Products/DetailProduct/DetailProduct";
import ModifyProduct from "./components/Products/ModifyProduct/ModifyProduct";
import ProductMangement from "./components/Products/Products";
import LoginRegister from "./components/Register/LoginRegister";
import DetailUsers from "./components/Users/DetailUsers";
import ModifyUsers from "./components/Users/ModifyUsers";
import Users from "./components/Users/Users";
// import SalePage from './components/SalesPage/SalePage';
import Categories from "./components/Category/Categories";
import ShirtSubCategories from "./components/Category/ShirtSubCategories";
import SubCategories from "./components/Category/SubCategories";
import Customers from "./components/Customers/Customers";
import InventoryReport from "./components/Dashboard/InventoryReport";
import RevenueReport from "./components/Dashboard/RevenueReport";
import ManagementInvoices from "./components/Invoices/ManagementInvoices/ManagementInvoices";
import Payment from "./components/Payment/Payment";
import Profile from "./components/Profile/Profile";
import Return from "./components/Returns/Return";
import SalePageDemo from "./components/SalesPage/SalePageDemo";
import Store from "./components/Store/Store";
import Owner from "./pages/OwnerManage/Owner";
import StoreAdmin from "./pages/StorePageAdmin/StoreAdmin";
// import SalePage from "./components/SalesPage/SalePage";
const NotFound = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/admin/products");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi. Trang này không tồn tại"
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Quay lại
        </Button>
      }
    />
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChildCategory, setSelectedChildCategory] = useState("");
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsedTheme, setCollapsedTheme] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  // const location = useLocation();
  const { isAuthenticated, accessToken, logoutAllTabs, user } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated", accessToken);
    console.log("user", user);
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
          path="admin/customers"
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
                <Customers />
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
          path="admin/manage_store"
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
                <Store />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/inventory"
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
          path="admin/returns"
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
                <Return />
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
          path="admin/categories"
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
                <Categories
                  selectedCategory={selectedCategory}
                  selectedChildCategory={selectedChildCategory}
                  setSelectedChildCategory={setSelectedChildCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/categories/:idCategories"
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
                <SubCategories
                  selectedCategory={selectedCategory}
                  selectedChildCategory={selectedChildCategory}
                  setSelectedChildCategory={setSelectedChildCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/categories/view/:idShirtCategories"
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
                <ShirtSubCategories
                  selectedCategory={selectedCategory}
                  selectedChildCategory={selectedChildCategory}
                  setSelectedChildCategory={setSelectedChildCategory}
                  setSelectedCategory={setSelectedCategory}
                />
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
          path="admin/owners"
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
                <Owner />
              </AppWrapper>
            </ProtectedRouter>
          }
        />
        <Route
          path="admin/storeAdmin"
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
                <StoreAdmin />
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
            <PublicRouter
            // is authen lay tu trong hook ma?
            // isAuthenticated={isAuthenticated}
            >
              <LoginRegister />
            </PublicRouter>
          }
        />
        <Route path="*" element={<NotFound />} />

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
