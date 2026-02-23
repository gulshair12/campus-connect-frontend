"use client";

interface CategoryFilterProps {
  options?: { value: string; label: string }[];
}

const defaultOptions = [
  { value: "", label: "All categories" },
  { value: "academic", label: "Academic" },
  { value: "visa", label: "Visa & Immigration" },
  { value: "housing", label: "Housing" },
  { value: "career", label: "Career" },
  { value: "campus-life", label: "Campus Life" },
];

export function CategoryFilter({ options = defaultOptions }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-gray-700">
        Filter by category
      </label>
      <select
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
        defaultValue=""
      >
        {options.map((option) => (
          <option key={option.value || "all"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
