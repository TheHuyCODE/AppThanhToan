import React from "react";
import { Layout } from "antd";
import MenuList from "../MenuList/MenuList";
import ToggleThemeButton from "../MenuList/ToggleThemeButton";
import Logo from "../Logo/Logo";
import { useAuth } from "../Auth/AuthContext";

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
      // collapsedWidth="0"
      // style={{
      //   overflow: "auto",
      //   height: "100vh",
      //   position: "fixed",
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      // }}
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
