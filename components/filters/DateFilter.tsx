"use client";

export function DateFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-gray-700">Filter by date</label>
      <select
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
        defaultValue=""
      >
        <option value="">All dates</option>
        <option value="this-week">This week</option>
        <option value="this-month">This month</option>
        <option value="next-month">Next month</option>
      </select>
    </div>
  );
}
