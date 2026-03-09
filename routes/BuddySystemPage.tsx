"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BuddyCard } from "@/components/cards/BuddyCard";
import { BuddyFilter } from "@/components/filters/BuddyFilter";
import { ChatWindow } from "@/components/chat/ChatWindow";
import {
  getUsersWithStatus,
  getOnlineUsers,
  sendRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  type BuddyUser,
} from "@/services/buddyService";
import { connectSocket, disconnectSocket } from "@/services/socket";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useChat } from "@/hooks/useChat";

export function BuddySystemPage() {
  const queryClient = useQueryClient();
  const [selectedFriend, setSelectedFriend] = useState<BuddyUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: currentUser } = useCurrentUser();
  const currentUserId = currentUser?.id;

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["buddy", "users"],
    queryFn: getUsersWithStatus,
  });

  const { data: onlineUserIds = [] } = useQuery({
    queryKey: ["buddy", "online"],
    queryFn: getOnlineUsers,
  });

  const invalidateBuddy = () => {
    queryClient.invalidateQueries({ queryKey: ["buddy", "users"] });
  };

  const sendRequestMutation = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      toast.success("Request sent");
      invalidateBuddy();
    },
    onError: () => {
      toast.error("Failed to send request");
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: acceptRequest,
    onSuccess: () => {
      toast.success("Request accepted");
      invalidateBuddy();
    },
    onError: () => {
      toast.error("Failed to accept request");
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      toast.success("Request rejected");
      invalidateBuddy();
    },
    onError: () => {
      toast.error("Failed to reject request");
    },
  });

  const cancelRequestMutation = useMutation({
    mutationFn: cancelRequest,
    onSuccess: () => {
      toast.success("Request cancelled");
      invalidateBuddy();
    },
    onError: () => {
      toast.error("Failed to cancel request");
    },
  });

  const { messages, isLoading: isLoadingChat, error: chatError, sendMessage } = useChat({
    friendId: selectedFriend?.id ?? null,
    currentUserId,
    enabled: !!selectedFriend && !!currentUserId,
  });

  // Connect socket when user is logged in
  useEffect(() => {
    if (currentUserId) {
      connectSocket(currentUserId);
    }
    return () => {
      disconnectSocket();
    };
  }, [currentUserId]);

  const filteredUsers = users.filter(
    (u) =>
      !searchQuery.trim() ||
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isPending =
    sendRequestMutation.isPending ||
    acceptRequestMutation.isPending ||
    rejectRequestMutation.isPending ||
    cancelRequestMutation.isPending;

  return (
    <section className="bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#1e3a5f] md:text-5xl">
            Buddy System
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Connect with experienced students who can guide you through campus
            life and help you settle in.
          </p>
        </div>

        <div className="mb-8">
          <BuddyFilter value={searchQuery} onChange={setSearchQuery} />
        </div>

        {isLoadingUsers && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                    <div className="mt-4 h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoadingUsers && isUsersError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-red-700">
              Unable to load students. Please try again later.
            </p>
          </div>
        )}

        {!isLoadingUsers && !isUsersError && filteredUsers.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-gray-600">
              No students available to connect.
            </p>
          </div>
        )}

        {!isLoadingUsers && !isUsersError && filteredUsers.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <BuddyCard
                key={user.id}
                id={user.id}
                fullName={user.fullName}
                university={user.university}
                department={user.department}
                imageUrl={user.imageUrl}
                connectionStatus={user.connectionStatus}
                isOnline={onlineUserIds.includes(user.id)}
                onConnect={() => sendRequestMutation.mutate(user.id)}
                onCancel={() => cancelRequestMutation.mutate(user.id)}
                onAccept={() => acceptRequestMutation.mutate(user.id)}
                onReject={() => rejectRequestMutation.mutate(user.id)}
                onChat={() => setSelectedFriend(user)}
                isPending={isPending}
              />
            ))}
          </div>
        )}
      </div>

      {selectedFriend && (
        <ChatWindow
          friend={selectedFriend}
          messages={messages}
          isLoading={isLoadingChat}
          error={chatError}
          isFriendOnline={onlineUserIds.includes(selectedFriend.id)}
          onClose={() => setSelectedFriend(null)}
          onSend={sendMessage}
          currentUserId={currentUserId ?? ""}
        />
      )}
    </section>
  );
}
