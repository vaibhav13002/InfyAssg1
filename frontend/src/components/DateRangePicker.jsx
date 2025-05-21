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
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            maxDate={endDate || null}
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            minDate={startDate || null}
            maxDate={new Date()}
          />
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DateRangePicker;
