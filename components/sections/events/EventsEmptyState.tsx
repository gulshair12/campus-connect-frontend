"use client";

import { Calendar } from "lucide-react";

export function EventsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400">
        <Calendar className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        No upcoming events available.
      </h3>
      <p className="mt-2 max-w-sm text-gray-500">
        Check back later for upcoming campus events, workshops, and social
        gatherings.
      </p>
    </div>
  );
}
