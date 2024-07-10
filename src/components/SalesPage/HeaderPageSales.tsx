import React, { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import "./SalePage.css";
import { Space, Table, Tabs } from "antd";
import { FaBars } from "react-icons/fa";
import { MdOutlinePoll } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logoutApi from "../../configs/logoutApi";

import { localeProduct, localInvoice, paginationConfig } from "../TableConfig/TableConfig";
import { format } from "date-fns";
import { IoMdClose } from "react-icons/io";

interface User {
  access_token: string;
  created_date: number;
  email: string;
  full_name: string;
}
type RecordType = {
  stt: number;
  id: string;
  created_date: string;
  full_name: string;
  customer: string;
  total_amount: number;
};
type ChildComponentProps = {
  activeKey: string;
  items: [];
  isModalOpen: boolean;
  // dataTableInvoice: [];
  addInvoice: () => void;
  onDetailInvoiceReturn: (id: string) => void;
  setActiveKey: (value: string) => void;
  removeInvoice: (id: string) => void;
  handleAddReturnInvoice: () => void;
  addReturnInvoice: () => void;
  removeReturnInvoice: (key: string) => void;
  closeModal: () => void;
  onSearchInvoices: (value: string) => void;
  // setIsOpenPaymentReturn: (value: boolean) => void;
};
const { TabPane } = Tabs;
const HeaderPageSales: React.FC<ChildComponentProps> = ({
  setActiveKey,
  activeKey,
  items,
  isModalOpen,
  addInvoice,
  removeInvoice,
  handleAddReturnInvoice,
  onDetailInvoiceReturn,
  addReturnInvoice,
  removeReturnInvoice,
  closeModal,
  dataTableInvoice,
  onSearchInvoices,
  // setIsOpenPaymentReturn,
}) => {
  const [infouser, setInfoUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  // const [valueSearchInvoice, setValueSearchInvoice] = useState("");
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      setValueSearchProduct("");
    }
  };

  const handleSearchInvoice = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
    onSearchInvoices(value);
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
    // console.log("newActiveKey", newActiveKey);
    localStorage.setItem("idActiveInvoice", newActiveKey);
    // if (!newActiveKey.startsWith("return-")) {
    //   setIsOpenPaymentReturn(false);
    // }
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

  const detailInvoiceReturn = (record: object) => {
    console.log("record", record.id);
    onDetailInvoiceReturn(record.id);
    closeModal();
    handleAddReturnInvoice();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("INFO_USER");
    if (storedUser) {
      setInfoUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if click occurs outside of it
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const dataTable: RecordType[] = dataTableInvoice.map((items, index) => ({
    stt: index + 1,
    id: items.id,
    created_date: format(new Date(items.created_date * 1000), "dd/MM/yyyy"),
    full_name: items.create_user.full_name,
    customer: items.customer.full_name,
    total_amount: items.total_amount.toLocaleString("vi-VN"),
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thời gian",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Nhân viên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Tổng cộng",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",

      render: (text, record) => (
        <Space size="middle">
          <button className="btn_return_invoice" onClick={() => detailInvoiceReturn(record)}>
            Chọn
          </button>
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
                top: "8px",
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

            <button className="btn-return-goods" onClick={addReturnInvoice} title="Trả hàng">
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
            <div ref={menuRef} className="menu-dropdown">
              <div>
                <MdOutlinePoll style={{ fontSize: "20px" }} />
                <Link to="/admin/products" style={{ textDecoration: "none", color: "black" }}>
                  <span>Trang quản lý</span>
                </Link>
              </div>
              <div onClick={clickLogoutUser}>
                <FaArrowRightFromBracket />
                <span style={{ marginLeft: "8px" }}>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="modal-background" />
          <div className="modal">
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px",
                marginLeft: "5px",
              }}
            >
              <h4>Chọn hóa đơn trả hàng</h4>
              <button className="close-modal-invoice" onClick={closeModal}>
                <IoMdClose />
              </button>
            </div>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="search_invoices">
                <span>Tìm kiếm</span>
                <input type="text" placeholder="Theo mã hóa đơn" onChange={handleSearchInvoice} />
                <input
                  type="text"
                  placeholder="Theo khách hàng hoặc ĐT"
                  onChange={handleSearchInvoice}
                />
              </div>
              <div className="table_invoices">
                <Table
                  columns={columns}
                  dataSource={dataTable}
                  locale={localInvoice}
                  pagination={paginationConfig}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderPageSales;
