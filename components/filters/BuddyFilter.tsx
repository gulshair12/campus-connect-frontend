"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

const departmentOptions = [
  { value: "", label: "All departments" },
  { value: "cs", label: "Computer Science" },
  { value: "engineering", label: "Engineering" },
  { value: "business", label: "Business" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "science", label: "Natural Sciences" },
];

export function BuddyFilter() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-md">
        <Input
          placeholder="Search by name or university..."
          icon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="hidden text-sm font-medium text-gray-700 sm:block">
          Department
        </label>
        <select
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20"
          defaultValue=""
        >
          {departmentOptions.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
