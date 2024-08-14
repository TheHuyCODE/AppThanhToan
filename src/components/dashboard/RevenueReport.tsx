import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { DatePicker, Space } from "antd";
import moment, { Moment } from "moment";
import dashboard from "../../configs/dashboard";
import { handleError } from "../../utils/errorHandler";

const RevenueReport: React.FC = () => {
  const { RangePicker } = DatePicker;

  // Get current date timestamp
  const todayTimestamp = moment().valueOf();

  // Initialize state with today's date as default
  const [valueInputTime, setValueInputTime] = useState({
    start_date: todayTimestamp,
    end_date: todayTimestamp,
    group_by: 1,
  });

  const handleDateChange = (
    dates: [Moment | null, Moment | null],
    dateStrings: [string, string]
  ) => {
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

  useEffect(() => {
    getDataRevenueDashboard();
  }, [valueInputTime]);

  return (
    <div>
      <h1>Đây là trang báo cáo doanh thu</h1>
      <div className="input_date_dashboard">
        <Space direction="vertical" size={12} />
        <RangePicker onChange={handleDateChange} />
        <DatePicker onChange={(date, dateString) => console.log(date, dateString)} picker="week" />
        <DatePicker onChange={(date, dateString) => console.log(date, dateString)} picker="month" />
        <DatePicker onChange={(date, dateString) => console.log(date, dateString)} picker="year" />
      </div>
      <BarChart />
    </div>
  );
};

export default RevenueReport;
