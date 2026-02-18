"use client";

import { MessageCircle, BookOpen, Globe, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: MessageCircle,
    title: "Communication",
    description: "Chat with peers and buddies",
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    description: "Chat with peers and buddies",
  },
  {
    icon: Globe,
    title: "Cultural Guides",
    description: "Chat with peers and buddies",
  },
  {
    icon: Calendar,
    title: "Event Calendar",
    description: "Chat with peers and buddies",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col items-start">
              <div className="mb-4 rounded-xl bg-[#3478F6]/10 p-3">
                <Icon className="h-8 w-8 text-[#3478F6]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-gray-600">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
