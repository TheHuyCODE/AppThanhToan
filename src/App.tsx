import LoginRegister from "./components/Register/LoginRegister";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import CatalogManagement from "./components/Category/CatalogManagement";
import ProductMangement from "./components/Category/ProductMangement";
import ProtectedRouter from "./components/auth/ProtectedRouter";
// import ChildrenCategory from "./components/Category/Children_catagory";
import { Layout, Button, theme } from "antd";
import Logo from "./components/Logo/Logo";
const { Sider, Header, Content } = Layout;
import "./App.css";
import MenuList from "./components/MenuList/MenuList";
import ToggleThemeButton from "./components/MenuList/ToggleThemeButton";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./components/home/Home";
import { useAuth } from "./components/auth/useAuth";
// const ProtectedRoute = ({ stateLogins, children }) => {
//   console.log("stateLogins", stateLogins);
//   if (!stateLogins) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsedTheme, setCollapsedTheme] = useState(false);
  const [hiddenTitle, setIsHiddenTitle] = useState(true);
  const [isLoginButton, setLoginButton] = useState(false);
  const [stateLogins, setStateLogins] = useState(false);
  const [isToken, setIsToken] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   setIsToken(token);
  // }, []);

  useEffect(() => {
    if (isToken) {
      console.log("isToken", isToken);
      setStateLogins(true);
    } else {
      setStateLogins(false);
    }
  }, [isToken]);
  useEffect(() => {}, [stateLogins]);
  return (
    <div className="App">
      <Layout className="layout-bar">
        {!isLoginRoute && (
          <Sider
            theme={darkTheme ? "dark" : "light"}
            className="side-bar"
            collapsed={collapsedTheme}
            collapsible
          >
            <Logo collapsedTheme={collapsedTheme} darkTheme={darkTheme} />
            <MenuList darkTheme={darkTheme} />
            <ToggleThemeButton
              darkTheme={darkTheme}
              toggleTheme={toggleDarkTheme}
            />
          </Sider>
        )}
        <Layout>
          {!isLoginRoute && (
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsedTheme(!collapsedTheme)}
                icon={
                  collapsedTheme ? (
                    <AiOutlineMenuUnfold />
                  ) : (
                    <AiOutlineMenuFold />
                  )
                }
              />
            </Header>
          )}
          <Content
            style={{
              margin: !isLoginRoute ? "24px 16px" : "0px",
              padding: !isLoginRoute ? 24 : 0,

              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              {/* <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                    <Outlet />
                  </Layout>
                }
              /> */}
              <Route
                path="/"
                element={
                  <ProtectedRouter stateLogins={stateLogins}>
                    <Layout>
                      <Home />
                      <Outlet />
                    </Layout>
                  </ProtectedRouter>
                }
              />
              <Route
                path="/productmanagement"
                element={
                  <ProtectedRouter stateLogins={stateLogins}>
                    <Layout>
                      <ProductMangement />
                      <Outlet />
                    </Layout>
                  </ProtectedRouter>
                }
              />
              <Route
                path="/productcatalogmanagement"
                element={
                  <ProtectedRouter stateLogins={stateLogins}>
                    <Layout>
                      <CatalogManagement />
                      <Outlet />
                    </Layout>
                  </ProtectedRouter>
                }
              />
              {/* <Route path="productcatalogmanagement/:id" element={<ChildrenCategory/>} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/login" element={<LoginRegister />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
