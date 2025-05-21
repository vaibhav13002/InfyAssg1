import { useState, useEffect } from "react";
import DateRangePicker from "./components/DateRangePicker";
import SummaryTiles from "./components/SummaryTiles";
import SalesLineChart from "./components/SalesLineChart";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

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
          setSummary(data);
        } catch (error) {
          console.error("Error fetching summary:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSummary();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <h1>Shoe Brand Sales Dashboard</h1>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {loading && (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}>
          Loading summary...
        </p>
      )}

      {!loading && summary && (
        <>
          <SummaryTiles summary={summary} />
          <SalesLineChart startDate={startDate} endDate={endDate} />
        </>
      )}
    </div>
  );
}

export default App;
