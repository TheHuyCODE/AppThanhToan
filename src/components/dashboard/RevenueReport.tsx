import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { DatePicker, Space, Radio, RadioChangeEvent, Select } from "antd";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import dashboard from "../../configs/dashboard";
import { handleError } from "../../utils/errorHandler";
import "./RevenueReport.css";
import QuantityDashboard from "./QuantityDashboard";
import TopSalesProduct from "./TopSalesProduct";
import invoice from "../../configs/invoice";
import products from "../../configs/products";
import returnProduct from "../../configs/return";
import CustomerDashboard from "./CustomerDashboard";

const RevenueReport: React.FC = () => {
  const { RangePicker } = DatePicker;
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [dateType, setDateType] = useState<string>("date");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startDateCustomer, setStartDateCustomer] = useState<Dayjs | null>(null);
  const [endDateCustomer, setEndDateCustomer] = useState<Dayjs | null>(null);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataTopSells, setDataTopSells] = useState([]);
  const [dataTopCustomer, setDataCustomer] = useState([]);
  const todayTimestamp = Math.floor(dayjs().startOf("day").valueOf() / 1000);
  const today = dayjs();
  console.log("todayTimestamp", todayTimestamp); // Use const today = dayjs(); dayjs to get the current timestamp
  const [valueInputTime, setValueInputTime] = useState({
    start_date: todayTimestamp,
    end_date: todayTimestamp,
    group_by: 0,
  });
  const [valueInputTimeTopSales, setValueInputTimeTopSales] = useState({
    start_date: todayTimestamp,
    end_date: todayTimestamp,
    top_number: 1,
  });
  const [valueInputTimeCustomer, setValueInputTimeCustomer] = useState({
    start_date_customer: todayTimestamp,
    end_date_customer: todayTimestamp,
    customer_number: 1,
  });
  const [totalDataDashboard, setTotalDataDashboard] = useState({
    totalInvoice: 0,
    totalRevenue: 0,
    totalProduct: 0,
    totalReturn: 0,
  });
  const handleChange = (value: string) => {
    const intValue = parseInt(value, 10); // Chuyển đổi value sang số nguyên
    setValueInputTimeTopSales((prev) => ({
      ...prev,
      top_number: intValue,
    }));
    console.log("valueInputTimeTopSales", valueInputTimeTopSales);
  };
  const handleChangeCustomer = (value: string) => {
    const intValue = parseInt(value, 10); // Chuyển đổi value sang số nguyên
    setValueInputTimeCustomer((prev) => ({
      ...prev,
      customer_number: intValue,
    }));
    console.log("valueInputTimeTopSales", valueInputTimeTopSales);
  };
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
  const handleStartDateChange = (date: Dayjs | null) => {
    const startTimestamp = date ? Math.floor(date.valueOf() / 1000) : todayTimestamp;
    setStartDate(date);
    if (endDate && date && endDate.isBefore(date, "day")) {
      setEndDate(null); // Xóa ngày kết thúc nếu nó nhỏ hơn ngày bắt đầu mới
    }
    setValueInputTimeTopSales((prev) => ({
      ...prev,
      start_date: startTimestamp,
    }));
    console.log("valueInputTimeTopSales", valueInputTimeTopSales);
  };
  const handleStartDateChangeCustomer = (date: Dayjs | null) => {
    const startTimestamp = date ? Math.floor(date.valueOf() / 1000) : todayTimestamp;
    setStartDateCustomer(date);
    if (endDateCustomer && date && endDateCustomer.isBefore(date, "day")) {
      setEndDateCustomer(null);
    }
    setValueInputTimeCustomer((prev) => ({
      ...prev,
      start_date_customer: startTimestamp,
    }));
  };
  const handleEndDateChange = (date: Dayjs | null) => {
    const endTimestamp = date ? Math.floor(date.valueOf() / 1000) : todayTimestamp;
    setEndDate(date);
    setValueInputTimeTopSales((prev) => ({
      ...prev,
      end_date: endTimestamp,
    }));
  };
  const handleEndDateChangeCustomer = (date: Dayjs | null) => {
    const endTimestamp = date ? Math.floor(date.valueOf() / 1000) : todayTimestamp;
    setEndDateCustomer(date);
    setValueInputTimeCustomer((prev) => ({
      ...prev,
      end_date_customer: endTimestamp,
    }));
  };
  const disabledEndDate = (current: Dayjs): boolean => {
    // Ensure the function returns a boolean
    return !!(current && startDate && current.isBefore(startDate, "day"));
  };
  const disabledEndDateCustomer = (current: Dayjs): boolean => {
    return !!(current && startDateCustomer && current.isBefore(startDateCustomer, "day"));
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
  const getDataTopSellsProduct = async () => {
    try {
      const res = await dashboard.getDataTopSales(
        valueInputTimeTopSales.start_date,
        valueInputTimeTopSales.end_date,
        valueInputTimeTopSales.top_number
      );
      console.log("res", res.data);
      const data = res.data;
      setDataTopSells(data);
    } catch (error) {
      handleError(error);
    }
  };
  const getDataTopCustomer = async () => {
    try {
      const res = await dashboard.getDataTopCustomer(
        valueInputTimeCustomer.start_date_customer,
        valueInputTimeCustomer.end_date_customer,
        valueInputTimeCustomer.customer_number
      );
      const data = res.data;
      setDataCustomer(data);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getDataRevenueDashboard();
  }, [valueInputTime]);
  useEffect(() => {
    console.log("Updated state", valueInputTimeTopSales);
    getDataTopSellsProduct();
  }, [valueInputTimeTopSales]);
  useEffect(() => {
    console.log("Updated state", valueInputTimeCustomer);
    getDataTopCustomer();
  }, [valueInputTimeCustomer]);
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
        <BarChart dataRevenue={dataRevenue} />
      </div>
      <div className="dashboard_top_product_sales">
        <h2>Top sản phẩm bán chạy</h2>
        <div className="header_top_sells">
          <div className="header_top_sells_date">
            <DatePicker
              format={dateFormatList}
              onChange={handleStartDateChange}
              size={"large"}
              placeholder="Từ ngày"
              allowClear={false}
              defaultValue={today}
            />
            <DatePicker
              format={dateFormatList}
              onChange={handleEndDateChange}
              size={"large"}
              placeholder="Đến ngày"
              allowClear={false}
              defaultValue={today}
              disabledDate={disabledEndDate}
            />
          </div>
          <Select
            defaultValue="1"
            style={{ width: 130, height: 39 }}
            onChange={handleChange}
            options={[
              { value: "1", label: "1 sản phẩm" },
              { value: "5", label: "5 sản phẩm" },
              { value: "10", label: "10 sản phẩm" },
              { value: "15", label: "15 sản phẩm" },
            ]}
          />
        </div>
        <TopSalesProduct dataTopSells={dataTopSells} />
      </div>
      <div className="dashboard_top_customer">
        <h2>Top khách hàng mua nhiều nhất</h2>
        <div className="header_top_sells">
          <div className="header_top_sells_date">
            <DatePicker
              format={dateFormatList}
              onChange={handleStartDateChangeCustomer}
              size={"large"}
              placeholder="Từ ngày"
              allowClear={false}
              defaultValue={today}
            />
            <DatePicker
              format={dateFormatList}
              onChange={handleEndDateChangeCustomer}
              size={"large"}
              placeholder="Đến ngày"
              allowClear={false}
              defaultValue={today}
              disabledDate={disabledEndDateCustomer}
            />
          </div>
          <Select
            defaultValue="1"
            style={{ width: 130, height: 39 }}
            onChange={handleChangeCustomer}
            options={[
              { value: "1", label: "1 khách hàng" },
              { value: "5", label: "5 khách hàng" },
              { value: "10", label: "10 khách hàng" },
            ]}
          />
        </div>
        <CustomerDashboard dataTopCustomer={dataTopCustomer} />
      </div>
    </>
  );
};

export default RevenueReport;
