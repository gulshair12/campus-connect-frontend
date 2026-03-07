"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "@/components/cards/EventCard";
import { Button } from "@/components/ui/Button";
import { getEvents } from "@/services/eventService";

export function EventsSection() {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events", "home"],
    queryFn: getEvents,
  });
  const firstThree = events.slice(0, 3);

  return (
    <section id="events" className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-center gap-4">
          <span className="h-px flex-1 max-w-[25%] bg-gray-300" />
          <h2 className="text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
            Upcoming Events & Announcements
          </h2>
          <span className="h-px flex-1 max-w-[25%] bg-gray-300" />
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
            <Link href="/events">
              <Button variant="primary" size="lg" className="mt-4">
                View All Events
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !isError && firstThree.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {firstThree.map((event) => (
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

        {!isLoading && !isError && firstThree.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-gray-600">No upcoming events at the moment.</p>
            <Link href="/events">
              <Button variant="primary" size="lg" className="mt-4">
                View All Events
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !isError && firstThree.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link href="/events">
              <Button variant="primary" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
