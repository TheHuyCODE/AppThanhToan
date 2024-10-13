import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { Button } from "antd";
import { useAuth } from "../auth/AuthContext";

const ToggleThemeButton = () => {
  const { colorSidebar, darkTheme } = useAuth();
  return (
    <div className="toogle-theme-btn">
      <Button onClick={() => colorSidebar()}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};
export default ToggleThemeButton;
