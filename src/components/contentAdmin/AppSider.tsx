import React from "react";
import { Layout } from "antd";
import MenuList from "../menuList/MenuList";
import ToggleThemeButton from "../menuList/ToggleThemeButton";
import Logo from "../logo/Logo";
import { useAuth } from "../auth/AuthContext";

interface AppSiderProps {
  collapsedTheme: boolean;
  toggleTheme: () => void;
  setCollapsedTheme: (collapsed: boolean) => void;
}

const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({
  collapsedTheme,
  toggleTheme,
  setCollapsedTheme,
}) => {
  const { darkTheme } = useAuth(); // Use darkTheme from useAuth

  return (
    <Sider
      theme={darkTheme ? "dark" : "light"}
      className="side-bar"
      collapsed={collapsedTheme}
      collapsible
      onCollapse={setCollapsedTheme}
    >
      <Logo collapsedTheme={collapsedTheme} darkTheme={darkTheme} />
      <MenuList />
      <ToggleThemeButton />
    </Sider>
  );
};

export default AppSider;
