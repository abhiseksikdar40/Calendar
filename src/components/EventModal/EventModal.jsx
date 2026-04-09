import React, { useState } from "react";
import { formatPrettyDate } from "../../utils/dateUtils";

export default function EventModal({
  date,
  rangeStart,
  rangeEnd,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Event");
  const [description, setDescription] = useState("");

  const eventTypeColors = {
    Event: "#3b82f6",
    Task: "#10b981",
    Reminder: "#f59e0b",
    Meeting: "#ef4444",
  };

  const getDurationDays = () => {
    if (!rangeStart || !rangeEnd) return 1;

    const start = new Date(
      rangeStart.getFullYear(),
      rangeStart.getMonth(),
      rangeStart.getDate()
    );
    const end = new Date(
      rangeEnd.getFullYear(),
      rangeEnd.getMonth(),
      rangeEnd.getDate()
    );

    const diff = end.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const durationDays = getDurationDays();
  const isSingleDay = durationDays === 1;

  const handleSave = () => {
    if (!title.trim()) return;

    const newEvent = {
      title,
      type,
      color: eventTypeColors[type],
      description,
    };

    onSave(newEvent);
  };

  return (
    <div className="modal-overlay">
      <div className="event-modal">
        <div className="modal-header">
          <h2>{isSingleDay ? "Add Event" : "Add Range Event"}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="range-preview-box">
          <div className="range-date-block">
            <span className="range-label">Start Date</span>
            <p>{formatPrettyDate(rangeStart || date)}</p>
          </div>

          <div className="range-arrow">→</div>

          <div className="range-date-block">
            <span className="range-label">End Date</span>
            <p>{formatPrettyDate(rangeEnd || rangeStart || date)}</p>
          </div>
        </div>

        <p className="range-duration">
          {durationDays} day{durationDays > 1 ? "s" : ""} selected
        </p>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="e.g. Team Meeting / Vacation / Sprint"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Event</option>
            <option>Task</option>
            <option>Reminder</option>
            <option>Meeting</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            placeholder="Optional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handleSave}>
            {isSingleDay ? "Save Event" : "Save Range Event"}
          </button>
        </div>
      </div>
    </div>
  );
}