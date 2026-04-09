import { useEffect, useMemo, useState } from "react";

export default function NotesPanel({
  events,
  deleteEvent,
  currentMonth,
  currentYear,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Reset controls whenever month/year changes
  useEffect(() => {
    setSearch("");
    setFilter("All");
  }, [currentMonth, currentYear]);

  // Only keep current month/year events
  const monthlyEntries = useMemo(() => {
    return Object.entries(events)
      .filter(([date]) => {
        const [year, month] = date.split("-").map(Number);
        return year === currentYear && month === currentMonth + 1; // FIXED
      })
      .sort((a, b) => {
        const [y1, m1, d1] = a[0].split("-").map(Number);
        const [y2, m2, d2] = b[0].split("-").map(Number);

        const dateA = new Date(y1, m1 - 1, d1);
        const dateB = new Date(y2, m2 - 1, d2);

        return dateA - dateB;
      });
  }, [events, currentMonth, currentYear]);

  // Remove duplicate range events for cleaner notes panel
  const deduplicatedEntries = useMemo(() => {
    const seenRangeIds = new Set();

    return monthlyEntries.map(([date, items]) => {
      const uniqueItems = items.filter((item) => {
        if (!item.rangeId) return true;

        if (seenRangeIds.has(item.rangeId)) {
          return false;
        }

        seenRangeIds.add(item.rangeId);
        return true;
      });

      return [date, uniqueItems];
    });
  }, [monthlyEntries]);

  // Apply search + filter safely
  const filteredEntries = useMemo(() => {
    return deduplicatedEntries.map(([date, items]) => {
      const filteredItems = items.filter((item) => {
        const title = item?.title?.toLowerCase?.() || "";
        const description = item?.description?.toLowerCase?.() || "";
        const type = item?.type || "";

        const matchSearch =
          title.includes(search.toLowerCase()) ||
          description.includes(search.toLowerCase());

        const matchFilter = filter === "All" || type === filter;

        return matchSearch && matchFilter;
      });

      return [date, filteredItems];
    });
  }, [deduplicatedEntries, search, filter]);

  const hasAnyEvents = filteredEntries.some(([_, items]) => items.length > 0);

  return (
    <div className="notes-panel">
      <div className="notes-fixed-top">
        <div className="notes-panel-header">
          <h2>Notes & Events</h2>
          <p>Showing events only for this month</p>
        </div>

        <div className="notes-controls">
          <input
            className="search-box"
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Event">Event</option>
            <option value="Task">Task</option>
            <option value="Reminder">Reminder</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
      </div>

      <div className="notes-scroll-area">
        {!hasAnyEvents ? (
          <div className="empty-notes">
            <p>No events for this month.</p>
          </div>
        ) : (
          <div className="notes-list">
            {filteredEntries.map(([date, items]) =>
              items.length > 0 ? (
                <div key={date} className="note-group">
                  <div className="note-group-date">
                    {formatPrettyDateFromKey(date)}
                  </div>

                  {items.map((item) => (
                    <div key={item.rangeId || item.createdAt} className="note-card">
                      <div className="note-card-top">
                        <span
                          className="note-type"
                          style={{
                            background: item.color || "#64748b",
                            color: "#fff",
                          }}
                        >
                          {item.type || "Event"}
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() => deleteEvent(date, item.createdAt)}
                        >
                          Delete
                        </button>
                      </div>

                      <h4>{item.title || "Untitled Event"}</h4>

                      {item.rangeStart && item.rangeEnd && (
                        <div className="range-badge">
                          {item.rangeStart === item.rangeEnd
                            ? `📅 ${item.rangeStart}`
                            : `📅 ${item.rangeStart} → ${item.rangeEnd}`}
                        </div>
                      )}

                      {item.description && <p>{item.description}</p>}
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper: convert storage key into readable UI date
function formatPrettyDateFromKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}