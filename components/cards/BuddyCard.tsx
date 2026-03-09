"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import type { ConnectionStatus } from "@/services/buddyService";

export interface BuddyCardProps {
  id: string;
  fullName: string;
  university: string;
  department: string;
  imageUrl?: string | null;
  connectionStatus: ConnectionStatus;
  isOnline?: boolean;
  /** "initials" = first letter(s) in colored circle. "cartoon" = DiceBear avatar. */
  avatarVariant?: "initials" | "cartoon";
  onConnect?: () => void;
  onCancel?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onChat?: () => void;
  isPending?: boolean;
}

export function BuddyCard({
  fullName,
  university,
  department,
  imageUrl,
  connectionStatus,
  isOnline = false,
  avatarVariant = "cartoon",
  onConnect,
  onCancel,
  onAccept,
  onReject,
  onChat,
  isPending = false,
}: BuddyCardProps) {
  const renderButtons = () => {
    if (connectionStatus === "none") {
      return (
        <Button
          variant="primary"
          size="sm"
          className="mt-4"
          onClick={onConnect}
          disabled={isPending}
        >
          Connect
        </Button>
      );
    }
    if (connectionStatus === "pending_sent") {
      return (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" disabled>
            Request Sent
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!border-gray-400 !text-gray-700 hover:!bg-gray-100"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel Request
          </Button>
        </div>
      );
    }
    if (connectionStatus === "pending_received") {
      return (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onAccept}
            disabled={isPending}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="!border-gray-400 !text-gray-700 hover:!bg-gray-100"
            onClick={onReject}
            disabled={isPending}
          >
            Reject
          </Button>
        </div>
      );
    }
    if (connectionStatus === "friends") {
      return (
        <Button
          variant="primary"
          size="sm"
          className="mt-4"
          onClick={onChat}
          disabled={isPending}
        >
          Chat
        </Button>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col bg-white p-6">
      <div className="flex gap-4">
        <div className="relative">
          <Avatar
            name={fullName}
            imageUrl={imageUrl}
            size="lg"
            variant={avatarVariant}
          />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
            title={isOnline ? "Online" : "Offline"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#1e3a5f]">{fullName}</h3>
          <p className="mt-0.5 text-sm text-gray-600">{university}</p>
          <p className="text-sm text-gray-500">{department}</p>
          {renderButtons()}
        </div>
      </div>
    </Card>
  );
}
