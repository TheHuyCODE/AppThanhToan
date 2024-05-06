import React from "react";
import { Menu } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping, FaChartColumn } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { FaLock, FaPercent } from "react-icons/fa";
import "./MenuList.css";
import { Link } from "react-router-dom";
const MenuList = ({ darkTheme }) => {
  return (
    <div className="sidebar-left">
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="Dashboard" icon={<FaChartColumn />}>
          <Link to="/">Thống kê</Link>
        </Menu.Item>
        <Menu.Item key="Order_management" icon={<FaCartShopping />}>
          <Link to="/ordermanagement">Quản lí đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="User_management" icon={<IoPerson />}>
          <Link to="/usermanagement">Quản lí người dùng</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="Product_management"
          icon={<RiListSettingsFill />}
          title="Quản lí sản phẩm"
        >
          <Menu.Item key="Product_management_child" icon={<IoIosAdd />}>
            <Link to="/productmanagement">Quản lí sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="Product_catalog_management_child" icon={<IoIosAdd />}>
            <Link to="/productcatalogmanagement">
              Quản lí danh mục sản phẩm
            </Link>
          </Menu.Item>
          <Menu.Item
            key="Manage_manufacturers_models_child"
            icon={<IoIosAdd />}
          >
            <Link to="/managemanufacturersmodels">
              Quản lí hãng sản xuất và model
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="
          Admin_management"
          icon={<FaLock />}
        >
          Quản lí quản trị viên
        </Menu.Item>
        <Menu.Item key="percent" icon={<FaPercent />}>
          Quản lí mã giảm giá
        </Menu.Item>
        <Menu.Item key="Setting" icon={<IoIosSettings />}>
          <Link to="/login">Cài đặt</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
