import React from "react";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";
import Logo from "../Logo/Logo";

interface AppSiderProps {
  collapsedTheme: boolean;
  toggleTheme: () => void;
  setCollapsedTheme: (collapsed: boolean) => void;
}

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  left: 0,
  zIndex: 1,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({ collapsedTheme, setCollapsedTheme }) => {
  return (
    <Sider
      theme="light"
      className="side-bar"
      collapsed={collapsedTheme}
      collapsible
      onCollapse={setCollapsedTheme}
      width={260} // Chiều rộng của sider
      style={siderStyle}
    >
      <Logo collapsedTheme={collapsedTheme} />
      <MenuList />
    </Sider>
  );
};

export default AppSider;
