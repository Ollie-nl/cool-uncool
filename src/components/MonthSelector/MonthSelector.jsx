import React from "react";

const MonthSelector = ({ months, selectedMonth, onSelect }) => {
  const formatMonthLabel = (value) => {
    if (!value) return value;
    const [year, month] = value.split("-");
    if (!year || !month) return value;
    const monthIndex = Number(month) - 1;
    if (Number.isNaN(monthIndex)) return value;
    const date = new Date(Date.UTC(Number(year), monthIndex, 1));
    const formatted = new Intl.DateTimeFormat("nl-NL", {
      month: "long",
      year: "numeric",
    }).format(date);
    const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    return `${year} ${capitalized.replace(/\s+\d{4}$/, "")}`;
  };

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
            {formatMonthLabel(month)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
