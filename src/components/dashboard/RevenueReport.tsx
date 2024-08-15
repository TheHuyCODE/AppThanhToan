import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { DatePicker, Space, Radio, RadioChangeEvent } from "antd";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import dashboard from "../../configs/dashboard";
import { handleError } from "../../utils/errorHandler";
import "./RevenueReport.css";
import QuantityDashboard from "./QuantityDashboard";
import TopSalesProduct from "./TopSalesProduct";

const RevenueReport: React.FC = () => {
  const { RangePicker } = DatePicker;
  const [dateType, setDateType] = useState<string>("date"); // State to manage the selected Radio button
  const todayTimestamp = dayjs().valueOf(); // Use dayjs to get the current timestamp
  // Initialize state with today's date as default
  const [valueInputTime, setValueInputTime] = useState({
    start_date: todayTimestamp,
    end_date: todayTimestamp,
    group_by: 0,
  });

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    // Update the type here
    if (dates) {
      const [startDate, endDate] = dates;
      const startTimestamp = startDate ? startDate.valueOf() : todayTimestamp;
      const endTimestamp = endDate ? endDate.valueOf() : todayTimestamp;
      setValueInputTime({
        start_date: startTimestamp,
        end_date: endTimestamp,
        group_by: valueInputTime.group_by,
      });
      console.log("Start Timestamp:", startTimestamp);
      console.log("End Timestamp:", endTimestamp);
    }
  };

  const getDataRevenueDashboard = async () => {
    try {
      const res = await dashboard.getAll(
        valueInputTime.start_date,
        valueInputTime.end_date,
        valueInputTime.group_by
      );
      console.log("res", res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const placementChange = (e: RadioChangeEvent) => {
    setDateType(e.target.value);
  };

  useEffect(() => {
    getDataRevenueDashboard();
  }, [valueInputTime]);

  return (
    <>
      <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
        Báo cáo
      </h1>
      <QuantityDashboard />
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
