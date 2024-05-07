import React, { useState } from "react";
import axios from "axios";
import { Menu, Modal } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping, FaChartColumn } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoIosSettings, IoIosAdd } from "react-icons/io";
import { RiListSettingsFill } from "react-icons/ri";
import { FaLock, FaPercent } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import "./MenuList.css";
import logoutApi from "../../configs/logoutApi";
import { Link, } from "react-router-dom";
const MenuList = ({ darkTheme }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [backPageLogin, setBackPageLogin] = useState(false);
  const handleOK = () => {
    setBackPageLogin(!backPageLogin);
    console.log('backPageLogin', backPageLogin);
    // Chuyển hướng đến trang đăng nhập khi hủy modal
    if (backPageLogin) {
      // Sử dụng Axios để gửi yêu cầu DELETE với token được truyền trong header
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.delete('https://835c-118-70-136-195.ngrok-free.app/api/v1/auth/logout', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          // Xử lý phản hồi từ backend (nếu cần)
          // Sau khi xử lý xong, chuyển hướng đến trang đăng nhập
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }).catch(error => {
          // Xử lý lỗi nếu có
        });
      } else {
        // Xử lý trường hợp không có token trong local storage
      }
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
          <Link to="/">Cài đặt</Link>
        </Menu.Item>
        <Menu.Item key="Logout" icon={<FaArrowRightFromBracket />} onClick={() => setIsOpenModal(!isOpenModal)}>
        <Modal
              width={600}
              // height={500}
              centered
              open={isOpenModal}
              onOk={handleOK}
              onCancel={() => setIsOpenModal(!isOpenModal)}
              okText="Đăng xuất"
              cancelText="Hủy bỏ"
            >
              <h1>Đăng xuất</h1>
              <span>Bạn có muốn đăng xuất khỏi hệ thống không?</span>
              </Modal>
            <Link to="">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuList;
