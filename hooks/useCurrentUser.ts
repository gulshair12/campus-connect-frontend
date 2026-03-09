"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CurrentUser {
  id: string;
  fullName: string;
  email?: string;
  [key: string]: unknown;
}

interface UsersMeResponse {
  success?: boolean;
  user: { _id?: string; id?: string; fullName?: string; email?: string; [key: string]: unknown };
}

export function useCurrentUser() {
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  return useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get<UsersMeResponse>("/users/me");
      const user = response.data.user;
      return {
        ...user,
        id: user._id ?? user.id ?? "",
        fullName: user.fullName ?? "",
      } as CurrentUser;
    },
    enabled: hasToken,
  });
}
