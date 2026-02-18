"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/40" />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col justify-center px-6 py-20">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Helping International Students Thrive Abroad
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
          Find resources, connect with buddies and navigate your new academic
          journey with ease.
        </p>
        <div className="mt-8">
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Join
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
