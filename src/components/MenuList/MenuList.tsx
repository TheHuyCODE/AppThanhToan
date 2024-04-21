import React from "react";
import { Menu } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping, FaChartColumn } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { FaLock, FaPercent } from "react-icons/fa";
import "./MenuList.css";
const MenuList = ({ darkTheme }) => {
  return (
    <div>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="dashboard" icon={<FaChartColumn />}>
          Thống kê
        </Menu.Item>
        <Menu.Item key="order-management" icon={<FaCartShopping />}>
          Quản lí đơn hàng
        </Menu.Item>
        <Menu.Item key="Usermanagement" icon={<IoPerson />}>
          Quản lí người dùng
        </Menu.Item>
        <Menu.SubMenu
          key="Product_management"
          icon={<RiListSettingsFill />}
          title="Quản lí sản phẩm"
        >
          <Menu.Item key="Product_management_child" icon={<IoIosAdd />}>
            Quản lí sản phẩm
          </Menu.Item>
          <Menu.Item key="Product_catalog_management_child" icon={<IoIosAdd />}>
            Quản lí danh mục sản phẩm
          </Menu.Item>
          <Menu.Item
            key="Manage_manufacturers_models_child"
            icon={<IoIosAdd />}
          >
            Quản lí hãng sản xuất và model
          </Menu.Item>
        </Menu.SubMenu>
        {/* <Menu.Item key="dasgboard3" icon={<MdDashboard />}>
          Quản lí tin tức sự kiện
        </Menu.Item> */}
        <Menu.Item
          key="
          admin_management"
          icon={<FaLock />}
        >
          Quản lí quản trị viên
        </Menu.Item>
        <Menu.Item key="percent" icon={<FaPercent />}>
          Quản lí mã giảm giá
        </Menu.Item>
        <Menu.Item key="setting" icon={<IoIosSettings />}>
          Cài đặt
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
