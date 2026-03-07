"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Calendar, FileText } from "lucide-react";
import { getEvents } from "@/services/eventService";
import { getResources } from "@/services/resourceService";

export function AdminDashboardPage() {
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  const { data: resources = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });

  const totalEvents = events.length;
  const totalResources = resources.length;

  return (
    <div className="min-h-full">
      <div
        className="rounded-2xl px-6 py-8 text-white shadow-lg"
        style={{
          background: "linear-gradient(90deg, #427CC9 0%, #3A74C5 100%)",
        }}
      >
        <h1 className="text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-white/90">
          Overview of events and resources.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/events"
          className="group flex items-center gap-4 rounded-2xl border border-[#3478F6]/20 bg-white p-6 shadow-sm transition-all hover:border-[#3478F6]/40 hover:shadow-md"
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #427CC9 0%, #3478F6 100%)",
            }}
          >
            <Calendar className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">Total Events</p>
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {eventsLoading ? "..." : totalEvents}
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/resources"
          className="group flex items-center gap-4 rounded-2xl border border-[#3478F6]/20 bg-white p-6 shadow-sm transition-all hover:border-[#3478F6]/40 hover:shadow-md"
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #427CC9 0%, #3478F6 100%)",
            }}
          >
            <FileText className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">Total Resources</p>
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {resourcesLoading ? "..." : totalResources}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
