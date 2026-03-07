"use client";

export const RESOURCE_CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "notes", label: "Notes" },
  { value: "internships", label: "Internships" },
  { value: "guides", label: "Guides" },
  { value: "previous-papers", label: "Previous Papers" },
] as const;

export interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

export function CategoryFilter({
  value,
  onChange,
  options = RESOURCE_CATEGORY_OPTIONS,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="text-sm font-medium text-gray-700">
        Filter by category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
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
