import React, { useState } from "react";

import { Menu, Modal } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaBagShopping, FaCartShopping, FaChartColumn, FaKey } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { FaLock, FaPercent, FaRegUserCircle } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import "./MenuList.css";
import logoutApi from "../../configs/logoutApi";
// import category from "../../configs/category";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CiBank } from "react-icons/ci";

const MenuList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { accessToken, darkTheme, logout } = useAuth();
  const handleOK = () => {
    console.log("handle OK");
    const resAccessToken = accessToken;
    logout();
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
      <Menu theme={darkTheme ? "dark" : "light"} mode="inline" className="menu-bar">
        <Menu.Item key="SalesPage" icon={<FaBagShopping />}>
          <Link to="/SalesPage">Bán hàng</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<FaRegUserCircle />}>
          <Link to="/admin/profile">Thông tin cá nhân </Link>
        </Menu.Item>
        <Menu.SubMenu key="Dashboard" icon={<RiListSettingsFill />} title="Báo cáo">
          <Menu.Item key="Revenuereport">
            <Link to="/admin/revenuereport">Báo cáo doanh thu</Link>
          </Menu.Item>
          <Menu.Item key="Inventoryreport">
            <Link to="/admin/inventoryreport">Báo cáo tồn kho</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="invoices" icon={<FaCartShopping />}>
          <Link to="/admin/invoices">Quản lý hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="User_management" icon={<IoPerson />}>
          <Link to="/admin/users">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.SubMenu
          key="Product_management"
          icon={<RiListSettingsFill />}
          title="Quản lý sản phẩm"
        >
          <Menu.Item key="Product_management_child">
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item
            key="Product_catalog_management_child"

            // onClick={handleDataCategories}
          >
            <Link to="/admin/productcatalogmanagement">Quản lý danh mục sản phẩm</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="percent" icon={<FaPercent />}>
          Quản lý mã giảm giá
        </Menu.Item>
        <Menu.Item key="paymentmethod" icon={<CiBank />}>
          <Link to="/admin/paymentmethod">Phương thức thanh toán</Link>
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
