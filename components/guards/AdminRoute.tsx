"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      router.replace("/login");
      return;
    }
    if (role !== "admin") {
      router.replace("/");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (allowed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
