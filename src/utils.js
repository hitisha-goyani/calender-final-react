import { HOLIDAYS } from "./constants";

export const getDaysInMonth    = (y, m) => new Date(y, m + 1, 0).getDate();
export const getFirstDay       = (y, m) => new Date(y, m, 1).getDay();
export const getHoliday        = (y, m, d) => HOLIDAYS[`${y}-${m + 1}-${d}`] || null;

// alias used by BigCalendar & MiniCalendar
export function buildCalendarCells(year, month) {
  const total = getDaysInMonth(year, month);
  const first = getFirstDay(year, month);
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// alias used by AgendaView
export function buildCells(year, month) {
  return buildCalendarCells(year, month);
}

// used by ImgBtn
export function readFileAsDataURL(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(file);
  });
}

export function getMonthHolidays(year, month) {
  return Object.entries(HOLIDAYS)
    .filter(([k]) => k.startsWith(`${year}-${month + 1}-`))
    .map(([k, v]) => ({ day: parseInt(k.split("-")[2]), name: v }))
    .sort((a, b) => a.day - b.day);
}
