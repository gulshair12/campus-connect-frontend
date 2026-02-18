"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function FindBuddySection() {
  return (
    <section id="buddy" className="bg-white px-6 py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row justify-center ">
        <div className="flex max-w-xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Find a Buddy
          </h2>
          <p className="mt-4 text-lg text-gray-600 border-t border-gray-200 pt-4 ">
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
        <div className="shrink-0">
          <Image src="/person.jpg" alt="Find a Buddy" width={464} height={300} />
        </div>
      </div>
    </section>
  );
}
