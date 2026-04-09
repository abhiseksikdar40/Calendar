# Interactive Wall Calendar

A polished, responsive **React + CSS interactive calendar component** inspired by a physical wall calendar aesthetic.

This project was built as a **Frontend Engineering Challenge** and focuses on turning a static visual concept into a functional, user-friendly experience with **date range selection**, **notes/events management**, **season-based theming**, and **responsive UI behavior**.

---

## ✨ Features

### 📅 Calendar Experience
- Physical **wall calendar inspired UI**
- Clean **month grid layout**
- Previous / next month navigation
- **Today** shortcut button
- Faded previous/next month cells
- Current day highlighting
- Sundays highlighted in red
- Government holidays with tooltip support

### 🧭 Date Range Selection
- Select a **start date** and **end date**
- Booking-style **range selection UI**
- Multi-day event visualization across selected dates
- Smooth visual feedback for selected range

### 📝 Events / Notes System
- Add:
  - Event
  - Task
  - Reminder
  - Meeting
- Add title + optional description
- Notes are grouped by date in a **dedicated side panel**
- Search events by title/description
- Filter by event type
- Delete events (including full range events)

### 🎨 Dynamic Seasonal Theming
Calendar colors automatically change by month using a **season-based palette**:

- **Winter** → Jan, Feb, Nov, Dec
- **Spring** → Mar, Apr
- **Summer** → May, Jun
- **Rainy** → Jul, Aug
- **Autumn** → Sep, Oct

### 📱 Responsive Design
- Optimized for desktop and mobile
- Full-height single-page layout
- Sticky controls and smooth UI behavior

### 💾 Local Persistence
- Events are saved in **localStorage**
- No backend required
- Data persists across refreshes

---

## 🛠 Tech Stack

- **React**
- **Vanilla CSS**
- **Vite**
- **LocalStorage**

---

## 📂 Project Structure

```bash
src/
│
├── components/
│   ├── Calendar/
│   │   ├── Calendar.jsx
│   │   └── Calendar.css
│   │
│   ├── CalendarGrid/
│   │   └── CalendarGrid.jsx
│   │
│   ├── DayCell/
│   │   └── DayCell.jsx
│   │
│   ├── EventModal/
│   │   └── EventModal.jsx
│   │
│   ├── Header/
│   │   └── Header.jsx
│   │
│   └── NotesPanel/
│       └── NotesPanel.jsx
│
├── hooks/
│   ├── useCalendar.js
│   └── useEvents.js
│
├── utils/
│   ├── dateUtils.js
│   └── themeUtils.js
│
├── data/
│   └── holidays.js
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interactive-wall-calendar.git
cd interactive-wall-calendar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Then open:

```bash
http://localhost:5173
```

---

## 🧪 How to Use

### Create a Multi-Day Event
1. Click a **start date**
2. Click an **end date**
3. Fill in:
   - Title
   - Type
   - Description (optional)
4. Save the event

### View Notes / Events
- Events appear:
  - directly on the calendar
  - inside the **Notes & Events** panel

### Search / Filter
Use the right-side panel to:
- search event titles/descriptions
- filter by:
  - All
  - Event
  - Task
  - Reminder
  - Meeting

### Delete an Event
Click **Delete** from the Notes Panel.  
For range events, the full multi-day event is removed.

---

## 🧠 Implementation Notes

### Date Key Strategy
Dates are stored using a normalized key format:

```js
YYYY-M-D
```

Example:

```js
2026-4-16
```

This is used consistently across:
- event storage
- holidays
- filtering
- rendering

### Range Events
For multi-day events:
- the event is stored across all selected dates
- a shared `rangeId` is used to identify linked entries
- deleting one removes the full range

### LocalStorage
Events are stored under:

```js
calendar-events
```

---

## 🎯 Engineering Focus

This project intentionally emphasizes:

- component structure
- reusable UI
- state management
- date handling
- interactive UX behavior
- visual polish
- responsive layout

No backend or database was used, per the challenge scope.

---

---


### Live Demo
```bash
https://calendar-sage-three.vercel.app/
```

### Video Demo
```(Duration:- 3:30 min)
https://drive.google.com/file/d/1PhcQ0Zfv0XfByF4_dhZkkDozjVBDW5Nk/view?usp=sharing
```

---

## 👨‍💻 Author

Built by **Abhisek Sikdar** as part of a frontend engineering assessment.

---