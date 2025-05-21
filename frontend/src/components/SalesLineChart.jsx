import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const SalesLineChart = ({ startDate, endDate }) => {
  const [shoeName, setShoeName] = useState("");
  const [metrics, setMetrics] = useState(["totalSales", "totalClicks"]);
  const [chartData, setChartData] = useState(null);
  const [shoeOptions, setShoeOptions] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/sales/shoes")
    .then((res) => res.json())
    .then((data) => {
      setShoeOptions(data);
      if (data.length > 0) setShoeName(data[0]);  // set first shoe as selected by default
    });
}, []);
 

  useEffect(() => {
    if (!startDate || !endDate || !shoeName || metrics.length === 0) return;

    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/sales/daily?startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}&shoeName=${shoeName}`
      );
      const rawData = await res.json();

      const labels = rawData.map((entry) => entry._id.split("T")[0]);
      const datasets = metrics.map((metric) => ({
        label: metric,
        data: rawData.map((entry) => entry[metric]),
        borderColor: metric === "totalSales" ? "blue" : "green",
        fill: false,
      }));

      setChartData({ labels, datasets });
    };

    fetchData();
  }, [startDate, endDate, shoeName, metrics]);

  return (
    <div>
      <h2>Sales Trend</h2>

      <div>
        <label>Select Shoe: </label>
        <select onChange={(e) => setShoeName(e.target.value)} value={shoeName}>
          <option value="">--Select--</option>
          {shoeOptions.map((shoe, idx) => (
            <option key={idx} value={shoe}>
              {shoe}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Metrics (max 2): </label>
        <select
          multiple
          value={metrics}
          onChange={(e) =>
            setMetrics([...e.target.selectedOptions].map((o) => o.value).slice(0, 2))
          }
        >
          <option value="totalSales">Sales</option>
          <option value="totalAdvertisingCost">Advertising Cost</option>
          <option value="totalImpressions">Impressions</option>
          <option value="totalClicks">Clicks</option>
        </select>
      </div>

      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default SalesLineChart;
