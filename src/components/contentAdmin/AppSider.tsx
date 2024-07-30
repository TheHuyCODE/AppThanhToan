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
// const siderStyle: React.CSSProperties = {
//   overflow: "auto",
//   height: "100vh",
//   // position: "fixed",
//   // insetInlineStart: 0,
//   // top: 0,
//   // bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarColor: "unset",
// };
const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({ collapsedTheme, setCollapsedTheme }) => {
  const { darkTheme } = useAuth(); // Use darkTheme from useAuth
  return (
    <Sider
      theme={"light"}
      className="side-bar"
      collapsed={collapsedTheme}
      collapsible
      onCollapse={setCollapsedTheme}
      width={260}
      // style={siderStyle}
    >
      <Logo collapsedTheme={collapsedTheme} />
      <MenuList />
      {/* <ToggleThemeButton /> */}
    </Sider>
  );
};

export default AppSider;
