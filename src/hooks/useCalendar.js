export function getMonthData(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const days = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthTotalDays - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    days.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  // Next month leading days
  let nextMonthDay = 1;
  while (days.length < 42) {
    days.push({
      date: new Date(year, month + 1, nextMonthDay),
      isCurrentMonth: false,
    });
    nextMonthDay++;
  }

  return days;
}