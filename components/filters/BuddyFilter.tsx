"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export interface BuddyFilterProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function BuddyFilter({ value = "", onChange }: BuddyFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:max-w-md">
        <Input
          placeholder="Search by name or university..."
          icon={<Search className="h-5 w-5 text-gray-400" />}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
