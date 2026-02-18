"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const events = [
  {
    id: 1,
    title: "Orientation Workshop",
    date: "May 15",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
  },
  {
    id: 2,
    title: "Cultural Festival",
    date: "May 20",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  },
  {
    id: 3,
    title: "Career Fair",
    date: "May 25",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  },
];

export function EventsSection() {
  return (
    <section id="events" className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Upcoming Events & Announcements
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden p-0">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-lg bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                  {event.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                <p className="mt-2 text-gray-600">{event.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="primary" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
