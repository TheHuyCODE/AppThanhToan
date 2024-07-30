import React from "react";
import { Layout } from "antd";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";
import { Footer } from "antd/es/layout/layout";
const { Content } = Layout;
interface AppWrapperProps {
  children: any;
  darkTheme: any;
  collapsedTheme: any;
  toggleDarkTheme: any;
  setCollapsedTheme: any;
  colorBgContainer: any;
  borderRadiusLG: any;
}
const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
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
          collapsedTheme={collapsedTheme}
          toggleTheme={toggleDarkTheme}
          setCollapsedTheme={setCollapsedTheme}
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
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AppWrapper;
