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
import ButtonExportToExcel from "../UI/ButtonExport";
import { FILE_NAME_EXPORT_REVENNUE, LINK_EXPORT_REVENUE } from "../../constants/constants";
import { getDateTimeNow } from "../../constants/functionContants";

const { RangePicker } = DatePicker;

const RevenueReport: React.FC = () => {
  const fileName = `${FILE_NAME_EXPORT_REVENNUE}_${getDateTimeNow()}`;
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [dateType, setDateType] = useState<"date" | "month" | "year">("date");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  ]);
  // const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
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
  const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    if (dates) {
      setDateRange(dates);
      let startTimestamp: number, endTimestamp: number;

      switch (dateType) {
        case "date":
          startTimestamp = dates[0].startOf("day").unix();
          endTimestamp = dates[1].endOf("day").unix();
          break;
        case "month":
          startTimestamp = dates[0].startOf("month").unix();
          endTimestamp = dates[1].endOf("month").unix();
          break;
        case "year":
          startTimestamp = dates[0].startOf("year").unix();
          endTimestamp = dates[1].endOf("year").unix();
          break;
      }

      setValueInputTime({
        start_date: startTimestamp,
        end_date: endTimestamp,
        group_by: dateType === "date" ? 0 : dateType === "month" ? 1 : 2,
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
      console.log("data111", data);
      setDataRevenue(data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDateTypeChange = (e: RadioChangeEvent) => {
    setDateType(e.target.value);
    // Reset the date range when changing type
    handleDateRangeChange([dateRange[0], dateRange[1]]);
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
          <div className="header_revenue_date">
            <Space direction="vertical" size={12}>
              <RangePicker
                picker={dateType}
                //@ts-ignore
                onChange={handleDateRangeChange}
                size="large"
                value={dateRange}
                format={
                  dateType === "date" ? "DD/MM/YYYY" : dateType === "month" ? "MM/YYYY" : "YYYY"
                }
              />
            </Space>
            <Radio.Group
              value={dateType}
              onChange={handleDateTypeChange}
              style={{ color: "black" }}
              size="large"
            >
              <Radio.Button value="date">Ngày</Radio.Button>
              <Radio.Button value="month">Tháng</Radio.Button>
              <Radio.Button value="year">Năm</Radio.Button>
            </Radio.Group>
          </div>
          <div className="style_export_btn_revenue">
            <ButtonExportToExcel linkExport={LINK_EXPORT_REVENUE} fileName={fileName} />
          </div>
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
