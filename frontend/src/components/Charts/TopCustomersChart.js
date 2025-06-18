// TopCustomersChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// ✅ Register Chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopCustomersChart = ({ startDate, endDate }) => {
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    let url = "http://127.0.0.1:8000/top-customers/";
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTopCustomers(data))
      .catch((err) => console.error("Error fetching top customers:", err));
  }, [startDate, endDate]);

  const chartData = {
    labels: topCustomers.map((c) => c.customer),
    datasets: [
      {
        label: "Total Spent (₱)",
        data: topCustomers.map((c) => c.total_spent),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
      title: {
        display: true,
        text: "Top Customers by Spending",
        color: "white",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { beginAtZero: true, ticks: { color: "white" } },
    },
  };

  return topCustomers.length > 0 ? (
    <Bar data={chartData} options={chartOptions} />
  ) : (
    <p className="text-white">Loading chart...</p>
  );
};

export default TopCustomersChart;
