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

const TopSalesProduct: React.FC = () => {
  // Dữ liệu của biểu đồ
  //   const backgroundColors = products.map(() => getRandomColor());
  //   const hoverBackgroundColors = backgroundColors.map((color: any) => color + "CC");
  const data = {
    labels: ["Bim bim", "Mực", "Mì tôm"], // Tên các sản phẩm
    datasets: [
      {
        label: "Số lượng bán ra",
        backgroundColor: `lightgreen `,
        hoverBackgroundColor: "lightgreen",
        borderRadius: 8,
        data: [100, 80, 20], // Giá trị bán ra tương ứng
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
