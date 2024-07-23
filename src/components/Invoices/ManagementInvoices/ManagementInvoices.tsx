import React, { useState, useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaArrowUp, FaEye, FaTrash } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
import HeaderInvoices from "./HeaderInvoices";
import { Pagination, Space, Table, TableColumnsType } from "antd";
import { localInvoice } from "../../TableConfig/TableConfig";
import invoice from "../../../configs/invoice";
import { format } from "date-fns";
import ModalDeleteInvoices from "../ModalDeleteInvoices/ModalDeleteInvoices";
import { ToastContainer } from "react-toastify";
import ModalDetailInvoice from "../ModalDetailInvoice/ModalDetailInvoice";

interface RecordType {
  stt: number;
  barcode: string;
  created_date: string;
  create_user: string;
  full_name: string;
  total_amount: number;
  customer_money: string;
  payment_methods: string;
  total_product: number;
  discount: string;
  refund: number;
  key: string;
  product: [];
}

const ManagementInvoices: React.FC = () => {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [idDelete, setIdDelete] = useState("");
  const [dataDetail, setDataDetail] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalModify, setOpenModalModify] = useState(false);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataTableInvoice, setDataTableInvoice] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<{
    key: string | null;
    direction: string | null;
  }>({
    key: null,
    direction: null,
  });

  useEffect(() => {
    getDataInvoices();
  }, []);

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
  const handleClickDeleteInvoices = (record: any) => {
    console.log("record", record);
    const IdDelete = record.key;
    setIdDelete(IdDelete);
    setOpenModalDelete(!openModalDelete);
  };
  const handleClickDetailInvoices = (record: any) => {
    console.log("record", record);
    setOpenModalModify(true);
    setDataDetail(record);
  };
  const onCloseModal = () => {
    setOpenModalDelete(false);
    console.log("openModalDelete", openModalDelete);
  };
  const onCloseModalModify = () => {
    setOpenModalModify(!openModalModify);
  };
  const getColumnTitle = (title: string, key: string) => (
    <div
      className="table-header"
      onClick={() => handleHeaderClick(key)}
      onMouseEnter={() => setHoveredColumn(key)}
      onMouseLeave={() => setHoveredColumn(null)}
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

  const getDataInvoices = async () => {
    setLoading(true);
    try {
      const res = await invoice.getAllInvoices();
      if (res.code === 200) {
        const data = res.data.items;
        const totalData = res.data.total;
        console.log("dataInvoice", data);
        setDataTableInvoice(data);
        setTotalInvoice(totalData);
        setLoading(false);
      } else {
        console.log("message", res.data);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: getColumnTitle(`Mã đơn hàng`, "barcode"),
      dataIndex: "barcode",
      key: "barcode",
      align: "center",
      // width: 250,
    },
    {
      title: getColumnTitle(`Người tạo hóa đơn`, "create_user"),
      dataIndex: "create_user",
      key: "create_user",
      align: "center",
      width: 200,
    },
    {
      title: getColumnTitle(`Khách hàng`, "full_name"),
      dataIndex: "full_name",
      key: "full_name",
      align: "center",

      // width: 300,
    },
    {
      title: getColumnTitle(`Ngày tạo`, "created_date"),
      dataIndex: "created_date",
      key: "created_date",
      align: "center",

      // width: 300,
    },
    {
      title: getColumnTitle(`Tổng tiền`, "total_amount"),
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",

      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,

      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => handleClickDetailInvoices(record)} />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} onClick={() => handleClickDeleteInvoices(record)} />
          </a>
        </Space>
      ),
    },
  ];
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
      const res = await invoice.getDataPagination(current, size);
      if (res.data) {
        const data = res.data.items;
        setDataTableInvoice(data);
        setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const dataTable: RecordType[] = dataTableInvoice.map((items, index) => ({
    stt: index + 1,
    barcode: items.id,
    created_date: format(new Date(items.created_date * 1000), "dd/MM/yyyy"),
    create_user: items.create_user.full_name,
    full_name: items.customer.full_name,
    customer_money: items.customer_money.toLocaleString("vi-VN"),
    total_amount: items.total_amount.toLocaleString("vi-VN"),
    payment_methods: items.payment_methods[0].payment_method_name,
    product: items.product,
    discount: items.discount.toLocaleString("vi-VN") || 0,
    total_product: items.total_product,
    refund: items.refund,
    key: items.id,
  }));

  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
          Quản lí hóa đơn
        </h1>
        <div className="header-customers">
          <HeaderInvoices
            setLoading={setLoading}
            setDataTableInvoice={setDataTableInvoice}
            getDataInvoices={getDataInvoices}
          />
        </div>

        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTable}
            locale={localInvoice}
            pagination={false}
            loading={loading}
            scroll={{
              y: 500,
            }}
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
              total={totalInvoice | 0}
            />
            <span className="total-items" style={{ color: "black" }}>{`${
              dataTable.length | 0
            } hóa đơn`}</span>
          </div>
        </div>
      </div>
      <ModalDeleteInvoices
        openModalDelete={openModalDelete}
        onCloseModal={onCloseModal}
        idDelete={idDelete}
        getDataInvoices={getDataInvoices}
        setLoading={setLoading}
      />
      <ModalDetailInvoice
        openModalModify={openModalModify}
        onCloseModalModify={onCloseModalModify}
        dataDetail={dataDetail}
      />
    </>
  );
};

export default ManagementInvoices;
