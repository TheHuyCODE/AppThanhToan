import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./Customers.css";
import "../styles/valiables.css";
import TiltleCustomer from "./TiltleCustomer/TiltleCustomer";
import HeaderCustomer from "./HeaderCustomer/HeaderCustomer";
import { Pagination, Space, Table, TableColumnsType } from "antd";
import { FaTrash } from "react-icons/fa";
import { localCustomer } from "../TableConfig/TableConfig";
import ModalAddCustomers from "./ModalAddCustomer/ModalAddCustomers";
import customer from "../../configs/customer";
import { handleError } from "../../utils/errorHandler";
import ModalDeleteCustomer from "./ModalDeleteCustomer/ModalDeleteCustomer";
interface RecordType {
  stt: number;
  full_name: string;
  phone: number | string;
  key: string;
  net_amount: number;
  total_invoice_amount: number;
}
const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [dataCustomer, setDataCustomer] = useState<any[]>([]);
  const [totalPageCustomer, setTotalPageCustomer] = useState(0);
  const [isIdDelete, setIsIdDelete] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenPopupAddCustomers, setIsOpenPopupAddCustomers] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const isDeleteDisabled = (full_name: string) => full_name === "Khách lẻ";
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "full_name",
      key: "full_name",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 400,
    },
    {
      title: "Tổng tiền hóa đơn",
      dataIndex: "net_amount",
      key: "net_amount",
      // width: 300,
    },
    {
      title: "Tổng bán trừ trả hàng",
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
          <button
            hidden={isDeleteDisabled(record.full_name)}
            title="Xóa"
            onClick={() => handleClickDeleteCustomer(record)}
            style={{ backgroundColor: "transparent", cursor: "pointer" }}
          >
            <FaTrash style={{ color: "red" }} />
          </button>
        </Space>
      ),
    },
  ];
  const dataTableCustomer: RecordType[] = dataCustomer.map((items, index) => ({
    stt: index + 1,
    full_name: items.full_name,
    phone: items.phone || "-",
    net_amount: items.net_amount.toLocaleString("vi-VN") || 0,
    total_invoice_amount: items.total_invoice_amount.toLocaleString("vi-VN") || 0,
    key: items.id,
  }));
  const handleClickDeleteCustomer = (record: any) => {
    const id = record.key;
    console.log("record", record);
    setOpenModalDelete(!openModalDelete);
    setIsIdDelete(id);
  };
  const handleOpenModalAddCustomer = () => {
    setIsOpenPopupAddCustomers(!isOpenPopupAddCustomers);
  };
  const onCloseModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const getDataCustomers = async () => {
    setLoading(true);
    try {
      const res = await customer.getAll();
      const dataCustomer = res.data.items;
      const totalPage = res.data.total;
      setDataCustomer(dataCustomer);
      setTotalPageCustomer(totalPage);
      setLoading(false);
    } catch (error) {
      console.log("err", error);
      setTimeout(() => {
        handleError(error);
      }, 1000);
      setLoading(false);
    }
  };
  const onShowSizeChange = (current: number, size: number) => {
    console.log("Current page:", current);
    console.log("Page size:", size);
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    console.log("Current page:", current);
    getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    setLoading(true);
    try {
      const res = await customer.getDataPaginationCustomer(current, size);
      if (res.data) {
        const data = res.data.items;
        setDataCustomer(data);
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
    getDataCustomers();
  }, []);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TiltleCustomer />
        <div className="header-customers">
          <HeaderCustomer
            handleClickOpenModal={handleOpenModalAddCustomer}
            setLoading={setLoading}
            setDataCustomer={setDataCustomer}
          />
          <ModalAddCustomers
            isOpenPopupAddCustomers={isOpenPopupAddCustomers}
            handleOpenModalAddCustomer={handleOpenModalAddCustomer}
            getDataCustomers={getDataCustomers}
            setLoadingSearch={setLoading}
            setIsOpenPopupAddCustomers={setIsOpenPopupAddCustomers}
          />
          <ModalDeleteCustomer
            isIdDelete={isIdDelete}
            openModalDelete={openModalDelete}
            onCloseModalDelete={onCloseModalDelete}
            setLoadingDelete={setLoading}
            getDataCustomers={getDataCustomers}
          />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableCustomer}
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
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChangeNumberPagination}
              defaultCurrent={1}
              total={totalPageCustomer}
            />
            <span
              className="total-items"
              style={{ color: "black" }}
            >{`${totalPageCustomer} Tài khoản`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
