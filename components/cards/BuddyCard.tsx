"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

export interface BuddyCardProps {
  fullName: string;
  university: string;
  department: string;
  bioPreview: string;
  imageUrl?: string | null;
  /** "initials" = first letter(s) in colored circle. "cartoon" = DiceBear avatar. */
  avatarVariant?: "initials" | "cartoon";
}

export function BuddyCard({
  fullName,
  university,
  department,   
  bioPreview,
  imageUrl,
  avatarVariant = "cartoon",
}: BuddyCardProps) {
  return (
    <Card className="flex flex-col bg-white p-6">
      <div className="flex gap-4">
        <Avatar
          name={fullName}
          imageUrl={imageUrl}
          size="lg"
          variant={avatarVariant}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#1e3a5f]">{fullName}</h3>
          <p className="mt-0.5 text-sm text-gray-600">{university}</p>
          <p className="text-sm text-gray-500">{department}</p>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{bioPreview}</p>
          <Button variant="primary" size="sm" className="mt-4">
            Send Request
          </Button>
        </div>
      </div>
    </Card>
  );
}
