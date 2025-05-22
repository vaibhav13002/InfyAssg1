import React from "react";

const SummaryTiles = ({ summary }) => {
  if (!summary) return <p>Loading summary...</p>;

  // Define the colors to match the SalesLineChart (smooth palette with updated Total Sales color)
  const TILE_COLORS = {
    totalSales: "rgb(42, 71, 89)", // Dark Blue-Grey for Total Sales
    totalAdvertisingCost: "#66BB6A", // Soft Green (unchanged)
    totalImpressions: "#42A5F5", // Soft Blue (unchanged)
    totalClicks: "#AB47BC"      // Soft Purple (unchanged)
  };

  const isEmptyData =
    !summary.totalSales &&
    !summary.totalAdvertisingCost &&
    !summary.totalImpressions &&
    !summary.totalClicks;

  if (isEmptyData) {
    return null; // Let the parent component handle the empty state
  }

  const tileData = [
    { label: "🛒 Total Sales", value: `₹${new Intl.NumberFormat().format(summary.totalSales)}`, key: "totalSales" },
    { label: "💰 Total Advertising Cost", value: `₹${new Intl.NumberFormat().format(summary.totalAdvertisingCost)}`, key: "totalAdvertisingCost" },
    { label: "👀 Total Impressions", value: new Intl.NumberFormat().format(summary.totalImpressions), key: "totalImpressions" },
    { label: "🖱️ Total Clicks", value: new Intl.NumberFormat().format(summary.totalClicks), key: "totalClicks" }
  ];

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      margin: "20px 0",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      {tileData.map((tile) => (
        <div
          key={tile.key}
          style={{
            padding: "18px 25px",
            border: "1px solid #f0f0f0",
            borderRadius: "10px",
            minWidth: "220px",
            background: TILE_COLORS[tile.key],
            color: "#fff",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            flex: "1 1 220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: "1rem", marginBottom: "8px", fontWeight: "600" }}>{tile.label}</div>
          <div style={{ fontSize: "1.6rem", fontWeight: "bold" }}>{tile.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryTiles;