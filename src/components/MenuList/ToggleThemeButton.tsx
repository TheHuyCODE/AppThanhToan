import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

import React from "react";
import { Button } from "antd";

const ToggleThemeButton = ({ darkTheme, togleTheme }) => (
  <div className="toogle-theme-btn">
    <Button onClick={togleTheme}>
      {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  </div>
);
export default ToggleThemeButton;
