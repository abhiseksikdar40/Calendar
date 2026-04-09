import React, { useState } from "react";
import "./Calendar.css";

import Header from "../Header/Header";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import NotesPanel from "../NotesPanel/NotesPanel";
import EventModal from "../EventModal/EventModal";

import { getMonthData } from "../../hooks/useCalendar";
import useEvents from "../../hooks/useEvents";
import { getTheme } from "../../utils/themeUtils";

export default function Calendar() {
  const today = new Date();

  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(null);

  // NEW: range selection states
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const { events, addEvent, deleteEvent } = useEvents();

  const month = current.getMonth();
  const year = current.getFullYear();

  const theme = getTheme(month);
  const [c1, c2, c3, c4, c5] = theme.colors;

  const days = getMonthData(year, month);

  const normalizeDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

 const handleDateClick = (date) => {
  const clickedDate = normalizeDate(date);

  // First click → start date
  if (!rangeStart || (rangeStart && rangeEnd)) {
    setRangeStart(clickedDate);
    setRangeEnd(null);
    return;
  }

  // Second click logic
  if (rangeStart && !rangeEnd) {
    const startTime = rangeStart.getTime();
    const clickedTime = clickedDate.getTime();

    // Same day clicked again → single-day event
    if (clickedTime === startTime) {
      setRangeEnd(clickedDate);
      setSelectedDate(clickedDate);
      setOpenModal(true);
      return;
    }

    // Clicked before start → reset start
    if (clickedTime < startTime) {
      setRangeStart(clickedDate);
      setRangeEnd(null);
      return;
    }

    // Valid end date → open modal
    setRangeEnd(clickedDate);
    setSelectedDate(clickedDate);
    setOpenModal(true);
  }
};

  const handleCloseModal = () => {
  setOpenModal(false);
  setRangeStart(null);
  setRangeEnd(null);
  setSelectedDate(null);
};

  const handleSaveEvent = (eventData) => {
    addEvent({
      ...eventData,
      rangeStart,
      rangeEnd: rangeEnd || rangeStart,
    });

    setOpenModal(false);
    setRangeStart(null);
    setRangeEnd(null);
    setSelectedDate(null);
  };

  const handleMonthChange = (newDate) => {
    setCurrent(newDate);

    // Reset range when month changes
    setRangeStart(null);
    setRangeEnd(null);
    setSelectedDate(null);
    setOpenModal(false);
  };

  return (
    <div
      className="calendar-page"
      style={{
        "--bg-1": c1,
        "--bg-2": c2,
        "--bg-3": c3,
        "--bg-4": c4,
        "--bg-5": c5,
      }}
    >
      <div className="calendar-shell">
        <div className="spiral-bar">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="spiral-ring"></span>
          ))}
        </div>

        <div className="hero-banner">
          <div className="hero-overlay">
            <span className="season-badge">{theme.label}</span>
            <h2>Interactive Wall Calendar</h2>
            <p>Select a date range to create events, reminders, or notes</p>
          </div>
        </div>

        <Header current={current} setCurrent={handleMonthChange} theme={theme} />

        <div className="calendar-main">
          <CalendarGrid
            days={days}
            onDateClick={handleDateClick}
            events={events}
            today={today}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />

          <NotesPanel
            events={events}
            deleteEvent={deleteEvent}
            currentMonth={month}
            currentYear={year}
          />
        </div>
      </div>

      {openModal && rangeStart && (
        <EventModal
          date={rangeStart}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd || rangeStart}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}