"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-gray-800">

      <Image
        src="/heroMan.jpg"
        alt="Hero background"
        fill
        className="object-cover opacity-60"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black-900 to-blue-800/40" />
      
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl flex-col justify-center px-6 py-20">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Helping International Students Thrive Abroad
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
          Find resources, connect with buddies and navigate your new academic journey with ease.
        </p>
        <div className="mt-8">
          <Link href="/register">
            <Button variant="secondary" className="px-16 py-2 text-xl">
              Join
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}