"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "@/services/chatService";
import { getSocket } from "@/services/socket";
import type { ChatMessage } from "@/services/chatService";

interface UseChatOptions {
  friendId: string | null;
  currentUserId: string | undefined;
  enabled: boolean;
}

interface ReceivedMessagePayload {
  senderId?: string;
  receiverId?: string;
  message?: string;
  _id?: string;
  createdAt?: string;
}

export function useChat({
  friendId,
  currentUserId,
  enabled,
}: UseChatOptions) {
  const { data: fetchedMessages = [], isLoading, error } = useQuery({
    queryKey: ["chat", friendId],
    queryFn: () => getChatHistory(friendId!),
    enabled: enabled && !!friendId,
  });

  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);
  const extraMessagesRef = useRef<ChatMessage[]>([]);
  const friendIdRef = useRef<string | null>(null);

  // Reset extra messages when switching friends
  useEffect(() => {
    if (friendId !== friendIdRef.current) {
      friendIdRef.current = friendId;
      setExtraMessages([]);
      extraMessagesRef.current = [];
    }
  }, [friendId]);

  // Listen for real-time messages
  useEffect(() => {
    if (!enabled || !friendId || !currentUserId) return;

    const socket = getSocket();
    if (!socket) return;

    const handleReceive = (payload: ReceivedMessagePayload) => {
      const senderId = payload.senderId ?? (payload as { sender?: string }).sender;
      if (senderId !== friendId) return;

      const newMsg: ChatMessage = {
        id: payload._id ?? `recv-${Date.now()}`,
        senderId: senderId,
        receiverId: payload.receiverId ?? currentUserId,
        message: payload.message ?? "",
        createdAt: payload.createdAt ?? new Date().toISOString(),
      };

      setExtraMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        const next = [...prev, newMsg];
        extraMessagesRef.current = next;
        return next;
      });
    };

    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [enabled, friendId, currentUserId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!friendId || !currentUserId || !text.trim()) return;

      const socket = getSocket();
      if (!socket) return;

      const tempId = `temp-${Date.now()}`;
      const optimisticMsg: ChatMessage = {
        id: tempId,
        senderId: currentUserId,
        receiverId: friendId,
        message: text.trim(),
        createdAt: new Date().toISOString(),
      };

      setExtraMessages((prev) => {
        const next = [...prev, optimisticMsg];
        extraMessagesRef.current = next;
        return next;
      });

      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: friendId,
        message: text.trim(),
      });
    },
    [friendId, currentUserId]
  );

  const allMessages = [...fetchedMessages, ...extraMessages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return {
    messages: allMessages,
    isLoading,
    error: error ?? null,
    sendMessage,
  };
}
