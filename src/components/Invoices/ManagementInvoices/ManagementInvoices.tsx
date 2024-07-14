import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaPencilAlt,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import HeaderInvoices from "./HeaderInvoices";
import { Space, Table } from "antd";
import { localInvoice } from "../../TableConfig/TableConfig";

const ManagementInvoices = () => {
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [sortedColumn, setSortedColumn] = useState({
    key: null,
    direction: null,
  });
  const handleHeaderClick = (key: string) => {
    setSortedColumn((prevState) => {
      if (prevState.key === key) {
        const newDirection = prevState.direction === "up" ? "down" : "up";
        console.log(`New direction for column ${key}: ${newDirection}`);
        return { key, direction: newDirection };
      }
      console.log(`Sorting direction for column ${key}: up`);
      return { key, direction: "up" };
    });
  };
  const getColumnTitle = (title: string, key: string) => (
    <div
      className="table-header"
      onClick={() => handleHeaderClick(key)}
      onMouseEnter={() => setHoveredColumn(key)}
      onMouseLeave={() => setHoveredColumn(null)}
      // style={{ position: "relative", width: width }}
    >
      <span style={{ display: "block" }}>{title}</span>
      <div className="arrow-icon-container">
        {sortedColumn.key === key && sortedColumn.direction === "up" && (
          <FaArrowUp className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key === key && sortedColumn.direction === "down" && (
          <FaArrowDown className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key !== key && hoveredColumn === key && (
          <FaArrowUp className="arrow-icon arrow-icon-hover arrow-icon-visible" />
        )}
      </div>
    </div>
  );
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: getColumnTitle(`Mã đơn hàng`, "barcode"),
      dataIndex: "barcode",
      key: "barcode",
      align: "start",
      // width: 130,
    },
    {
      defaultSortOrder: "descend",
      title: getColumnTitle(`Khách hàng`, "name"),
      dataIndex: "name",
      key: "name",
      align: "start",
    },

    {
      title: "Tổng tiền",
      dataIndex: "gender",
      key: "gender",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaEye />
          </a>
          <a>
            <FaPencilAlt />
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="content">
      <h1
        style={{
          fontFamily: "var( --kv-font-sans-serif)",
          color: "var(--color-title)",
        }}
      >
        Quản lí hóa đơn
      </h1>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          color: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <HeaderInvoices />
        {/* <Modal
          okButtonProps={{ style: { backgroundColor: "red" } }}
          width={600}
          centered
          open={openModalDeleteProduct}
          onOk={handleDeleteProduct}
          onCancel={() => setOpenModalDeleteProduct(!openModalDeleteProduct)}
          okText="Xóa"
          cancelText="Hủy bỏ"
        >
          <h1
            style={{
              fontFamily: "Arial",
              fontSize: "30px",
              fontWeight: "bold",
              padding: "5px 10px",
              marginBottom: "6px",
            }}
          >
            Xóa sản phẩm
          </h1>
          <span style={{ fontSize: "15px", padding: "5px 10px" }}>
            Bạn chắc chắn muốn xóa sản phẩm này không?
          </span>
        </Modal> */}
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          // dataSource={dataSource}
          locale={localInvoice}
          pagination={false}
          onHeaderRow={(columns, index) => {
            return {
              onClick: () => {}, // click header row
            };
          }}
        />
        {/* <span className="total-items">{`${dataSource?.length} items`}</span> */}
      </div>
    </div>
  );
};

export default ManagementInvoices;
