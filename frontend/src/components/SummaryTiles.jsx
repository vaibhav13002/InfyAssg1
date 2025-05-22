// components/SummaryTiles.jsx
import React, { useState } from "react";
import TilePieChart from "./TilePieChart";

const SummaryTiles = ({ summary, shoeSummary, openTile, setOpenTile }) => {
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
      gap: "25px",
      margin: "20px 0",
      flexWrap: "wrap",
      justifyContent: "center",
    }}>
      {tileData.map((tile) => {
        const config = TILE_CONFIG[tile.key];
        return (
          <div
            key={tile.key}
            style={{
              padding: "20px 25px",
              borderRadius: "12px",
              background: config.gradient,
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              minWidth: "220px",
              flex: "1 1 220px",
              maxWidth: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              cursor: "pointer",
              position: "relative",
              outline: openTile === tile.key ? `2.5px solid #fff` : 'none',
              outlineOffset: openTile === tile.key ? '-2px' : 0
            }}
            onClick={() => setOpenTile(openTile === tile.key ? null : tile.key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-7px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            }}
          >
            <span style={{ fontSize: "2.5rem", marginBottom: "5px", lineHeight: "1" }}>
              {config.icon}
            </span>
            <div style={{ fontSize: "1.05rem", marginBottom: "8px", fontWeight: "600", opacity: 0.9 }}>
              {config.label}
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.5px" }}>
              {tile.value}
            </div>
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
              <button
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  border: 'none',
                  borderRadius: '50%',
                  padding: 7,
                  cursor: 'pointer',
                  boxShadow: openTile === tile.key ? '0 0 0 2px #fff' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Show product contribution pie chart"
                onClick={e => {
                  e.stopPropagation();
                  setOpenTile(openTile === tile.key ? null : tile.key);
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="none" />
                  <path d="M11 11 L11 2 A9 9 0 0 1 20 11 Z" fill="#fff" fillOpacity="0.7" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryTiles;