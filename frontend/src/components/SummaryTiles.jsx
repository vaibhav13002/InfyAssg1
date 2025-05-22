  import React from "react";

  const SummaryTiles = ({ summary }) => {
    if (!summary) return <p>Loading summary...</p>;

    // Check if all summary values are zero or missing
    const isEmptyData =
      !summary.totalSales &&
      !summary.totalAdvertisingCost &&
      !summary.totalImpressions &&
      !summary.totalClicks;

    if (isEmptyData) {
      return <p>No sales data available for the selected date range.</p>;
    }

    return (
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={tileStyle}>Total Sales: ₹{summary.totalSales}</div>
        <div style={tileStyle}>Ad Cost: ₹{summary.totalAdvertisingCost}</div>
        <div style={tileStyle}>Impressions: {summary.totalImpressions}</div>
        <div style={tileStyle}>Clicks: {summary.totalClicks}</div>
      </div>
    );
  };

  const tileStyle = {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
    background: "#007bff", // Blue background
    color: "#fff",          // White text
    fontWeight: "bold",
    textAlign: "center",    // Optional: for better alignment
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
  };


  export default SummaryTiles;
