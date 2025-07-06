import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const SalesLineChart = ({ startDate, endDate }) => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        let url = "http://127.0.0.1:8000/daily-sales/";
        if (startDate && endDate) {
            url += `?start_date=${startDate}&end_date=${endDate}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setSalesData(data))
            .catch((err) => console.error("Failed to load sales data", err));
    }, [startDate, endDate]);

    const chartData = {
        labels: salesData.map((entry) => entry.date),
        datasets: [
            {
                label: "Daily Sales (₱)",
                data: salesData.map((entry) => entry.total_sales),
                fill: false,
                borderColor: "rgba(59, 130, 246, 0.8)",
                backgroundColor: "rgba(59, 130, 246, 1)",
                tension: 0.4,
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: "white" } },
            title: {
                display: true,
                text: "Sales from Selected Dates",
                color: "white",
                font: { size: 18 },
            },
        },
        scales: {
            x: { ticks: { color: "white" } },
            y: {
                beginAtZero: true,
                ticks: { color: "white" },
            },
        },
    };

    return (
        <div className="bg-gray-600 p-4 rounded">
            <h2 className="text-white font-semibold mb-2">Sales Line Chart</h2>
            <div className="w-full" style={{ height: "300px" }}>
                {salesData.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <p className="text-white">No sales data available.</p>
                )}
            </div>
        </div>
    );
};

export default SalesLineChart;
