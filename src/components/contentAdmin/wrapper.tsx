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
    <Layout hasSider>
      <AppSider
        collapsedTheme={collapsedTheme}
        toggleTheme={toggleDarkTheme}
        setCollapsedTheme={setCollapsedTheme}
      />
      <Layout
        style={{
          marginLeft: collapsedTheme ? 80 : 260, // Chỉnh marginLeft dựa vào trạng thái collapsed
          transition: "margin-left 0.2s", // Hiệu ứng chuyển động khi thay đổi trạng thái collapsed
        }}
      >
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
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppWrapper;
