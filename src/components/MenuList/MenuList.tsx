import React from "react";
import { Menu } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
const MenuList = () => {
  return (
    <div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="dashboard" icon={<MdDashboard />}>
          Thống kê
        </Menu.Item>
        <Menu.Item key="dasgboard1" icon={<FaCartShopping />}>
          Quản lí đơn hàng
        </Menu.Item>
        <Menu.Item key="dasgboard2" icon={<IoPerson />}>
          Quản lí người dùng
        </Menu.Item>
        <Menu.SubMenu
          key="Product_management"
          icon={<IoPerson />}
          title="Quản lí sản phẩm"
        >
          <Menu.Item key="Task1" icon={<IoIosAdd />}>
            Quản lí sản phẩm
          </Menu.Item>
          <Menu.Item key="Task2" icon={<IoIosAdd />}>
            Quản lí danh mục sản phẩm
          </Menu.Item>
          <Menu.Item key="Task3" icon={<IoIosAdd />}>
            Quản lí hãng sản xuất và model
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="dasgboard3" icon={<MdDashboard />}>
          Quản lí tin tức sự kiện
        </Menu.Item>
        <Menu.Item key="dasgboard4" icon={<MdDashboard />}>
          Quản lí quản trị viên
        </Menu.Item>
        <Menu.Item key="dasgboard5" icon={<IoIosSettings />}>
          Cài đặt
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
