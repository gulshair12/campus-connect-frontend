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

export function Footer() {
  return (
    <footer className="bg-[#2A6AD4] px-6 py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-12">
        <div>
          <h3 className="mb-4 font-bold">Quick Links</h3>
          <ul className="space-y-2">
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
        <div>
          <h3 className="mb-4 font-bold">Contact Us</h3>
          <a
            href="mailto:info@campusconnect.com"
            className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5" />
            info@campusconnect.com
          </a>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Follow Us</h3>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a5ab8] text-white transition-colors hover:bg-[#3478F6]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-sm text-white/80">
        © 2024 Campus Connect. All rights reserved.
      </p>
    </footer>
  );
}
