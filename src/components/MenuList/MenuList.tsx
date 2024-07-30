import React, { Children, useState } from "react";
import { Menu, Modal } from "antd";
import { FaBagShopping, FaPeopleGroup } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiListSettingsFill } from "react-icons/ri";
import { FaFileInvoiceDollar, FaPercent, FaRegUserCircle } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import "./MenuList.css";
import logoutApi from "../../configs/logoutApi";
// import category from "../../configs/category";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { CiBank } from "react-icons/ci";
import { TiArrowBack } from "react-icons/ti";
import type { GetProp, MenuProps } from "antd";
type MenuItem = GetProp<MenuProps, "items">[number];
const MenuList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { accessToken, darkTheme, logout, user } = useAuth();
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
  const adminMenuKeys = ["owner_management", "store_management"];
  const items = [
    { key: "1", icon: <FaBagShopping />, link: "/SalesPage", label: "Bán hàng" },
    {
      key: "2",
      icon: <FaRegUserCircle />,
      link: "/admin/profile",
      label: "Thông tin cá nhân",
    },
    {
      key: "sub1",
      label: "Báo cáo",
      icon: <RiListSettingsFill />,
      children: [
        {
          key: "3",
          icon: <RiListSettingsFill />,
          label: (
            <a href="/admin/revenuereport" target="_blank" rel="noopener noreferrer">
              Báo cáo doanh thu
            </a>
          ),
          // link: "/admin/revenuereport",
          // label: "Báo cáo doanh thu",
        },
        {
          key: "4",
          icon: <RiListSettingsFill />,
          // link: "/admin/inventoryreport",
          label: "Báo cáo tồn kho",
        },
      ],
    },
    {
      key: "invoices",
      icon: <FaFileInvoiceDollar />,
      link: "/admin/invoices",
      label: "Quản lý hóa đơn",
    },
    { key: "returns", icon: <TiArrowBack />, link: "/admin/returns", label: "Quản lý trả hàng" },
    {
      key: "User_management",
      icon: <IoPerson />,
      link: "/admin/users",
      label: "Quản lý người dùng",
    },
    {
      label: "Quản lý sản phẩm",
      key: "Product_management",
      icon: <RiListSettingsFill />,
      Children: [
        {
          key: "Product_management_child",
          icon: <RiListSettingsFill />,
          // link: "/admin/products",
          label: "Quản lý sản phẩm",
        },
        {
          key: "categories",
          icon: <RiListSettingsFill />,
          // link: "/admin/categories",
          label: "Quản lý danh mục sản phẩm",
        },
      ],
    },
    {
      key: "customer_management",
      icon: <FaPeopleGroup />,
      link: "/admin/customers",
      label: "Quản lý khách hàng",
    },
    { key: "percent", icon: <FaPercent />, link: "/admin/percent", label: "Quản lý mã giảm giá" },
    {
      key: "paymentmethod",
      icon: <CiBank />,
      link: "/admin/paymentmethod",
      label: "Phương thức thanh toán",
    },
    {
      key: "owner_management",
      icon: <CiBank />,
      link: "/admin/owner",
      label: "Quản lí chủ của hàng",
    },
    { key: "store_management", icon: <CiBank />, link: "/admin/store", label: "Quản lí cửa hàng" },
  ];
  // const filterMenuItems = () => {
  //   if (user?.role.id === 1) {
  //     return commonMenuItems.filter((item) => adminMenuKeys.includes(item.key));
  //   }
  //   return commonMenuItems;
  // };
  return (
    <div className="sidebar-left">
      <Menu
        theme={"light"}
        mode="inline"
        className="menu-bar"

        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        // items={items}
      >
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
        <Menu.Item key="invoices" icon={<FaFileInvoiceDollar />}>
          <Link to="/admin/invoices">Quản lý hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="returns" icon={<TiArrowBack />}>
          <Link to="/admin/returns">Quản lý trả hàng</Link>
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
          <Menu.Item key="categories">
            <Link to="/admin/categories">Quản lý danh mục sản phẩm</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="customer_management" icon={<FaPeopleGroup />}>
          <Link to="/admin/customers">Quản lý khách hàng</Link>
        </Menu.Item>
        {/* <Menu.Item key="percent" icon={<FaPercent />}>
          Quản lý mã giảm giá
        </Menu.Item> */}
        <Menu.Item key="paymentmethod" icon={<CiBank />}>
          <Link to="/admin/paymentmethod">Phương thức thanh toán</Link>
        </Menu.Item>
        <Menu.Item key="owner_management" icon={<CiBank />}>
          <Link to="/admin/owner">Quản lí chủ của hàng</Link>
        </Menu.Item>
        <Menu.Item key="store_management" icon={<CiBank />}>
          <Link to="/admin/store">Quản lí cửa hàng</Link>
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
