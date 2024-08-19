import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface TopSalesProps {
  dataTopSells?: {
    id: string;
    name: string;
    total_sold: number;
  }[];
}

const TopSalesProduct: React.FC<TopSalesProps> = ({ dataTopSells = [] }) => {
  // Handle case where dataTopSells might be undefined or empty
  const labels = dataTopSells.map((item) => item.name);
  const dataValues = dataTopSells.map((item) => item.total_sold);

  const data = {
    labels, // Tên các sản phẩm
    datasets: [
      {
        label: "Số lượng bán ra",
        backgroundColor: "#f25c05",
        hoverBackgroundColor: "#f28e54",
        borderRadius: 8,
        data: dataValues, // Total sold values// Giá trị bán ra tương ứng
      },
    ],
  };

  // Cấu hình của biểu đồ
  const options = {
    indexAxis: "y" as const, // Đây là cấu hình để hiển thị cột theo chiều ngang
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopSalesProduct;
