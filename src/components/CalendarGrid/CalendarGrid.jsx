import React from "react";
import DayCell from "../DayCell/DayCell";
import { dayLabels } from "../../utils/dateUtils";

export default function CalendarGrid({
  days,
  onDateClick,
  events,
  today,
  rangeStart,
  rangeEnd,
}) {
  return (
    <div className="calendar-grid-wrapper">
      <div className="day-label-row">
        {dayLabels.map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((dayData, index) => (
          <DayCell
            key={index}
            dayData={dayData}
            onClick={onDateClick}
            events={events}
            today={today}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        ))}
      </div>
    </div>
  );
}