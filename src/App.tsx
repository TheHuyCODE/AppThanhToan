import LoginRegister from "./components/Register/LoginRegister";
import { Route, Routes, useLocation } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import CatalogManagement from "./components/Content/CatalogManagement";
import ProductMangement from "./components/Content/ProductMangement";
import ChildrenCategory from "./components/Content/Children_catagory";
import { Layout, Button, theme } from "antd";
import Logo from "./components/Logo/Logo";
const { Sider, Header, Content } = Layout;
import "./App.css";
import MenuList from "./components/MenuList/MenuList";
import ToggleThemeButton from "./components/MenuList/ToggleThemeButton";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/home/Home";
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsedTheme, setCollapsedTheme] = useState(false);
  const [hiddenTitle, setIsHiddenTitle] = useState(true);
  const [isLoginButton, setLoginButton] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const NotFound = () => {
    return <h1>404 Not Found data with your current URL</h1>;
  };
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
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
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                    <Outlet />
                  </Layout>
                }
              />
              <Route
                path="/productmanagement"
                element={
                  <Layout>
                    <ProductMangement />
                    <Outlet />
                  </Layout>
                }
              />
              <Route
                path="/productcatalogmanagement"
                element={
                  <Layout>
                    <CatalogManagement />
                    <Outlet />
                  </Layout>
                }
              />
              <Route path="/login" element={<LoginRegister />} />
              {/* <Route path="productcatalogmanagement/:id" element={<ChildrenCategory/>} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
