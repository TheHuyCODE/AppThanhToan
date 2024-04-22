import LoginRegister from "./components/Register/LoginRegister";
import { Route, Routes, useLocation } from "react-router-dom";
import Headermain from "./components/header/Header";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Layout, Button, theme } from "antd";
import Logo from "./components/Logo/Logo";
const { Sider, Header } = Layout;
import "./App.css";
import MenuList from "./components/MenuList/MenuList";
import ToggleThemeButton from "./components/MenuList/ToggleThemeButton";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/home/Home";
function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsedTheme, setCollapsedTheme] = useState(false);
  const [hiddenTitle, setHiddenTitle] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  return (
    <div className="App">
      {!isLoginRoute && (
        <Layout className="layout-bar">
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
          <Layout>
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
          </Layout>
        </Layout>
      )}
      <div className="content">
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
                <Headermain />
                <Outlet />
              </Layout>
            }
          />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
