import React from "react";
import "./MonthSelector.css";

const MonthSelector = ({ months, selectedMonth, onSelect }) => {
  return (
    <div className="month-selector">
      <label htmlFor="month-select" className="month-label">
        Kies een maand:
      </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => onSelect(e.target.value)}
        className="month-dropdown"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
