import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { DatePicker, Space, Radio, RadioChangeEvent } from "antd";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import dashboard from "../../configs/dashboard";
import { handleError } from "../../utils/errorHandler";
import "./RevenueReport.css";
import QuantityDashboard from "./QuantityDashboard";
import TopSalesProduct from "./TopSalesProduct";
import invoice from "../../configs/invoice";
import products from "../../configs/products";
import returnProduct from "../../configs/return";

const RevenueReport: React.FC = () => {
  const { RangePicker } = DatePicker;
  const [dateType, setDateType] = useState<string>("date");
  const [dataRevenue, setDataRevenue] = useState([]);
  const todayTimestamp = Math.floor(dayjs().startOf("day").valueOf() / 1000);
  console.log("todayTimestamp", todayTimestamp); // Use dayjs to get the current timestamp
  const [valueInputTime, setValueInputTime] = useState({
    start_date: todayTimestamp,
    end_date: todayTimestamp,
    group_by: 0,
  });
  const [totalDataDashboard, setTotalDataDashboard] = useState({
    totalInvoice: 0,
    totalRevenue: 0,
    totalProduct: 0,
    totalReturn: 0,
  });
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    // Update the type here
    if (dates) {
      const [startDate, endDate] = dates;
      const startTimestamp = startDate ? Math.floor(startDate.valueOf() / 1000) : todayTimestamp;
      const endTimestamp = endDate ? Math.floor(endDate.valueOf() / 1000) : todayTimestamp;
      setValueInputTime({
        start_date: startTimestamp,
        end_date: endTimestamp,
        group_by: valueInputTime.group_by,
      });
    }
  };

  const getDataRevenueDashboard = async () => {
    try {
      const res = await dashboard.getAll(
        valueInputTime.start_date,
        valueInputTime.end_date,
        valueInputTime.group_by
      );
      const data = res.data;
      setDataRevenue(data);
    } catch (error) {
      handleError(error);
    }
  };

  const placementChange = (e: RadioChangeEvent) => {
    setDateType(e.target.value);
  };
  const getDataInvoice = async () => {
    try {
      const res = await invoice.getAll();
      const totalInvoice = res.data.total;
      setTotalDataDashboard((prevState) => ({
        ...prevState,
        totalInvoice: totalInvoice,
      }));
      // or console.log("response data", res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  const getDataProduct = async () => {
    try {
      const res = await products.getAllTotal();
      const totalProduct = res.data.total;
      setTotalDataDashboard((prevState) => ({
        ...prevState,
        totalProduct: totalProduct,
      }));
      // or console.log("response data", res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  const getDataRevenueDay = async () => {
    try {
      const res = await dashboard.getAll(todayTimestamp, todayTimestamp, 0);
      const totalRevenue = res.data[0]?.revenue || 0;
      console.log("totalRevenue", totalRevenue);
      setTotalDataDashboard((prevState) => ({
        ...prevState,
        totalRevenue: totalRevenue,
      }));
    } catch (error) {
      console.error("error", error);
      handleError(error);
    }
  };
  const getDataReturn = async () => {
    try {
      const res = await returnProduct.getAllTotal();
      const totalReturn = res.data.total;
      setTotalDataDashboard((prevState) => ({
        ...prevState,
        totalReturn: totalReturn,
      }));
      // or console.log("response data", res.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getDataRevenueDashboard();
  }, [valueInputTime]);
  useEffect(() => {
    getDataRevenueDay();
    getDataInvoice();
    getDataProduct();
    getDataReturn();
  }, []);
  return (
    <>
      <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
        Báo cáo
      </h1>
      <QuantityDashboard totalDataDashboard={totalDataDashboard} />
      <div className="dashboard_revenue">
        <h2>Đồ thị doanh thu</h2>
        <div className="header_revenue">
          <Space direction="vertical" size={12} />
          {dateType === "date" && <RangePicker onChange={handleDateChange} size={"large"} />}
          {dateType === "week" && (
            <RangePicker picker="week" onChange={handleDateChange} size={"large"} />
          )}
          {dateType === "month" && (
            <RangePicker picker="month" onChange={handleDateChange} size={"large"} />
          )}
          {dateType === "year" && (
            <RangePicker picker="year" onChange={handleDateChange} size={"large"} />
          )}
          <Radio.Group
            value={dateType}
            onChange={placementChange}
            style={{ color: "black" }}
            size={"large"}
          >
            <Radio.Button value="date">Ngày</Radio.Button>
            <Radio.Button value="week">Tuần</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>
        </div>
        <BarChart />
      </div>
      <div className="dashboard_top_product_sales">
        <h2>Top sản phẩm bán chạy</h2>
        <TopSalesProduct />
      </div>
    </>
  );
};

export default RevenueReport;
