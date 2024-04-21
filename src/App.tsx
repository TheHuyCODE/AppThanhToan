import LoginRegister from "./components/Register/LoginRegister";
import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Layout, Button, theme } from "antd";
import Logo from "./components/Logo/Logo";
const { Sider, Header } = Layout;
import "./App.css";
import MenuList from "./components/MenuList/MenuList";
import ToggleThemeButton from "./components/MenuList/ToggleThemeButton";

import React, { useState } from "react";

// import managementCatalogProduct from "./components/listitem/managementCatalogProduct";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapedTheme, setCollapedTheme] = useState(false);
  const [hiddenTitle, setHiddenTitle] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <>
      <Layout className="layout-bar">
        <Sider
          theme={darkTheme ? "dark" : "light"}
          className="side-bar"
          collapsed={collapedTheme}
          collapsible
          // trigger={null}
        >
          <Logo collapedTheme={collapedTheme} darkTheme={darkTheme}/>
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton
            darkTheme={darkTheme}
            togleTheme={toggleDarkTheme}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapedTheme(!collapedTheme)}
              icon={
                collapedTheme ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />
              }
            />
          </Header>
        </Layout>
      </Layout>
    </> // <Header>

    // </Header>
  );
}

export default App;
