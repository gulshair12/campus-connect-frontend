"use client";

import type { EventFilter } from "@/services/eventService";

const FILTER_OPTIONS: { value: EventFilter; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7days", label: "Next 7 Days" },
  { value: "30days", label: "Next 30 Days" },
];

export interface DateFilterProps {
  value: EventFilter;
  onChange: (value: EventFilter) => void;
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-gray-700">Filter by date</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as EventFilter)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
      >
        {FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
