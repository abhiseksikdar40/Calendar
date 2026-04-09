import React from "react";
import { monthNames } from "../../utils/dateUtils";

export default function Header({ current, setCurrent, theme }) {
  const month = current.getMonth();
  const year = current.getFullYear();

  const goPrev = () => {
    setCurrent(new Date(year, month - 1, 1));
  };

  const goNext = () => {
    setCurrent(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    const today = new Date();
    setCurrent(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <h1>{monthNames[month]}</h1>
        <p>
          {year} • {theme.label} Theme
        </p>
      </div>

      <div className="calendar-header-right">
        <button onClick={goPrev}>←</button>
        <button onClick={goToday}>Today</button>
        <button onClick={goNext}>→</button>
      </div>
    </div>
  );
}