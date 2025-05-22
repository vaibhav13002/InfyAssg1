// components/SummaryTiles.jsx
import React from "react";

const SummaryTiles = ({ summary }) => {
  if (!summary) return <p>Loading summary...</p>;

  // Define the base colors and gradient variations
  const TILE_CONFIG = {
    totalSales: {
      color: "rgb(42, 71, 89)", // Dark Blue-Grey
      icon: "🛒",
      label: "Total Sales",
      gradient: "linear-gradient(135deg, rgb(42, 71, 89) 0%, rgb(55, 85, 102) 100%)"
    },
    totalAdvertisingCost: {
      color: "#66BB6A", // Soft Green
      icon: "💰",
      label: "Total Advertising Cost",
      gradient: "linear-gradient(135deg, #66BB6A 0%, #7FD082 100%)"
    },
    totalImpressions: {
      color: "#42A5F5", // Soft Blue
      icon: "👀",
      label: "Total Impressions",
      gradient: "linear-gradient(135deg, #42A5F5 0%, #68B6F9 100%)"
    },
    totalClicks: {
      color: "#AB47BC", // Soft Purple
      icon: "🖱️",
      label: "Total Clicks",
      gradient: "linear-gradient(135deg, #AB47BC 0%, #C36ED3 100%)"
    }
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
    { value: `₹${new Intl.NumberFormat().format(summary.totalSales)}`, key: "totalSales" },
    { value: `₹${new Intl.NumberFormat().format(summary.totalAdvertisingCost)}`, key: "totalAdvertisingCost" },
    { value: new Intl.NumberFormat().format(summary.totalImpressions), key: "totalImpressions" },
    { value: new Intl.NumberFormat().format(summary.totalClicks), key: "totalClicks" }
  ];

  return (
    <div style={{
      display: "flex",
      gap: "25px", // Slightly increased gap for better separation
      margin: "20px 0",
      flexWrap: "wrap",
      justifyContent: "center",
      // Remove padding/border/background from this div if App.jsx handles the card styling
      // (Which it does in the latest App.jsx version)
    }}>
      {tileData.map((tile) => {
        const config = TILE_CONFIG[tile.key];
        return (
          <div
            key={tile.key}
            style={{
              padding: "20px 25px", // Adjusted padding
              borderRadius: "12px", // Slightly more rounded corners
              background: config.gradient, // Use the gradient
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)", // Enhanced shadow
              minWidth: "220px",
              flex: "1 1 220px", // Allows tiles to grow and shrink, min 220px
              maxWidth: "280px", // Prevent tiles from becoming too wide in a row
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              cursor: "default", // Indicate it's not clickable by default
              position: "relative", // Needed for potential future overlays/details
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-7px)'; // More pronounced lift
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'; // Stronger shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            }}
          >
            {/* Icon */}
            <span style={{ fontSize: "2.5rem", marginBottom: "5px", lineHeight: "1" }}>
                {config.icon}
            </span>

            {/* Label */}
            <div style={{ fontSize: "1.05rem", marginBottom: "8px", fontWeight: "600", opacity: 0.9 }}>
                {config.label}
            </div>

            {/* Value */}
            <div style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.5px" }}>
                {tile.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryTiles;