"use client";

import type { ChatMessage } from "@/services/chatService";

interface MessageBubbleProps {
  message: ChatMessage;
  isSent: boolean;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

export function MessageBubble({ message, isSent }: MessageBubbleProps) {
  return (
    <div
      className={`flex w-full ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isSent
            ? "bg-[#3478F6] text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm">{message.message}</p>
        <p
          className={`mt-1 text-xs ${
            isSent ? "text-white/80" : "text-gray-500"
          }`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
