"use client";

import { EventCard } from "@/components/cards/EventCard";
import { DateFilter } from "@/components/filters/DateFilter";
import { EventsEmptyState } from "@/components/sections/events/EventsEmptyState";

const DUMMY_EVENTS = [
  {
    id: "1",
    title: "Orientation Workshop",
    description: "Introduction for new international students. Learn about campus resources and meet your peers.",
    date: "May 15",
    location: "Main Hall, Building A",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
  },
  {
    id: "2",
    title: "Cultural Festival",
    description: "Celebrate diversity with food, music, and performances from around the world.",
    date: "May 20",
    location: "Student Center",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  },
  {
    id: "3",
    title: "Career Fair",
    description: "Connect with employers and explore internship opportunities.",
    date: "May 25",
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  },
  {
    id: "4",
    title: "Study Skills Workshop",
    description: "Tips and strategies for academic success in your new environment.",
    date: "Jun 2",
    location: "Library Room 101",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
  },
];

export function EventsPage() {
  const events = DUMMY_EVENTS;

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
          <DateFilter />
        </div>

        {events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                imagePlaceholder={event.image}
              />
            ))}
          </div>
        ) : (
          <EventsEmptyState />
        )}
      </div>
    </section>
  );
}
