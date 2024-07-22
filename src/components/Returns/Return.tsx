import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeaderReturn from "./HeaderReturn/HeaderReturn";
import { Pagination, Space, Table, TableColumnsType } from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import { localReturn } from "../TableConfig/TableConfig";
import returnProduct from "../../configs/return";
import { handleError } from "../../utils/errorHandler";
import { format } from "date-fns";
import ModalDeleteReturn from "./ModalDeleteReturn/ModalDeleteReturn";
interface RecordType {
  stt: number;
  id: string;
  // full_name: string;
  created_date: number;
  key: string;
  total_amount: number;
  total_product: number;
  created_user_id: string;
  invoice_id: string;
}
const Return = () => {
  const [loading, setLoading] = useState(false);
  const [dataReturn, setDataReturn] = useState<any[]>([]);
  const [totalPageReturn, setTotalPageReturn] = useState(0);
  const [idDeleteReturn, setIdDeleteReturn] = useState("");

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Mã trả hàng",
      dataIndex: "id",
      key: "id",
      width: 250,
    },
    {
      title: "Người bán",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "Thời gian",
      dataIndex: "created_date",
      key: "created_date",
      // width: 300,
    },
    {
      title: "Khách hàng",
      dataIndex: "total_invoice_amount",
      key: "total_invoice_amount",
      // width: 300,
    },

    {
      title: "Tiền tiền trả khách",
      dataIndex: "total_amount",
      key: "total_amount",
      // width: 300,
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 150,
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaEye />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} onClick={() => handleDeleteModalReturn(record)} />
          </a>
        </Space>
      ),
    },
  ];

  const dataTableReturn: RecordType[] = dataReturn.map((items, index) => ({
    stt: index + 1,
    id: items.id,
    created_date: format(new Date(items.created_date * 1000), "dd/MM/yyyy"),
    // create_user: items.create_user.full_name,
    // full_name: items.customer.full_name,
    total_amount: items.total_amount.toLocaleString("vi-VN"),
    key: items.id,
  }));
  const handleDeleteModalReturn = (record: any) => {
    console.log("111");
    setIsOpenModalDelete(true);
    setIdDeleteReturn(record.id);
  };
  const onCloseModalDelete = () => {
    setIsOpenModalDelete(!isOpenModalDelete);
  };
  const getDataReturn = async () => {
    setLoading(true);
    try {
      const res = await returnProduct.getAll(); // Ensure getAll is called as a function
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
  const onShowSizeChange = (current: number, size: number) => {
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    // getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    setLoading(true);
    try {
      const res = await returnProduct.getDataPagination(current, size);
      if (res.data) {
        const data = res.data.items;
        setDataReturn(data);
        setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataReturn();
  }, []);

  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
          Quản lí hóa đơn trả hàng
        </h1>
        <div className="header-customers">
          <HeaderReturn setLoading={setLoading} setDataReturn={setDataReturn} />
        </div>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={dataTableReturn}
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
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangeNumberPagination}
            defaultCurrent={1}
            total={totalPageReturn || 0}
          />
          <span className="total-items" style={{ color: "black" }}>{`${
            dataReturn.length || 0
          } Hóa đơn trả hàng`}</span>
        </div>
      </div>
      <ModalDeleteReturn
        isOpenModalDelete={isOpenModalDelete}
        onCloseModalDelete={onCloseModalDelete}
        setLoading={setLoading}
        idDeleteReturn={idDeleteReturn}
        getDataReturn={getDataReturn}
      />
    </>
  );
};

export default Return;
