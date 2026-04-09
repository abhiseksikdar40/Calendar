import { useEffect, useState } from "react";
import { formatDateKey } from "../utils/dateUtils";

export default function useEvents() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendar-events")) || {};
    setEvents(stored);
  }, []);

  const saveEvents = (updated) => {
    setEvents(updated);
    localStorage.setItem("calendar-events", JSON.stringify(updated));
  };

const addEvent = (eventData) => {
  const { rangeStart, rangeEnd, ...event } = eventData;

  if (!rangeStart) return;

  const start = new Date(
    rangeStart.getFullYear(),
    rangeStart.getMonth(),
    rangeStart.getDate()
  );

  const end = new Date(
    (rangeEnd || rangeStart).getFullYear(),
    (rangeEnd || rangeStart).getMonth(),
    (rangeEnd || rangeStart).getDate()
  );

  const updated = { ...events };

  // generate ONCE
  const rangeId = Date.now().toString();
  const createdAt = Date.now().toString();

  let currentDate = new Date(start);

  while (currentDate <= end) {
    const dateKey = formatDateKey(currentDate);

    const rangedEvent = {
      ...event,
      createdAt, // ✅ SAME for all days
      rangeId,
      rangeStart: formatDateKey(start),
      rangeEnd: formatDateKey(end),
    };

    updated[dateKey] = [...(updated[dateKey] || []), rangedEvent];

    currentDate.setDate(currentDate.getDate() + 1);
  }

  saveEvents(updated);
};

  const deleteEvent = (dateKey, createdAt) => {
    const updatedEvents = { ...events };

    if (!updatedEvents[dateKey]) return;

    const targetEvent = updatedEvents[dateKey].find(
      (event) => event.createdAt === createdAt
    );

    if (!targetEvent) return;

    // If it’s a range event, remove it from all dates
    if (targetEvent.rangeId) {
      Object.keys(updatedEvents).forEach((key) => {
        updatedEvents[key] = updatedEvents[key].filter(
          (event) => event.rangeId !== targetEvent.rangeId
        );

        if (updatedEvents[key].length === 0) {
          delete updatedEvents[key];
        }
      });

      saveEvents(updatedEvents);
      return;
    }

    // fallback for normal single-day event
    updatedEvents[dateKey] = updatedEvents[dateKey].filter(
      (event) => event.createdAt !== createdAt
    );

    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey];
    }

    saveEvents(updatedEvents);
  };

  return { events, addEvent, deleteEvent };
}