import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeaderReturn from "./HeaderReturn/HeaderReturn";
import { Space, Table, TableColumnsType } from "antd";
import { FaTrash } from "react-icons/fa";
import { localReturn } from "../TableConfig/TableConfig";
import ReturnProduct from "../../configs/return";
import { handleError } from "../../utils/errorHandler";
interface RecordType {
  stt: number;
  full_name: string;
  phone: number | string;
  key: string;
  net_amount: number;
  total_invoice_amount: number;
}
const Return = () => {
  const [loading, setLoading] = useState(false);
  const [dataReturn, setDataReturn] = useState<any[]>([]);
  const [totalPageReturn, setTotalPageReturn] = useState(0);

  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Mã trả hàng",
      dataIndex: "full_name",
      key: "full_name",
      width: 250,
    },
    {
      title: "Người bán",
      dataIndex: "phone",
      key: "phone",
      width: 400,
    },
    {
      title: "Thời gian",
      dataIndex: "net_amount",
      key: "net_amount",
      // width: 300,
    },
    {
      title: "Khách hàng",
      dataIndex: "total_invoice_amount",
      key: "total_invoice_amount",
      // width: 300,
    },
    {
      title: "Cần trả khách",
      dataIndex: "total_invoice_amount",
      key: "total_invoice_amount",
      // width: 300,
    },
    {
      title: "Đã trả khách",
      dataIndex: "total_invoice_amount",
      key: "total_invoice_amount",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 150,
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const getDataCustomers = async () => {
    setLoading(true);
    try {
      const res = await ReturnProduct.getAll(); // Ensure getAll is called as a function
      const data = res.data.items;
      const totalPage = res.data.total;
      setDataReturn(data);
      setTotalPageReturn(totalPage);
    } catch (error) {
      console.log("err", error);
      setTimeout(() => {
        handleError(error);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataCustomers();
  }, []);

  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <div className="header-customers">
          <HeaderReturn />
        </div>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          // dataSource={dataTableCustomer}
          locale={localReturn}
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
              total={totalPageCustomer}
            />
            <span
              className="total-items"
              style={{ color: "black" }}
            >{`${totalPageCustomer} Tài khoản`}</span> */}
        </div>
      </div>
    </>
  );
};

export default Return;
