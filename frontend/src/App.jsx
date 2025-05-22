import { useState, useEffect } from "react";
import DateRangePicker from "./components/DateRangePicker";
import SummaryTiles from "./components/SummaryTiles";
import SalesLineChart from "./components/SalesLineChart";
import DataTable from "./components/DataTable"; // Import the new DataTable component
import AdvancedMetricsPanel from "./components/AdvancedMetricsPanel";
import TilePieChart from "./components/TilePieChart";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [summary, setSummary] = useState(null);
  const [tableData, setTableData] = useState([]); // New state for table data
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(true); // For overall data availability
  const [openSummaryTile, setOpenSummaryTile] = useState(null);
  const [pieExpanded, setPieExpanded] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const fetchAllData = async () => { // Renamed to fetchAllData
        try {
          setLoading(true);

          // --- Fetch Summary Data (Existing) ---
          const summaryRes = await fetch(
            `http://localhost:5000/api/sales/summary?startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const summaryData = await summaryRes.json();
          setSummary(summaryData);

          // Check if overall summary data exists
          const summaryDataExists = summaryData.totalSales > 0 ||
                                   summaryData.totalAdvertisingCost > 0 ||
                                   summaryData.totalImpressions > 0 ||
                                   summaryData.totalClicks > 0;

          // --- Fetch Table Data (New) ---
          // IMPORTANT: Confirm this endpoint with your backend.
          // This endpoint should return data *per shoe* for the date range.
          const tableRes = await fetch(
            `http://localhost:5000/api/sales/summary-by-shoe?startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const tableRawData = await tableRes.json();
          setTableData(tableRawData);

          // Determine overall data availability
          setHasData(summaryDataExists || tableRawData.length > 0);

        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setHasData(false); // If any fetch fails, assume no data
          setSummary(null); // Clear summary on error
          setTableData([]); // Clear table data on error
        } finally {
          setLoading(false);
        }
      };

      fetchAllData();
    }
  }, [startDate, endDate]);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', padding: 0, margin: 0, boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', margin: '25px 0 3px 0', fontSize: '3.2rem', fontWeight: 700 }}>
        Shoe Brand Sales Dashboard
      </h1>
      <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 2vw' }}>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        {loading && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Loading data...</p>
          </div>
        )}
        {!loading && (
          <>
            {hasData ? (
              <>
                {summary && (
                  <SummaryTiles
                    summary={summary}
                    shoeSummary={tableData}
                    openTile={openSummaryTile}
                    setOpenTile={setOpenSummaryTile}
                  />
                )}
                {openSummaryTile && (
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 0 30px 0',
                    padding: '0',
                  }}>
                    <div style={{
                      background: '#fff',
                      color: '#222',
                      borderRadius: 14,
                      boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
                      padding: 28,
                      minWidth: pieExpanded ? 520 : 320,
                      maxWidth: pieExpanded ? 700 : 480,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10,
                      position: 'relative',
                      animation: 'fadeIn 0.2s',
                      transition: 'min-width 0.2s, max-width 0.2s',
                    }}>
                      <TilePieChart
                        data={tableData}
                        metric={openSummaryTile}
                        onClose={() => { setOpenSummaryTile(null); setPieExpanded(false); }}
                        expanded={pieExpanded}
                        setExpanded={setPieExpanded}
                        inline
                      />
                    </div>
                  </div>
                )}
                <SalesLineChart startDate={startDate} endDate={endDate} />
                <DataTable data={tableData} />
                <AdvancedMetricsPanel data={tableData} />
              </>
            ) : (
              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#fff8f8',
                border: '1px solid #ffcccc',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#d32f2f', fontSize: '1.1rem' }}>
                  No sales data available for the selected date range. Please try different dates.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;