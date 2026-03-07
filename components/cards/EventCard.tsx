"use client";

import { Card } from "@/components/ui/Card";
import { formatEventDate } from "@/lib/formatDate";

export interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  imagePlaceholder?: string;
}

export function EventCard({
  title,
  description,
  date,
  location,
  imagePlaceholder = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
}: EventCardProps) {
  const displayDate = date?.includes("T") ? formatEventDate(date) : date;
  const badgeParts = displayDate.split(" ");
  const badgeMonth = badgeParts[0] ?? "";
  const badgeDay = badgeParts[1]?.replace(/,/g, "") ?? displayDate;

  return (
    <Card className="overflow-hidden bg-white p-0">
      <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gray-200">
        <img
          src={imagePlaceholder}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex flex-col rounded-lg bg-[#3478F6] px-3 py-2 text-center">
          <span className="text-xs font-medium text-white">
            {badgeMonth}
          </span>
          <span className="text-xl font-bold text-white">
            {badgeDay}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#1e3a5f]">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
          <span>{displayDate}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>
    </Card>
  );
}
