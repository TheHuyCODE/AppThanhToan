import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import plugin
ChartJS.register(CategoryScale, LinearScale, Title, BarElement, Tooltip, Legend, ChartDataLabels);
interface BarChartProps {
  dataRevenue: {
    date: string;
    profit: number;
    revenue: number;
  }[];
}
const BarChart: React.FC<BarChartProps> = ({ dataRevenue }) => {
  const labels = dataRevenue?.map((item) => item.date); // Sử dụng ngày làm nhãn
  const profitData = dataRevenue?.map((item) => item.profit); // Lợi nhuận
  const revenueData = dataRevenue?.map((item) => item.revenue);
  // Dữ liệu của biểu đồ

  const data = {
    labels, // Sử dụng labels được map từ dataRevenue
    datasets: [
      {
        label: "Lợi nhuận",
        backgroundColor: "#0090da",
        hoverBackgroundColor: "#1fa2e4",
        borderRadius: 8,
        data: profitData,
      },
      {
        label: "Doanh thu",
        backgroundColor: "#4bac4d",
        hoverBackgroundColor: "lightgreen",
        borderRadius: 8,
        data: revenueData,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const, // Đặt legend xuống dưới biểu đồ
      },
      datalabels: {
        anchor: "end" as const, // Sử dụng 'end' làm giá trị hợp lệ
        align: "top" as const, // Sử dụng 'top' làm giá trị hợp lệ
        formatter: (value: number) => `${value}`, // Định dạng hiển thị của số liệu
        color: "black", // Màu chữ của data label
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
