"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminRoute } from "@/components/guards/AdminRoute";

function handleLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  window.location.href = "/";
}

const adminNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/resources", label: "Resources" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AdminRoute>
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          className="flex w-full flex-col border-b border-white/10 md:w-56 md:border-b-0 md:border-r"
          style={{
            background: "linear-gradient(180deg, #427CC9 0%, #3A74C5 100%)",
          }}
        >
          <div className="border-b border-white/10 px-4 py-5">
            <h2 className="text-lg font-bold text-white">Admin</h2>
            <p className="mt-0.5 text-sm text-white/80">Campus Connect</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${pathname === link.href
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-auto border-t border-white/10 pt-4">

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4 shrink-0" aria-hidden />
                Logout
              </button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </AdminRoute>
  );
}
