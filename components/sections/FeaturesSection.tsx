"use client";

import { Card } from "@/components/ui/Card";
import Image from "next/image";

const features = [
  {
    icon: "/Chat.svg",
    title: "Communication",
    description: "Chat with peers and buddies",
  },
  {
    icon: "/Book.svg",
    title: "Academic Support",
    description: "Chat with peers and buddies",
  },
  {
    icon: "/America.svg",
    title: "Cultural Guides",
    description: "Chat with peers and buddies",
  },
  {
    icon: "/calender.svg",
    title: "Event Calendar",
    description: "Chat with peers and buddies",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, description }) => (
            <Card key={title} className="flex flex-col items-start p-6">
              <div className="flex w-full items-center gap-3 border-b border-gray-200 pb-3">
                <div className="flex shrink-0 items-center justify-center">
                  <Image src={icon} alt={title} width={30} height={30} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              </div>
              <p className="mt-3 text-gray-600">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
