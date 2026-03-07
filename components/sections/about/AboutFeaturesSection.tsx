"use client";

import { MessageCircle, Calendar, BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: MessageCircle,
    title: "Chat",
    description: "Connect and communicate with peers and buddies in real time.",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Discover and join campus events, workshops, and social gatherings.",
  },
  {
    icon: BookOpen,
    title: "Resources",
    description: "Access study materials, guides, and helpful documents.",
  },
  {
    icon: Users,
    title: "Buddy System",
    description: "Find a buddy to help you settle in and explore campus life.",
  },
];

export function AboutFeaturesSection() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-center gap-4">
          <span className="h-px flex-1 max-w-[25%] bg-gray-300" />
          <h2 className="text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
            What We Offer
          </h2>
          <span className="h-px flex-1 max-w-[25%] bg-gray-300" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col items-start bg-white p-6">
              <div className="flex w-full items-center gap-3 border-b border-gray-200 pb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3478F6]/10 text-[#3478F6]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">{title}</h3>
              </div>
              <p className="mt-3 text-gray-600">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
