import React, { useState } from "react";

import { Menu, Modal } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping, FaChartColumn, FaKey } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { FaLock, FaPercent } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import "./MenuList.css";
import logoutApi from "../../configs/logoutApi";
// import category from "../../configs/category";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const MenuList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { accessToken, darkTheme, logout } = useAuth();
  const handleOK = () => {
    console.log("handle OK");
    const resAccessToken = accessToken;
    logout();
    // Chuyển hướng đến trang đăng nhập khi hủy modal

    // Sử dụng Axios để gửi yêu cầu DELETE với token được truyền trong header
    if (resAccessToken) {
      logoutApi.deleteTokenLogout(resAccessToken).then((response) => {
        if (response.code === 200) {
          console.log("/");
        } else {
          console.log("error", response);
        }
      });
    }
  };
  return (
    <div className="sidebar-left">
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="Dashboard" icon={<FaChartColumn />}>
          <Link to="admin/dashboard">Thống kê</Link>
        </Menu.Item>
        <Menu.Item key="Order_management" icon={<FaCartShopping />}>
          <Link to="admin/ordermanagement">Quản lí đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="User_management" icon={<IoPerson />}>
          <Link to="/admin/users">Quản lí người dùng</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="Product_management"
          icon={<RiListSettingsFill />}
          title="Quản lí sản phẩm"
        >
          <Menu.Item key="Product_management_child" icon={<IoIosAdd />}>
            <Link to="/admin/productmanagement">Quản lí sản phẩm</Link>
          </Menu.Item>
          <Menu.Item
            key="Product_catalog_management_child"
            icon={<IoIosAdd />}
            // onClick={handleDataCategories}
          >
            <Link to="/admin/productcatalogmanagement">
              Quản lí danh mục sản phẩm
            </Link>
          </Menu.Item>
          <Menu.Item
            key="Manage_manufacturers_models_child"
            icon={<IoIosAdd />}
          >
            <Link to="/admin/managemanufacturersmodels">
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
          <Link to="/admin">Cài đặt</Link>
        </Menu.Item>
        <Menu.Item key="setPassword" icon={<FaKey />}>
          <Link to="/">Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item
          key="Logout"
          icon={<FaArrowRightFromBracket />}
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <Modal
            width={600}
            // height={500}
            centered
            open={isOpenModal}
            onOk={() => handleOK()}
            onCancel={() => setIsOpenModal(!isOpenModal)}
            okText="Đăng xuất"
            cancelText="Hủy bỏ"
          >
            <h1>Đăng xuất</h1>
            <span>Bạn có muốn đăng xuất khỏi hệ thống không?</span>
          </Modal>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
