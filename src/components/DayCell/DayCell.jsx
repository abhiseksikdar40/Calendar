import React from "react";
import { formatDateKey } from "../../utils/dateUtils";
import holidays from "../data/holidays"

export default function DayCell({
  dayData,
  onClick,
  events,
  today,
  rangeStart,
  rangeEnd,
}) {
  const { date, isCurrentMonth } = dayData;
  const key = formatDateKey(date);
  const dayEvents = events[key] || [];

  const normalize = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const currentDate = normalize(date);
  const todayDate = normalize(today);

  const isToday = currentDate.getTime() === todayDate.getTime();

  const isSunday = date.getDay() === 0;
  const holiday = holidays[key];

  const dayIndex = date.getDay();
  const openTooltipRight = dayIndex <= 1;

  const start = rangeStart ? normalize(rangeStart) : null;
  const end = rangeEnd ? normalize(rangeEnd) : null;

  const isRangeStart = start && currentDate.getTime() === start.getTime();
  const isRangeEnd = end && currentDate.getTime() === end.getTime();

  const isInRange =
    start &&
    end &&
    currentDate.getTime() > start.getTime() &&
    currentDate.getTime() < end.getTime();

  const isSingleSelected =
    start && !end && currentDate.getTime() === start.getTime();

  const isSelectedRangeCell =
    isRangeStart || isRangeEnd || isInRange || isSingleSelected;

  // SAVED RANGE EVENT UI
  const firstRangeEvent = dayEvents.find(
    (event) => event.rangeStart && event.rangeEnd
  );

  let isSavedRangeStart = false;
  let isSavedRangeEnd = false;
  let isSavedInRange = false;

  if (firstRangeEvent) {
    const savedStart = normalize(new Date(firstRangeEvent.rangeStart));
    const savedEnd = normalize(new Date(firstRangeEvent.rangeEnd));

    isSavedRangeStart = currentDate.getTime() === savedStart.getTime();
    isSavedRangeEnd = currentDate.getTime() === savedEnd.getTime();
    isSavedInRange =
      currentDate.getTime() > savedStart.getTime() &&
      currentDate.getTime() < savedEnd.getTime();
  }

  return (
    <div
      className={`day-cell ${isToday ? "today-cell" : ""} ${
        !isCurrentMonth ? "faded-cell" : ""
      } ${isSunday && isCurrentMonth ? "sunday-cell" : ""} ${
        holiday ? "holiday-cell" : ""
      } ${isRangeStart ? "range-start" : ""} ${
        isRangeEnd ? "range-end" : ""
      } ${isInRange ? "in-range" : ""} ${
        isSingleSelected ? "single-selected" : ""
      } ${isSelectedRangeCell ? "selected-range-cell" : ""}
      ${isSavedRangeStart ? "saved-range-start" : ""}
      ${isSavedRangeEnd ? "saved-range-end" : ""}
      ${isSavedInRange ? "saved-in-range" : ""}`}
      onClick={() => {
        if (isCurrentMonth) onClick(date);
      }}
    >
      <div className="day-number-row">
        <div className="day-number">{date.getDate()}</div>

        {holiday && isCurrentMonth && (
          <div className="holiday-badge-wrapper">
            <span className="holiday-dot"></span>

            <div
              className={`holiday-tooltip ${
                openTooltipRight ? "tooltip-right" : "tooltip-left"
              }`}
            >
              <strong>{holiday.name}</strong>
              <p>{holiday.type}</p>
            </div>
          </div>
        )}
      </div>

      {isCurrentMonth && (
        <div className="event-stack-preview">
          {dayEvents.slice(0, 1).map((event) => (
            <div
              key={`${event.rangeId || event.createdAt}-${key}`}
              className="event-tooltip-wrapper"
            >
              <div
                className="event-chip"
                style={{ background: event.color || "#64748b" }}
              >
                {event.title || "Untitled"}
              </div>

              <div
                className={`event-tooltip ${
                  openTooltipRight ? "tooltip-right" : "tooltip-left"
                }`}
              >
                <strong>{event.title || "Untitled Event"}</strong>
                <p>{event.type || "Event"}</p>
                {event.description && <span>{event.description}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}