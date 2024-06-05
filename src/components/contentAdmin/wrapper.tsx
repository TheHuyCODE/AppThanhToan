import React from "react";
import { Layout } from "antd";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
const { Content } = Layout;
const AppWrapper = ({
  children,
  darkTheme,
  collapsedTheme,
  toggleDarkTheme,
  setCollapsedTheme,
  colorBgContainer,
  borderRadiusLG,
}) => {
  return (
    <>
      <Layout>
        <AppSider
          darkTheme={darkTheme}
          collapsedTheme={collapsedTheme}
          toggleTheme={toggleDarkTheme}
          setCollapsedTheme={setCollapsedTheme}
          style={{ width: "500" }}
        />
        <Layout>
          <AppHeader
            collapsedTheme={collapsedTheme}
            setCollapsedTheme={setCollapsedTheme}
            colorBgContainer={colorBgContainer}
          />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* place content */}
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppWrapper;
