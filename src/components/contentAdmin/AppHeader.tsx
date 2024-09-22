import React from "react";
import { Button, Layout } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

import NavbarUser from "./NavbarUser";

interface AppHeaderProps {
  collapsedTheme: boolean;
  setCollapsedTheme: (collapsed: boolean) => void;
  colorBgContainer: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  collapsedTheme,
  setCollapsedTheme,
  colorBgContainer,
}) => {
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Button
        type="text"
        className="toggle"
        onClick={() => setCollapsedTheme(!collapsedTheme)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
        icon={collapsedTheme ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
      />
      <NavbarUser />
    </Layout.Header>
  );
};

export default AppHeader;
