import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeaderReturn from "./HeaderReturn/HeaderReturn";
import { Pagination, Space, Table, TableColumnsType } from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import "./return.css";
import "../styles/valiables.css";
import { localReturn } from "../TableConfig/TableConfig";
import returnProduct from "../../configs/return";
import { handleError } from "../../utils/errorHandler";
import { format } from "date-fns";
import ModalDeleteReturn from "./ModalDeleteReturn/ModalDeleteReturn";
import ModalDetailReturn from "./ModalDetailReturn/ModalDetailReturn";
interface RecordType {
  stt: number;
  id: string;
  created_date: string;
  create_user: string;
  full_name: string;
  total_amount: number;
  total_product: number;
  // created_user_id: string;
  invoice_id: string;
  reason: string;
  key: string;
}
const Return = () => {
  const [loading, setLoading] = useState(false);
  const [dataReturn, setDataReturn] = useState<any[]>([]);
  const [totalPageReturn, setTotalPageReturn] = useState(0);
  const [idDeleteReturn, setIdDeleteReturn] = useState("");
  const [detailReturn, setDetailReturn] = useState({});
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);

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
      width: 200,
    },
    {
      title: "Người bán",
      dataIndex: "create_user",
      key: "create_user",
      width: 200,
    },
    {
      title: "Thời gian",
      dataIndex: "created_date",
      key: "created_date",
      width: 200,
    },
    {
      title: "Khách hàng",
      dataIndex: "full_name",
      key: "full_name",
      width: 250,
    },

    {
      title: "Tiền tiền trả khách",
      dataIndex: "total_amount",
      key: "total_amount",
      width: 150,
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      // align: "center",
      width: 200,
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => handleDetailReturn(record)} title="Xem" />
          </a>
          <a>
            <FaTrash
              style={{ color: "red" }}
              onClick={() => handleDeleteModalReturn(record)}
              title="Xóa"
            />
          </a>
        </Space>
      ),
    },
  ];

  const dataTableReturn: RecordType[] = dataReturn.map((items, index) => ({
    stt: index + 1,
    id: items.id,
    created_date: format(new Date(items.created_date * 1000), "dd/MM/yyyy"),
    create_user: items.create_user.full_name,
    full_name: items.customer.full_name,
    total_amount: items.total_amount.toLocaleString("vi-VN"),
    total_product: items.total_product || 0,
    reason: items.reason,
    invoice_id: items.invoice_id,
    key: items.id,
  }));
  const handleDetailReturn = (record: any) => {
    setIsOpenModalDetail(true);
    console.log("record", record);
    setDetailReturn(record);
  };
  const onCloseModalDetail = () => {
    setIsOpenModalDetail(!isOpenModalDetail);
  };
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
          <HeaderReturn
            setLoading={setLoading}
            setDataReturn={setDataReturn}
            getDataReturn={getDataReturn}
          />
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
          } hóa đơn trả hàng`}</span>
        </div>
      </div>
      <ModalDeleteReturn
        isOpenModalDelete={isOpenModalDelete}
        onCloseModalDelete={onCloseModalDelete}
        setLoading={setLoading}
        idDeleteReturn={idDeleteReturn}
        getDataReturn={getDataReturn}
      />
      <ModalDetailReturn
        onCloseModalDetail={onCloseModalDetail}
        isOpenModalDetail={isOpenModalDetail}
        detailReturn={detailReturn}
      />
    </>
  );
};

export default Return;
