import React from 'react';
import { Button, Layout } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

interface AppHeaderProps {
  collapsedTheme: boolean;
  setCollapsedTheme: (collapsed: boolean) => void;
  colorBgContainer: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsedTheme, setCollapsedTheme, colorBgContainer }) => {
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        className="toggle"
        onClick={() => setCollapsedTheme(!collapsedTheme)}
        icon={collapsedTheme ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
      />
    </Layout.Header>
  );
};

export default AppHeader;
