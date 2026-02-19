"use client";

import Link from "next/link";
import { Mail, Facebook, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { href: "/#resources", label: "Resources" },
  { href: "/#events", label: "Events" },
  { href: "/#buddy", label: "Buddy System" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="inline-block border-b-1 border-white/80 pb-2 pr-2 font-bold">
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2C5AE7] px-6 pt-12 pb-4 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-12 lg:flex-row lg:justify-between">
        <div className="flex-1 lg:min-w-0">
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 lg:border-l lg:border-white/50 lg:pl-12 lg:min-w-0">
          <ColumnHeading>Contact Us</ColumnHeading>
          <a
            href="mailto:info@campusconnect.com"
            className="mt-4 flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5 shrink-0" />
            info@campusconnect.com
          </a>
        </div>
        <div className="flex-1 lg:border-l lg:border-white/50 lg:pl-12 lg:min-w-0">
          <ColumnHeading>Follow Us</ColumnHeading>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-[#1a5ab8] text-white transition-colors hover:bg-[#3478F6]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 border-t border-white/50" />
      <p className="mt-4 text-center text-sm text-white/80">
        © 2024 Campus Connect. All rights reserved.
      </p>
    </footer>
  );
}
