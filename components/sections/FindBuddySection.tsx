"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FindBuddySection() {
  return (
    <section id="buddy" className="bg-white px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Find a Buddy
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Chat with a student to help you settle in and explore the city.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button variant="secondary" size="lg">
                Connect with a Buddy
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-[#D2DBF0] lg:h-80 lg:w-80">
            <svg
              className="h-48 w-48 text-[#3478F6]/30 lg:h-64 lg:w-64"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
