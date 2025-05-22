import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Predefined colors and configurations - Smooth Palette (with updated Total Sales color)
const METRIC_CONFIG = {
  totalSales: {
    label: "Sales (₹)",
    color: "rgb(42, 71, 89)", // Dark Blue-Grey for Total Sales
    yAxisID: 'y',
    format: (value) => `₹${new Intl.NumberFormat().format(value)}`
  },
  totalAdvertisingCost: {
    label: "Ad Cost (₹)",
    color: "#66BB6A", // Soft Green (unchanged)
    yAxisID: 'y',
    format: (value) => `₹${new Intl.NumberFormat().format(value)}`
  },
  totalImpressions: {
    label: "Impressions",
    color: "#42A5F5", // Soft Blue (unchanged)
    yAxisID: 'y1',
    format: (value) => new Intl.NumberFormat().format(value)
  },
  totalClicks: {
    label: "Clicks",
    color: "#AB47BC", // Soft Purple (unchanged)
    yAxisID: 'y1',
    format: (value) => new Intl.NumberFormat().format(value)
  }
};

const SalesLineChart = ({ startDate, endDate }) => {
  const [shoeName, setShoeName] = useState("");
  const [primaryMetric, setPrimaryMetric] = useState("totalSales");
  const [secondaryMetric, setSecondaryMetric] = useState("totalClicks");
  const [chartData, setChartData] = useState(null);
  const [shoeOptions, setShoeOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getChartOptions = (primaryMetric, secondaryMetric) => {
    // Determine if a second Y-axis should be displayed
    const showSecondAxis = secondaryMetric &&
                           METRIC_CONFIG[primaryMetric]?.yAxisID !==
                           METRIC_CONFIG[secondaryMetric]?.yAxisID;

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false, // Show all tooltips for items at the same x-coordinate
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
                size: 14,
                weight: 'bold', // Make legend labels bolder
            },
            color: '#333' // Darker color for legend labels
          }
        },
        tooltip: {
          // Enhancements for tooltips
          backgroundColor: 'rgba(0,0,0,0.8)', // Darker background for better contrast
          titleFont: {
            size: 16, // Larger title font
            weight: 'bold',
          },
          bodyFont: {
            size: 14, // Larger body font
          },
          padding: 12, // More padding
          boxPadding: 8, // More padding for color box
          cornerRadius: 6, // Slightly rounded corners
          displayColors: true, // Show color boxes in tooltip
          borderWidth: 1, // Add a subtle border
          borderColor: '#eee', // Light border color
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw;
              // Extract base label to find the correct metric config
              const baseLabel = label.split(' (')[0];
              const metric = Object.keys(METRIC_CONFIG).find(
                key => METRIC_CONFIG[key].label.includes(baseLabel)
              );
              // Use the format function from METRIC_CONFIG for display
              return `${label}: ${METRIC_CONFIG[metric]?.format(value) || value}`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true, // Always display primary Y-axis title
            text: METRIC_CONFIG[primaryMetric]?.label,
            font: {
              weight: 'bold',
              size: 16 // Larger font size for axis titles
            },
            color: '#444' // Darker color for axis titles
          },
          ticks: {
            callback: (value) => METRIC_CONFIG[primaryMetric]?.format(value),
            font: {
                size: 12, // Keep numbers clear
                weight: 'bold', // Make numbers bolder
            },
            color: '#555' // Darker color for axis tick labels
          },
          grid: {
            drawOnChartArea: true, // Always draw grid for primary axis
            color: 'rgba(0, 0, 0, 0.1)', // More visible grid lines
            lineWidth: 1, // Thicker grid lines
          },
          border: { // Add axis line
            display: true,
            color: '#ccc',
            width: 1.5
          }
        },
        y1: {
          type: 'linear',
          display: showSecondAxis, // Only display if secondary metric is chosen and different axis
          position: 'right',
          title: {
            display: showSecondAxis, // Only display if secondary metric is chosen and different axis
            text: secondaryMetric ? METRIC_CONFIG[secondaryMetric]?.label : '',
            font: {
              weight: 'bold',
              size: 16
            },
            color: '#444'
          },
          ticks: {
            callback: (value) => secondaryMetric ?
              METRIC_CONFIG[secondaryMetric]?.format(value) : '',
            font: {
                size: 12,
                weight: 'bold',
            },
            color: '#555'
          },
          grid: {
            drawOnChartArea: false, // Don't draw grid for secondary axis to avoid clutter
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
          border: { // Add axis line
            display: showSecondAxis,
            color: '#ccc',
            width: 1.5
          }
        },
        x: {
          grid: {
            display: false // No horizontal grid lines from the x-axis
          },
          ticks: {
            font: {
                size: 12,
                weight: 'bold', // Make x-axis labels bolder
            },
            color: '#555' // Darker color for x-axis labels
          },
          border: { // Add axis line
            display: true,
            color: '#ccc',
            width: 1.5
          }
        }
      }
    };
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/sales/shoes")
      .then((res) => res.json())
      .then((data) => {
        setShoeOptions(data);
        if (data.length > 0) setShoeName(data[0]);
      })
      .catch((error) => console.error("Error fetching shoe options:", error));
  }, []);

  useEffect(() => {
    if (!startDate || !endDate || !shoeName) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/sales/daily?startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}&shoeName=${shoeName}`
        );
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const rawData = await res.json();

        const labels = rawData.map((entry) =>
          new Date(entry._id).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        );

        const datasets = [];

        datasets.push({
          label: METRIC_CONFIG[primaryMetric].label,
          data: rawData.map((entry) => entry[primaryMetric]),
          borderColor: METRIC_CONFIG[primaryMetric].color,
          backgroundColor: METRIC_CONFIG[primaryMetric].color + '40', // Semi-transparent for fill
          borderWidth: 3,
          tension: 0.3,
          yAxisID: METRIC_CONFIG[primaryMetric].yAxisID,
          pointRadius: 5,
          pointBackgroundColor: METRIC_CONFIG[primaryMetric].color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: METRIC_CONFIG[primaryMetric].color,
          pointHoverBorderColor: METRIC_CONFIG[primaryMetric].color,
          fill: true, // Fill area under the line
        });

        if (secondaryMetric && secondaryMetric !== primaryMetric) {
          datasets.push({
            label: METRIC_CONFIG[secondaryMetric].label,
            data: rawData.map((entry) => entry[secondaryMetric]),
            borderColor: METRIC_CONFIG[secondaryMetric].color,
            backgroundColor: METRIC_CONFIG[secondaryMetric].color + '40', // Semi-transparent for fill
            borderWidth: 3,
            borderDash: [5, 5],
            tension: 0.3,
            yAxisID: METRIC_CONFIG[secondaryMetric].yAxisID,
            pointRadius: 5,
            pointBackgroundColor: METRIC_CONFIG[secondaryMetric].color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: METRIC_CONFIG[secondaryMetric].color,
            pointHoverBorderColor: METRIC_CONFIG[secondaryMetric].color,
            fill: true, // Fill area under the line
          });
        }

        setChartData({ labels, datasets });
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, shoeName, primaryMetric, secondaryMetric]);

  return (
    <div style={{
      marginTop: "30px",
      padding: "25px",
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{
        marginBottom: "25px",
        color: "#333",
        fontSize: "1.8rem",
        fontWeight: "700",
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: "15px"
      }}>
        Sales Trend Analysis
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        marginBottom: "30px"
      }}>
        {/* Shoe Selection */}
        <div>
          <label htmlFor="shoe-select" style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#444",
            fontSize: "1rem"
          }}>
            Select Shoe Model:
          </label>
          <select
            id="shoe-select"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "2px solid #ccc",
              backgroundColor: "#fefefe",
              fontSize: "1rem",
              color: "#333",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              appearance: "none",
              backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23666666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "24px",
            }}
            onChange={(e) => setShoeName(e.target.value)}
            value={shoeName}
            onFocus={(e) => e.target.style.borderColor = '#66afe9'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          >
            {shoeOptions.length === 0 && <option value="">Loading Shoes...</option>}
            {shoeOptions.map((shoe, idx) => (
              <option key={idx} value={shoe}>
                {shoe}
              </option>
            ))}
          </select>
        </div>

        {/* Primary Metric Selection */}
        <div>
          <label htmlFor="primary-metric-select" style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#444",
            fontSize: "1rem"
          }}>
            Primary Metric:
          </label>
          <select
            id="primary-metric-select"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "2px solid #ccc",
              backgroundColor: "#fefefe",
              fontSize: "1rem",
              color: "#333",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              appearance: "none",
              backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23666666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "24px",
            }}
            onChange={(e) => setPrimaryMetric(e.target.value)}
            value={primaryMetric}
            onFocus={(e) => e.target.style.borderColor = '#66afe9'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          >
            {Object.entries(METRIC_CONFIG).map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Metric Selection */}
        <div>
          <label htmlFor="secondary-metric-select" style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#444",
            fontSize: "1rem"
          }}>
            Secondary Metric:
          </label>
          <select
            id="secondary-metric-select"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "2px solid #ccc",
              backgroundColor: "#fefefe",
              fontSize: "1rem",
              color: "#333",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              appearance: "none",
              backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23666666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "24px",
            }}
            onChange={(e) => setSecondaryMetric(e.target.value)}
            value={secondaryMetric}
            onFocus={(e) => e.target.style.borderColor = '#66afe9'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          >
            <option value="">None (Single Metric)</option>
            {Object.entries(METRIC_CONFIG)
              .filter(([value]) => value !== primaryMetric)
              .map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{
          textAlign: "center",
          padding: "60px 0",
          color: "#007bff",
          fontSize: "1.1rem",
          fontWeight: "500",
          backgroundColor: "#e7f3ff",
          borderRadius: "8px"
        }}>
          <p>Loading chart data... Please wait.</p>
        </div>
      ) : chartData && chartData.labels.length > 0 ? (
        <div style={{
          height: "450px",
          marginTop: "15px",
          position: "relative"
        }}>
          <Line
            data={chartData}
            options={getChartOptions(primaryMetric, secondaryMetric)}
          />
        </div>
      ) : (
        <div style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginTop: "20px",
          border: "1px dashed #ced4da",
          color: "#6c757d"
        }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
            {startDate && endDate && shoeName
              ? "No data available for the selected shoe model and date range."
              : "Please select a date range and a shoe model to display the sales trend data."}
          </p>
          <p style={{ fontSize: "0.9rem", color: "#888" }}>
            Adjust your filters above to see the chart.
          </p>
        </div>
      )}
      {/* Date range text moved outside the chart conditional rendering */}
      {startDate && endDate && shoeName && chartData && chartData.labels.length > 0 && (
        <div style={{
          marginTop: "25px",
          fontSize: "0.9rem",
          color: "#777",
          textAlign: "center",
          paddingTop: "15px",
          borderTop: "1px solid #f0f0f0"
        }}>
          <p>
            Data for <strong>{shoeName}</strong> from{' '}
            <span style={{ fontWeight: 'bold', color: '#555' }}>
              {startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>{' '}
            to{' '}
            <span style={{ fontWeight: 'bold', color: '#555' }}>
              {endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesLineChart;