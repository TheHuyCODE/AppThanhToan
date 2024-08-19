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

interface TopCustomersProps {
  dataTopCustomer: {
    full_name: string;
    id: string;
    total_revenue: number;
  }[];
}

const CustomerDashboard: React.FC<TopCustomersProps> = ({ dataTopCustomer }) => {
  const labels = dataTopCustomer.map((item) => item.full_name); // Customer names as labels
  const profitData = dataTopCustomer.map((item) => item.total_revenue); // Total revenue data

  const data = {
    labels,
    datasets: [
      {
        label: "Total Revenue", // Updated label for clarity
        backgroundColor: "#0090da",
        hoverBackgroundColor: "#1fa2e4",
        borderRadius: 8,
        data: profitData, // Total revenue values
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const, // Position legend at the bottom
      },
      datalabels: {
        anchor: "end" as const, // Place labels at the end of bars
        align: "top" as const, // Align labels at the top
        formatter: (value: number) => `${value.toLocaleString()}`, // Format labels as number with comma
        color: "black", // Set label text color to black
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CustomerDashboard;
