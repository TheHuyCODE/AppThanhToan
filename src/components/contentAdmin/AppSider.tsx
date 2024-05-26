import React from "react";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";
import ToggleThemeButton from "../MenuList/ToggleThemeButton";
import Logo from "../Logo/Logo";
interface AppSiderProps {
  darkTheme: boolean;
  collapsedTheme: boolean;
  toggleTheme: () => void;
  setCollapsedTheme: (collapsed: boolean) => void;
}
const { Sider } = Layout;
const AppSider: React.FC<AppSiderProps> = ({
  darkTheme,
  collapsedTheme,
  toggleTheme,
  setCollapsedTheme,
}) => {
  return (
    <Sider
      // theme={}
      className="side-bar"
      collapsed={collapsedTheme}
      collapsible
      onCollapse={setCollapsedTheme}
    >
      <Logo collapsedTheme={collapsedTheme} darkTheme={darkTheme} />
      <MenuList darkTheme={darkTheme} />
      <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
    </Sider>
  );
};

export default AppSider;
