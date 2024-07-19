import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Customers.css";
import "../styles/valiables.css";
import TiltleCustomer from "./TiltleCustomer/TiltleCustomer";
import HeaderCustomer from "./HeaderCustomer/HeaderCustomer";
import { Space, Table, TableColumnsType } from "antd";
import { FaTrash } from "react-icons/fa";
import { localCustomer } from "../TableConfig/TableConfig";
import ModalAddCustomers from "./HeaderCustomer/ModalAddCustomers";
interface RecordType {
  stt: number;
  barcode: string;
  created_date: string;
  full_name: string;
  customer: string;
  total_amount: number;
  key: string;
}
const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenPopupAddCustomers, setIsOpenPopupAddCustomers] = useState(false);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "account_name",
      key: "account_name",
      align: "start",
    },
    {
      title: "Số điện thoại",
      dataIndex: "account_no",
      key: "account_no",
      align: "start",
      // width: 300,
    },
    {
      title: "Số lượng đơn hàng",
      dataIndex: "bank_name",
      key: "bank_name",
      // width: 300,
    },
    {
      title: "Tổng tiền mua hàng",
      dataIndex: "total",
      key: "total",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const handleOpenModalAddCustomer = () => {
    setIsOpenPopupAddCustomers(!isOpenPopupAddCustomers);
  };
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TiltleCustomer />
        <div className="header-customers">
          <HeaderCustomer handleClickOpenModal={handleOpenModalAddCustomer} />
          <ModalAddCustomers
            isOpenPopupAddCustomers={isOpenPopupAddCustomers}
            handleOpenModalAddCustomer={handleOpenModalAddCustomer}
          />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            // dataSource={dataTable}
            locale={localCustomer}
            pagination={false}
            loading={loading}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "10px",
              marginTop: "10px",
              padding: "10px",
            }}
          >
            {/* <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChangeNumberPagination}
              defaultCurrent={1}
              total={totalPage}
            />
            <span
              className="total-items"
              style={{ color: "black" }}
            >{`${totalPage} Tài khoản`}</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
