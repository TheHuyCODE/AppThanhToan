import React from "react";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";

import Logo from "../Logo/Logo";
import { useAuth } from "../auth/AuthContext";

interface AppSiderProps {
  collapsedTheme: boolean;
  toggleTheme: () => void;
  setCollapsedTheme: (collapsed: boolean) => void;
}

const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({ collapsedTheme, setCollapsedTheme }) => {
  const { darkTheme } = useAuth(); // Use darkTheme from useAuth

  return (
    <Sider
      theme={darkTheme ? "dark" : "light"}
      className="side-bar"
      collapsed={collapsedTheme}
      collapsible
      onCollapse={setCollapsedTheme}
      width={260}
    >
      <Logo collapsedTheme={collapsedTheme} />
      <MenuList />
      {/* <ToggleThemeButton /> */}
    </Sider>
  );
};

export default AppSider;
