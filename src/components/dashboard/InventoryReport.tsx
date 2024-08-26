import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeaderInventory from "./HeaderInventory";
import { Pagination, Table, TableColumnsType, Tag } from "antd";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import products from "../../configs/products";
import { handleError } from "../../utils/errorHandler";
import { localeProduct } from "../TableConfig/TableConfig";
interface RecordType {
  stt: number;
  key: string;
  name: string;
  barcode: string;
  price: number | undefined;
  capital_price: number | undefined;
  unit: string;
  status: number;
}
type SortState = {
  key: string | null;
  direction: "asc" | "desc" | null;
};

const InventoryReport = () => {
  const [loading, setLoading] = useState(false);
  const [dataInventory, setDataInventory] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortedColumn, setSortedColumn] = useState<SortState>({ key: null, direction: null });
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const sortDataInventory = async (colName: string, typeSort: string) => {
    setLoading(true);
    try {
      const res = await products.sortDataInventory(colName, typeSort);
      // const totalItems = res.data.total;
      const data = res.data.inventory_report;
      // setDataProduct(res.data);
      setDataInventory(data);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
      handleError(error);
    }
  };
  const handleHeaderClick = (key: string) => {
    setSortedColumn((prevState) => {
      if (prevState.key === key) {
        const newDirection = prevState.direction === "asc" ? "desc" : "asc";
        console.log(`New direction for column ${key}: ${newDirection}`);
        sortDataInventory(key, newDirection);
        return { key, direction: newDirection };
      }
      console.log(`Sorting direction for column ${key}: asc`);
      return { key, direction: "asc" };
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
        {sortedColumn.key === key && sortedColumn.direction === "asc" && (
          <FaArrowUp className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key === key && sortedColumn.direction === "desc" && (
          <FaArrowDown className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key !== key && hoveredColumn === key && (
          <FaArrowUp className="arrow-icon arrow-icon-hover arrow-icon-visible" />
        )}
      </div>
    </div>
  );
  const getDataInventory = async () => {
    setLoading(true);
    try {
      const res = await products.getTotalInventory();
      const data = res.data.inventory_report;
      const total_data = res.data.total_products;
      setLoading(false);
      setDataInventory(data);
      setTotalProduct(total_data);
      console.log("res", res.data.inventory_report);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };
  useEffect(() => {
    getDataInventory();
  }, []);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
    },
    {
      title: getColumnTitle(`Mã vạch`, "barcode"),
      dataIndex: "barcode",
      key: "barcode",
      // width: 160,
      align: "center",
    },
    {
      title: getColumnTitle(`Tên sản phẩm`, "name"),
      dataIndex: "name",
      key: "name",
      align: "center",
      // width: 180,
    },
    {
      title: getColumnTitle(`Số lượng tồn kho`, "inventory_number"),
      dataIndex: "inventory_number",
      key: "inventory_number",
      align: "center",

      // width: 130,
    },
    {
      title: getColumnTitle(`Giá gốc`, "capital_price"),
      dataIndex: "capital_price",
      key: "capital_price",
      align: "center",
      // width: 200,
    },
    {
      title: getColumnTitle(`Giá bán`, "price"),
      dataIndex: "price",
      key: "price",
      align: "center",
      // width: 180,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      align: "start",
      // width: 150,
    },
    {
      title: "Trạng thái tồn kho",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let color = "green";
        if (status === 0) {
          color = "red";
        } else if (status === 1) {
          color = "yellow";
        }
        return (
          <Tag color={color}>
            {status === 0 ? "Hết hàng" : status === 1 ? "Sắp hết hàng" : "Bình thường"}
          </Tag>
        );
      },
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
      const res = await products.getDataPaginationInventory(current, size);
      if (res.data) {
        const data = res.data.inventory_report;
        setDataInventory(data);
        setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  };
  const dataTableInventory: RecordType[] = dataInventory.map((item: any, index: number) => ({
    stt: index + 1,
    key: item.id,
    barcode: item.barcode,
    name: item.name,
    inventory_number: item.inventory_number,
    capital_price: item.capital_price.toLocaleString("vi-VN") || 0,
    price: item.price.toLocaleString("vi-VN") || 0,
    unit: item.unit,
    status: item.status,
  }));
  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />
      <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
        Quản lý tồn kho
      </h1>
      <div className="header-customers">
        <HeaderInventory
          setDataInventory={setDataInventory}
          setLoading={setLoading}
          setTotalProduct={setTotalProduct}
        />
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={dataTableInventory}
          locale={localeProduct}
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
            total={totalProduct}
          />
          <span className="total-items" style={{ color: "black" }}>{`${
            totalProduct || 0
          } Sản phẩm`}</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
