"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "@/components/cards/EventCard";
import { DateFilter } from "@/components/filters/DateFilter";
import { EventsEmptyState } from "@/components/sections/events/EventsEmptyState";
import { getEventsByFilter, type EventFilter } from "@/services/eventService";

const DEFAULT_FILTER: EventFilter = "7days";

export function EventsPage() {
  const [filter, setFilter] = useState<EventFilter>(DEFAULT_FILTER);
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events", filter],
    queryFn: () => getEventsByFilter(filter),
  });

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] md:text-5xl">
            Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Discover upcoming campus events, workshops, and social gatherings.
          </p>
        </div>

        <div className="mb-8">
          <DateFilter value={filter} onChange={setFilter} />
        </div>

        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="h-48 animate-pulse bg-gray-200" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-red-700">
              Unable to load events. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && events.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.heading}
                description={event.description}
                date={event.date}
                location={event.location}
                imagePlaceholder={event.image ?? undefined}
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <EventsEmptyState />
        )}
      </div>
    </section>
  );
}
