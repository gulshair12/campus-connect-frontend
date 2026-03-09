"use client";

import axios from "axios";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import type { BuddyUser } from "@/services/buddyService";
import type { ChatMessage } from "@/services/chatService";

interface ChatWindowProps {
  friend: BuddyUser;
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | null;
  isFriendOnline?: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  currentUserId: string;
}

function getErrorMessage(error: Error | null): string {
  if (!error) return "";
  if (axios.isAxiosError(error) && error.response?.status) {
    const status = error.response.status;
    if (status === 404 || status === 403) return "Unable to continue chat.";
  }
  return "Unable to load messages";
}

export function ChatWindow({
  friend,
  messages,
  isLoading,
  error,
  isFriendOnline = false,
  onClose,
  onSend,
  currentUserId,
}: ChatWindowProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-96 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              isFriendOnline ? "bg-green-500" : "bg-gray-400"
            }`}
            title={isFriendOnline ? "Online" : "Offline"}
          />
          <h3 className="truncate font-semibold text-[#1e3a5f]">
            {friend.fullName}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="!p-2 !text-gray-600 hover:!bg-gray-200 hover:!text-gray-900"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex min-h-[200px] max-h-[24rem] flex-1 flex-col gap-3 overflow-y-auto p-4">
        {isLoading && (
          <p className="py-4 text-center text-sm text-gray-500">
            Loading messages...
          </p>
        )}
        {error && (
          <p className="py-4 text-center text-sm text-red-600">
            {getErrorMessage(error)}
          </p>
        )}
        {!isLoading && !error && messages.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-500">
            Start a conversation.
          </p>
        )}
        {!isLoading && !error && messages.length > 0 && (
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isSent={msg.senderId === currentUserId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      {!error && (
        <MessageInput onSubmit={onSend} disabled={isLoading} />
      )}
    </div>
  );
}
