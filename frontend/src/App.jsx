import { useState, useEffect } from "react";
import DateRangePicker from "./components/DateRangePicker";
import SummaryTiles from "./components/SummaryTiles";
import SalesLineChart from "./components/SalesLineChart";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true); // New state for data availability

  useEffect(() => {
    if (startDate && endDate) {
      const fetchSummary = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `http://localhost:5000/api/sales/summary?startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const data = await res.json();
          
          // Check if we have any data
          const dataExists = data.totalSales > 0 || 
                           data.totalAdvertisingCost > 0 || 
                           data.totalImpressions > 0 || 
                           data.totalClicks > 0;
          
          setHasData(dataExists);
          setSummary(data);
        } catch (error) {
          console.error("Error fetching summary:", error);
          setHasData(false);
        } finally {
          setLoading(false);
        }
      };

      fetchSummary();
    }
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Shoe Brand Sales Dashboard
      </h1>
      
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Loading data...</p>
        </div>
      )}

      {!loading && summary && (
        <>
          <SummaryTiles summary={summary} />
          {hasData ? (
            <SalesLineChart startDate={startDate} endDate={endDate} />
          ) : (
            <div style={{ 
              marginTop: "30px",
              padding: "20px",
              background: "#fff8f8",
              border: "1px solid #ffcccc",
              borderRadius: "5px",
              textAlign: "center"
            }}>
              <p style={{ color: "#d32f2f", fontSize: "1.1rem" }}>
                No sales data available for the selected date range. Please try different dates.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;