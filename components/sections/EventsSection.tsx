"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const events = [
  {
    id: 1,
    title: "Orientation Workshop",
    month: "May",
    day: "15",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400",
  },
  {
    id: 2,
    title: "Cultural Festival",
    month: "May",
    day: "20",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  },
  {
    id: 3,
    title: "Career Fair",
    month: "May",
    day: "25",
    description: "Introduction for new students",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  },
];

export function EventsSection() {
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden p-0 shadow-md">
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex flex-col rounded-lg bg-green-500 px-3 py-2 text-center">
                  <span className="text-xs font-medium text-white">
                    {event.month}
                  </span>
                  <span className="text-xl font-bold text-white">
                    {event.day}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1e3a5f]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {event.description}
                </p>
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
