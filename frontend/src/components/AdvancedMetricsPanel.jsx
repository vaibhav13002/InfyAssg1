import React, { useState } from "react";

const formatCurrency = (value) => `₹${new Intl.NumberFormat().format(value)}`;
const formatNumber = (value) => new Intl.NumberFormat().format(value);
const formatPercent = (value) => `${value.toFixed(1)}%`;

function computeMetrics(shoe) {
  const netProfit = (shoe.totalSales || 0) - (shoe.totalAdvertisingCost || 0);
  const profitMargin = shoe.totalSales ? (netProfit / shoe.totalSales) * 100 : 0;
  const conversionRate = shoe.totalClicks ? (shoe.totalSales / shoe.totalClicks) * 100 : 0;
  const cpc = shoe.totalClicks ? shoe.totalAdvertisingCost / shoe.totalClicks : 0;
  const roas = shoe.totalAdvertisingCost ? (shoe.totalSales / shoe.totalAdvertisingCost) * 100 : 0;
  return {
    netProfit,
    profitMargin,
    conversionRate,
    cpc,
    roas,
  };
}

const metricDetails = {
  netProfit: {
    label: "Net Profit",
    formula: "Net Profit = Total Sales - Advertising Cost",
    getValues: (shoe) => `Net Profit = ${formatCurrency(shoe.totalSales)} - ${formatCurrency(shoe.totalAdvertisingCost)}`
  },
  profitMargin: {
    label: "Profit Margin",
    formula: "Profit Margin = (Net Profit / Total Sales) × 100",
    getValues: (shoe, metrics) => `Profit Margin = (${formatCurrency(metrics.netProfit)} / ${formatCurrency(shoe.totalSales)}) × 100`
  },
  conversionRate: {
    label: "Conversion Rate",
    formula: "Conversion Rate = (Total Sales / Clicks) × 100",
    getValues: (shoe) => `Conversion Rate = ${formatCurrency(shoe.totalSales)} / ${formatNumber(shoe.totalClicks)} × 100`
  },
  cpc: {
    label: "Cost Per Click",
    formula: "CPC = Advertising Cost / Clicks",
    getValues: (shoe) => `CPC = ${formatCurrency(shoe.totalAdvertisingCost)} / ${formatNumber(shoe.totalClicks)}`
  },
  roas: {
    label: "ROAS",
    formula: "ROAS = (Total Sales / Advertising Cost) × 100",
    getValues: (shoe) => `ROAS = ${formatCurrency(shoe.totalSales)} / ${formatCurrency(shoe.totalAdvertisingCost)} × 100`
  }
};

const AdvancedMetricsPanel = ({ data }) => {
  const [selectedShoe, setSelectedShoe] = useState("");
  const [showFormulas, setShowFormulas] = useState(false);
  if (!data || data.length === 0) return null;
  const shoeOptions = data.map((shoe) => shoe.shoeName);
  const selected = data.find((shoe) => shoe.shoeName === selectedShoe) || data[0];
  const metrics = computeMetrics(selected);

  const handleFormulaToggle = () => setShowFormulas((v) => !v);

  return (
    <div style={{ margin: "30px 0", padding: 24, background: "#f5f7fa", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <h3 style={{ color: "#2a4759", fontWeight: 700, marginBottom: 18 }}>Product Analytics</h3>
      <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center' }}>
        <label htmlFor="shoe-select" style={{ fontWeight: 600, marginRight: 10 }}>Select Shoe:</label>
        <select
          id="shoe-select"
          value={selected.shoeName}
          onChange={e => setSelectedShoe(e.target.value)}
          style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #bbb", fontSize: "1em", marginRight: 16 }}
        >
          {shoeOptions.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button
          onClick={handleFormulaToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1976d2', fontSize: '1.1em', padding: '4px 10px', borderRadius: 4, fontWeight: 600 }}
          title={showFormulas ? 'Hide all formulas' : 'Show all formulas'}
        >
          {showFormulas ? '✖ Hide formulas' : 'ƒ Show formulas'}
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
        {Object.entries(metricDetails).map(([metricKey, details]) => (
          <div key={metricKey} style={{ flex: 1, minWidth: 180, background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.03)", position: 'relative' }}>
            <div style={{ fontWeight: 600, color: "#888", marginBottom: 4 }}>{details.label}</div>
            <div style={{ fontSize: "1.2em", color: metricKey === 'netProfit' ? "#388e3c" : metricKey === 'profitMargin' ? "#1976d2" : metricKey === 'conversionRate' ? "#ff9800" : metricKey === 'cpc' ? "#ab47bc" : "#2a4759", fontWeight: 700 }}>
              {metricKey === 'profitMargin' || metricKey === 'conversionRate' || metricKey === 'roas' ? formatPercent(metrics[metricKey]) : formatCurrency(metrics[metricKey])}
            </div>
            {showFormulas && (
              <div style={{ marginTop: 10, background: '#f5f7fa', borderRadius: 6, padding: 8, fontSize: '0.97em', color: '#444', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{details.formula}</div>
                <div style={{ color: '#1976d2', marginBottom: 2 }}>{details.getValues(selected, metrics)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedMetricsPanel;
