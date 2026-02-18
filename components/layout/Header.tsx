"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#events", label: "Events" },
  { href: "/#resources", label: "Resources" },
  { href: "/#buddy", label: "Buddy System" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full px-6 py-4"
      style={{
        background: 'linear-gradient(90deg, #427CC9 0%, #3A74C5 100%)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white transition-opacity hover:opacity-90"
        >
          Campus Connect
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="ghost" size="sm" className="bg-white/20">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
