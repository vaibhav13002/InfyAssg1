import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TILE_CONFIG = {
  totalSales: {
    color: "rgb(42, 71, 89)",
    icon: "🛒",
    label: "Total Sales",
    gradient: "linear-gradient(135deg, rgb(42, 71, 89) 0%, rgb(55, 85, 102) 100%)"
  },
  totalAdvertisingCost: {
    color: "#66BB6A",
    icon: "💰",
    label: "Total Advertising Cost",
    gradient: "linear-gradient(135deg, #66BB6A 0%, #7FD082 100%)"
  },
  totalImpressions: {
    color: "#42A5F5",
    icon: "👀",
    label: "Total Impressions",
    gradient: "linear-gradient(135deg, #42A5F5 0%, #68B6F9 100%)"
  },
  totalClicks: {
    color: "#AB47BC",
    icon: "🖱️",
    label: "Total Clicks",
    gradient: "linear-gradient(135deg, #AB47BC 0%, #C36ED3 100%)"
  }
};

const COLORS = [
  "#2a4759", "#66bb6a", "#42a5f5", "#ab47bc", "#ffa726", "#8d6e63", "#26a69a", "#ef5350", "#d4e157", "#5c6bc0"
];

const TilePieChart = ({ data, metric, onClose, expanded, setExpanded }) => {
  if (!data || data.length === 0) return null;
  const config = TILE_CONFIG[metric];
  const labels = data.map((shoe) => shoe.shoeName);
  const values = data.map((shoe) => shoe[metric] || 0);
  const total = values.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS,
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#222',
          font: { size: 14 },
          boxWidth: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percent}%)`;
          }
        }
      }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: expanded ? 520 : 320, height: expanded ? 380 : 220, position: 'relative', background: 'none', boxShadow: 'none', padding: 0, transition: 'width 0.2s, height 0.2s' }}>
      {/* Tile context header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
        fontWeight: 600,
        fontSize: 18,
        background: config.gradient,
        color: '#fff',
        borderRadius: 8,
        padding: '6px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>
        <span style={{ fontSize: 22 }}>{config.icon}</span>
        <span>{config.label} by Product</span>
        <button onClick={onClose} style={{
          marginLeft: 'auto',
          background: 'rgba(255,255,255,0.18)',
          border: 'none',
          borderRadius: '50%',
          width: 28,
          height: 28,
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} title="Close chart">×</button>
        <button
          onClick={() => setExpanded && setExpanded(!expanded)}
          style={{
            marginLeft: 8,
            background: 'rgba(255,255,255,0.18)',
            border: 'none',
            borderRadius: '50%',
            width: 28,
            height: 28,
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={expanded ? "Shrink chart" : "Expand chart"}
        >
          {expanded ? <span style={{fontSize: 18}}>–</span> : <span style={{fontSize: 18}}>+</span>}
        </button>
      </div>
      <div style={{ width: '100%', height: expanded ? 300 : 160 }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TilePieChart;
