"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/buddy-system", label: "Buddy System" },
];

function getStoredUser(): { fullName?: string; email?: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { fullName?: string; email?: string };
    return parsed && typeof parsed.fullName === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function handleLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  window.location.reload();
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setUser(getStoredUser());
    setRole(typeof window !== "undefined" ? localStorage.getItem("role") : null);
  }, [mounted]);

  const isLoggedIn = !!user?.fullName;
  const showAuthUI = mounted;

  return (
    <header
      className="sticky top-0 z-50 w-full px-6 py-4"
      style={{
        background: "linear-gradient(90deg, #427CC9 0%, #3A74C5 100%)",
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
            {!showAuthUI ? (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar
                    name={user?.fullName ?? ""}
                    size="sm"
                    variant="cartoon"
                  />
                  <div className="flex flex-col items-start">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      {user?.fullName}
                      {role === "admin" && (
                        <Link
                          href="/dashboard"
                          className="inline-flex items-center gap-0.5 rounded bg-white/20 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-white/30"
                        >
                          <Shield className="h-3 w-3" />
                          Admin
                        </Link>
                      )}
                    </span>
                    {user?.email && (
                      <span className="text-xs text-white/80">{user.email}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
