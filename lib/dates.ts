import type { Period, YearMonth } from "@/data/types";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(value: YearMonth) {
  const [year, month] = value.split("-");
  return { year, month: monthNames[Number(month) - 1] ?? "" };
}

const longMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function longLabel(value: YearMonth) {
  const [year, month] = value.split("-");
  return `${longMonthNames[Number(month) - 1] ?? ""} ${year}`;
}

export function formatPeriodLong({ start, end }: Period) {
  if (!start) return end === "present" ? "Current role" : "";
  return `${longLabel(start)} — ${end === "present" || !end ? "Present" : longLabel(end)}`;
}

export function formatPeriod({ start, end }: Period) {
  if (!start) return end === "present" ? "Present" : "";
  const from = parts(start);
  if (end === "present" || !end) return `${from.month} ${from.year} – Present`;

  const to = parts(end);
  return from.year === to.year
    ? `${from.month}–${to.month} ${to.year}`
    : `${from.month} ${from.year} – ${to.month} ${to.year}`;
}
