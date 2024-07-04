import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./SalePage.css";
import { Space, Table, Tabs } from "antd";
import { FaBars } from "react-icons/fa";
import { MdOutlinePoll } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logoutApi from "../../configs/logoutApi";

import { toast } from "react-toastify";
import { localeProduct } from "../TableConfig/TableConfig";

// interface Invoice {
//   id: number;
//   invoice_number: string;
//   customer_id: string;
//   customer_name: string;
//   total_price: number;
//   created_date: number;
//   items: [];
//   id_payment: string;
// }

interface User {
  access_token: string;
  created_date: number;
  email: string;
  full_name: string;
}
const { TabPane } = Tabs;
const HeaderPageSales = ({
  addInvoice,
  setActiveKey,
  activeKey,
  items,
  removeInvoice,
  handleAddReturnInvoice,
  addReturnInvoice,
  removeReturnInvoice,
  isModalOpen,
  closeModal,
}) => {
  const [infouser, setInfoUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      setValueSearchProduct("");
    }
  };

  const clickLogoutUser = () => {
    const resAccessToken = accessToken;
    logout();
    if (resAccessToken) {
      logoutApi.deleteTokenLogout(resAccessToken).then((response) => {
        if (response.code === 200) {
          navigate("/login");
        } else {
          console.log("error", response);
        }
      });
    }
  };

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    localStorage.setItem("name_payment", newActiveKey);
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === "add") {
      addInvoice();
    } else {
      const invoiceToRemove = items.find((invoice) => invoice.id_payment === targetKey);
      if (invoiceToRemove && invoiceToRemove.type === "return") {
        removeReturnInvoice(targetKey);
      } else {
        removeInvoice(targetKey);
      }
    }
  };

  // const closeModal = () => {
  //   setLocalIsModalOpen(false);
  // };
  useEffect(() => {
    const storedUser = localStorage.getItem("INFO_USER");
    if (storedUser) {
      setInfoUser(JSON.parse(storedUser));
    }
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Nhân viên",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Tổng cộng",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "",
      dataIndex: "inventory_number",
      key: "inventory_number",
      render: (record) => (
        <Space size="middle">
          <button>Chọn</button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="header-left-page-sales">
          <div className="col-left-control">
            <CiSearch
              style={{
                position: "absolute",
                top: "13px",
                left: "7px",
                transform: "translateY(8%)",
                fontSize: "20px",
              }}
            />
            <input
              type="text"
              placeholder="Quét mã vạch"
              className="search-product-sell"
              onChange={(e) => setValueSearchProduct(e.target.value)}
              value={valueSearchProduct}
              onKeyDown={handleEnterPress}
            />

            <button className="btn-return-goods" onClick={addReturnInvoice}>
              Trả hàng
            </button>
          </div>
          <div className="cart-tabs">
            <Tabs
              type="editable-card"
              onChange={onChange}
              activeKey={activeKey}
              onEdit={onEdit}
              className="custom-tabs"
            >
              {items.map((item) => (
                <TabPane
                  tab={item.invoice_number}
                  key={item.id_payment}
                  style={{ outline: "none", border: "none" }}
                  // closable={item.id_payment !== "1"} // Prevent closing the initial invoice
                />
              ))}
            </Tabs>
          </div>
        </div>
        <div className="header-right-page">
          <div>
            {infouser ? <span>{infouser.full_name}</span> : <span>No user data available</span>}
          </div>
          <button
            className="icon-button"
            onClick={toggleMenu}
            style={{ color: "white", fontSize: "20px" }}
          >
            <FaBars />
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <div>
                <MdOutlinePoll style={{ fontSize: "20px" }} />
                <Link to="/admin/products" style={{ textDecoration: "none", color: "black" }}>
                  <span>Trang quản lý</span>
                </Link>
              </div>
              <div onClick={clickLogoutUser}>
                <FaArrowRightFromBracket />
                <span style={{ marginLeft: "18px" }}>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="modal-background" />
          <div className="modal">
            <div>
              <h4>Chọn hóa đơn trả hàng</h4>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="search_invoices">
                <span>Tìm kiếm</span>
                <input type="text" placeholder="Theo mã hóa đơn" />
                <input type="text" placeholder="Theo khách hàng hoặc ĐT" />
              </div>
              <div className="table_invoices">
                <Table
                  columns={columns}
                  // dataSource={datatable}
                  locale={localeProduct}
                />
              </div>
              {/* <button
                onClick={() => {
                  handleAddReturnInvoice();
                }}
              >
                Xác nhận trả hàng
              </button> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderPageSales;
