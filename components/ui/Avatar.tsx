"use client";

import { useState } from "react";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-[#3478F6]",   // blue
    "bg-[#FF8C42]",   // orange
    "bg-emerald-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getDiceBearUrl(name: string, size: number): string {
  const seed = encodeURIComponent(name || "user");
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&size=${size}`;
}

export interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: "sm" | "md" | "lg";
  /** "initials" = first letter(s) in colored circle (no external deps). "cartoon" = DiceBear avatar. */
  variant?: "initials" | "cartoon";
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-xl",
  lg: "h-20 w-20 text-2xl",
};

export function Avatar({
  name,
  imageUrl,
  size = "md",
  variant = "initials",
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const useImage = imageUrl && !imgError;
  const useCartoon = variant === "cartoon" && !useImage;
  const sizePx = size === "sm" ? 40 : size === "md" ? 64 : 80;

  if (useImage) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}
      >
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  if (useCartoon) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}
      >
        <img
          src={getDiceBearUrl(name, sizePx)}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${getAvatarColor(name)} ${sizeClasses[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}
