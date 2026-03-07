/**
 * Format an ISO date string for event display (e.g. "2026-03-09T00:00:00.000Z" -> "Mar 9, 2026").
 */
export function formatEventDate(isoOrDate: string): string {
  if (!isoOrDate) return isoOrDate;
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return isoOrDate;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Convert ISO date to YYYY-MM-DD for <input type="date" /> */
export function toDateInputValue(isoOrDate: string): string {
  if (!isoOrDate) return "";
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return isoOrDate;
  return d.toISOString().slice(0, 10);
}
