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

const BarChart = () => {
  // Dữ liệu của biểu đồ
  const data = {
    labels: ["JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
    datasets: [
      {
        label: "Lợi nhuận",
        backgroundColor: "#0090da",
        hoverBackgroundColor: "#1fa2e4",
        borderRadius: 8,
        data: [40, 50, 60, 70, 80, 0, 0], // Dữ liệu cho doanh thu
      },
      {
        label: "Doanh thu",
        backgroundColor: "#4bac4d",
        hoverBackgroundColor: "lightgreen",
        borderRadius: 8,
        data: [20, 30, 40, 50, 60, 70, 80], // Dữ liệu cho lợi nhuận
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

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
