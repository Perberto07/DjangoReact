import React, { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import TopCustomersChart from "../../../components/Charts/TopCustomersChart";
import TopProductsChart from "../../../components/Charts/TopProductsChart";
import SalesLineChart from "../../../components/Charts/SalesLineChart";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <DashboardLayout>
      <div className=" w-full min-h-screen p-4 space-y-4">
        {/* Date Filter Form */}
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2 "
        >
          <input
            type="date"
            className="bg-white px-2 py-1 rounded text-black"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="bg-white px-2 py-1 rounded text-black"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white transition text-black px-4 py-1 rounded"
          >
            Filter
          </button>
        </form>

        {/* Sales Line Chart */}
        <div className="w-full bg-gray-600 p-4 rounded shadow">
          <SalesLineChart startDate={startDate} endDate={endDate} />
        </div>

        {/* Top Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-600 p-4 rounded shadow">
            <TopCustomersChart startDate={startDate} endDate={endDate} />
          </div>
          <div className="bg-gray-600 p-4 rounded shadow">
            <TopProductsChart startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
