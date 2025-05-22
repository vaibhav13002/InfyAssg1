// components/DateRangePicker.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [error, setError] = useState("");

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      setError("Start date cannot be after end date");
    } else {
      setError("");
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      setError("End date cannot be before start date");
    } else {
      setError("");
      setEndDate(date);
    }
  };

  return (
    <div
      style={{
        padding: "20px 0", // Padding around the date pickers themselves
        // Removed borderBottom and marginBottom here as they are handled by App.jsx parent div
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "25px", // Increased gap between pickers
          alignItems: "center",
          justifyContent: "center", // Center the date pickers
          flexWrap: "wrap", // Allow wrapping on small screens
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // Align label and picker
            minWidth: "200px", // Ensure enough space for picker
            position: "relative",
          }}
        >
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
              fontSize: "1.1rem",
            }}
          >
            Start Date:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              maxDate={endDate || null}
              className="custom-datepicker-input"
              wrapperClassName="custom-datepicker-wrapper"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              calendarClassName="custom-calendar-popup"
            />
            {startDate && (
              <span
                onClick={() => setStartDate(null)}
                title="Reset Start Date"
                style={{
                  cursor: "pointer",
                  marginLeft: 6,
                  display: "flex",
                  alignItems: "center",
                  height: 32,
                  width: 32,
                  justifyContent: "center",
                  fontSize: '1.3em',
                  color: '#888',
                  userSelect: 'none'
                }}
              >
                {/* Unicode reload icon */}
                <span role="img" aria-label="reset">🔄</span>
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: "2px",
            position: "relative"
          }}
        >
          <label
            style={{
              marginBottom: "8px",
              fontWeight: "600",
              color: "#555",
              fontSize: "1.1rem",
            }}
          >
            End Date:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              minDate={startDate || null}
              maxDate={new Date()}
              className="custom-datepicker-input"
              wrapperClassName="custom-datepicker-wrapper"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              calendarClassName="custom-calendar-popup"
            />
            {endDate && (
              <span
                onClick={() => setEndDate(null)}
                title="Reset End Date"
                style={{
                  cursor: "pointer",
                  marginLeft: 6,
                  display: "flex",
                  alignItems: "center",
                  height: 32,
                  width: 32,
                  justifyContent: "center",
                  fontSize: '1.3em',
                  color: '#888',
                  userSelect: 'none'
                }}
              >
                <span role="img" aria-label="reset">🔄</span>
              </span>
            )}
          </div>
        </div>
      </div>
      {error && (
        <p
          style={{
            color: "#d32f2f",
            marginTop: "15px",
            textAlign: "center",
            fontSize: "0.95rem",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default DateRangePicker;