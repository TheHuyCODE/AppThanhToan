import { Menu, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaFileInvoiceDollar, FaRegUserCircle } from "react-icons/fa";
import { FaArrowRightFromBracket, FaBagShopping, FaPeopleGroup } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { IoBarChartOutline, IoPerson, IoStorefront } from "react-icons/io5";
import { RiListSettingsFill } from "react-icons/ri";

import { CiBank } from "react-icons/ci";
import { TiArrowBack } from "react-icons/ti";
import logoutApi from "../../configs/logoutApi";
import { useAuth } from "../auth/AuthContext";
import "./MenuList.css";

// Define the User interface

const MenuList: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { accessToken, logout, user } = useAuth();
  const location = useLocation();

  const getSelectedKey = (pathname: string) => {
    if (pathname === "/admin/profile") return "2";
    if (pathname === "/SalesPage") return "1";
    if (pathname === "/admin/revenuereport") return "3";
    if (pathname === "/admin/inventory") return "4";
    if (pathname === "/admin/invoices") return "invoices";
    if (pathname === "/admin/returns") return "returns";
    if (pathname === "/admin/users") return "User_management";
    if (pathname === "/admin/products") return "Product_management_child";
    if (pathname === "/admin/categories") return "categories";
    if (pathname === "/admin/customers") return "customer_management";
    if (pathname === "/admin/paymentmethod") return "paymentmethod";
    if (pathname === "/admin/owners") return "owner_management";
    if (pathname === "/admin/storeAdmin") return "store_management";
    if (pathname === "/admin/manage_store") return "manage_store";
    // Add more conditions as needed
    return "";
  };

  const [selectedKey, setSelectedKey] = useState(getSelectedKey(location.pathname));

  useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location.pathname]);

  const handleOK = () => {
    const resAccessToken = accessToken;
    logout();
    localStorage.removeItem("INFO_USER");
    if (resAccessToken) {
      logoutApi.deleteTokenLogout(resAccessToken).then((response: any) => {
        if (response.code === 200) {
          console.log("/");
        } else {
          console.log("error", response);
        }
      });
    }
  };

  // Define menu items
  const menuItems = [
    {
      key: "1",
      icon: <FaBagShopping />,
      link: "/SalesPage",
      label: "Bán hàng",
    },
    {
      key: "2",
      icon: <FaRegUserCircle />,
      link: "/admin/profile",
      label: "Thông tin cá nhân",
    },
    {
      key: "manage_store",
      icon: <CiBank />,
      link: "/admin/manage_store",
      label: "Thông tin cửa hàng",
    },
    {
      key: "sub1",
      icon: <IoBarChartOutline />,
      label: "Báo cáo",
      children: [
        {
          key: "3",
          label: <Link to="/admin/revenuereport">Báo cáo doanh thu</Link>,
        },
        {
          key: "4",
          label: <Link to="/admin/inventory">Báo cáo tồn kho</Link>,
        },
      ],
    },
    {
      key: "invoices",
      icon: <FaFileInvoiceDollar />,
      link: "/admin/invoices",
      label: "Quản lý hóa đơn",
    },
    {
      key: "returns",
      icon: <TiArrowBack />,
      link: "/admin/returns",
      label: "Quản lý trả hàng",
    },
    {
      key: "User_management",
      icon: <IoPerson />,
      link: "/admin/users",
      label: "Quản lý nhân viên",
    },
    {
      key: "Product_management",
      icon: <RiListSettingsFill />,
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "Product_management_child",
          // icon: <RiListSettingsFill />,
          label: <Link to="/admin/products">Quản lý sản phẩm</Link>,
        },
        {
          key: "categories",
          // icon: <RiListSettingsFill />,
          label: <Link to="/admin/categories">Quản lý danh mục sản phẩm</Link>,
        },
      ],
    },
    {
      key: "customer_management",
      icon: <FaPeopleGroup />,
      link: "/admin/customers",
      label: "Quản lý khách hàng",
    },
    {
      key: "paymentmethod",
      icon: <CiBank />,
      link: "/admin/paymentmethod",
      label: "Phương thức thanh toán",
    },
    {
      key: "owner_management",
      icon: <GrUserAdmin />,
      link: "/admin/owners",
      label: "Quản lý chủ của hàng",
    },
    {
      key: "store_management",
      icon: <IoStorefront />,
      link: "/admin/storeAdmin",
      label: "Quản lý cửa hàng",
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = (() => {
    console.log("User role ID:", user?.role_id); // Check user role ID
    switch (user?.role_id) {
      case 5:
        // Only display the item with key "1"
        return menuItems.filter((item) => item.key === "1");
      case 3:
        // Display all items except those with keys "owner_management" and "store_management"
        return menuItems.filter(
          (item) => item.key !== "owner_management" && item.key !== "store_management"
        );
      case 1:
        // Only display items with keys "owner_management" and "store_management"
        return menuItems.filter(
          (item) => item.key === "owner_management" || item.key === "store_management"
        );
      case 4:
        // Only display items with keys "owner_management" and "store_management"
        return menuItems.filter(
          (item) =>
            item.key !== "owner_management" &&
            item.key !== "store_management" &&
            item.key !== "User_management" &&
            item.key !== "paymentmethod"
          // item.key !== "returns"
        );
      default:
        // Default to displaying all items
        return menuItems;
    }
  })();

  console.log("Filtered menu items:", filteredMenuItems);
  return (
    <div className="sidebar-left">
      <Menu theme={"light"} mode="inline" className="menu-bar" selectedKeys={[selectedKey]}>
        {filteredMenuItems.map((item) =>
          item.children ? (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child: any) => (
                <Menu.Item key={child.key} icon={child.icon}>
                  <Link to={child.link || "#"}>{child.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link || "#"}>{item.label}</Link>
            </Menu.Item>
          )
        )}
        <Menu.Item
          key="Logout"
          icon={<FaArrowRightFromBracket />}
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          <Modal
            width={600}
            centered
            open={isOpenModal}
            onOk={handleOK}
            onCancel={() => setIsOpenModal(!isOpenModal)}
            okText="Đăng xuất"
            cancelText="Hủy"
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
