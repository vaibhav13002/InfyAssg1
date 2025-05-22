import React from "react";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        marginTop: "30px",
        padding: "20px",
        background: "#f8f9fa",
        border: "1px dashed #ced4da",
        borderRadius: "8px",
        textAlign: "center",
        color: "#6c757d"
      }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
          No detailed sales data available for the selected date range.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#888" }}>
          The table will appear here once data is available.
        </p>
      </div>
    );
  }

  // Calculate Grand Totals
  const grandTotals = data.reduce(
    (acc, curr) => {
      acc.totalSales += curr.totalSales || 0;
      acc.totalAdvertisingCost += curr.totalAdvertisingCost || 0;
      acc.totalImpressions += curr.totalImpressions || 0;
      acc.totalClicks += curr.totalClicks || 0;
      return acc;
    },
    { totalSales: 0, totalAdvertisingCost: 0, totalImpressions: 0, totalClicks: 0 }
  );

  const formatCurrency = (value) => `₹${new Intl.NumberFormat().format(value)}`;
  const formatNumber = (value) => new Intl.NumberFormat().format(value);

  return (
    <div style={{
      marginTop: "30px",
      padding: "25px",
      background: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      overflowX: "auto" // Ensures table is scrollable on smaller screens
    }}>
      <h2 style={{
        marginBottom: "25px",
        color: "#333",
        fontSize: "1.8rem",
        fontWeight: "700",
        borderBottom: "1px solid #f0f0f0",
        paddingBottom: "15px"
      }}>
        Sales Data by Shoe Model
      </h2>

      <table style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 8px", // Spacing between rows
        textAlign: "left",
        fontSize: "0.95rem"
      }}>
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            <th style={{ padding: "12px 15px", borderBottom: "2px solid #ddd", color: "#555" }}>Shoe Name</th>
            <th style={{ padding: "12px 15px", borderBottom: "2px solid #ddd", color: "#555", textAlign: "right" }}>Sales</th>
            <th style={{ padding: "12px 15px", borderBottom: "2px solid #ddd", color: "#555", textAlign: "right" }}>Advertising Cost</th>
            <th style={{ padding: "12px 15px", borderBottom: "2px solid #ddd", color: "#555", textAlign: "right" }}>Impressions</th>
            <th style={{ padding: "12px 15px", borderBottom: "2px solid #ddd", color: "#555", textAlign: "right" }}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((shoe, index) => (
            <tr key={index} style={{ background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", transition: "transform 0.2s ease-in-out", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.005)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <td style={{ padding: "12px 15px", borderBottom: "1px solid #eee", fontWeight: "bold", color: "#333" }}>{shoe.shoeName}</td>
              <td style={{ padding: "12px 15px", borderBottom: "1px solid #eee", textAlign: "right", color: "rgb(42, 71, 89)" }}>{formatCurrency(shoe.totalSales)}</td>
              <td style={{ padding: "12px 15px", borderBottom: "1px solid #eee", textAlign: "right", color: "#66BB6A" }}>{formatCurrency(shoe.totalAdvertisingCost)}</td>
              <td style={{ padding: "12px 15px", borderBottom: "1px solid #eee", textAlign: "right", color: "#42A5F5" }}>{formatNumber(shoe.totalImpressions)}</td>
              <td style={{ padding: "12px 15px", borderBottom: "1px solid #eee", textAlign: "right", color: "#AB47BC" }}>{formatNumber(shoe.totalClicks)}</td>
            </tr>
          ))}
          {/* Grand Totals Row */}
          <tr style={{ background: "#e0e0e0", fontWeight: "bold", borderTop: "2px solid #bbb" }}>
            <td style={{ padding: "15px", color: "#333", fontSize: "1.1rem" }}>Grand Totals</td>
            <td style={{ padding: "15px", textAlign: "right", color: "rgb(42, 71, 89)", fontSize: "1.1rem" }}>{formatCurrency(grandTotals.totalSales)}</td>
            <td style={{ padding: "15px", textAlign: "right", color: "#66BB6A", fontSize: "1.1rem" }}>{formatCurrency(grandTotals.totalAdvertisingCost)}</td>
            <td style={{ padding: "15px", textAlign: "right", color: "#42A5F5", fontSize: "1.1rem" }}>{formatNumber(grandTotals.totalImpressions)}</td>
            <td style={{ padding: "15px", textAlign: "right", color: "#AB47BC", fontSize: "1.1rem" }}>{formatNumber(grandTotals.totalClicks)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;