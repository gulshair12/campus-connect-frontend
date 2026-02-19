"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CurrentUser {
  fullName: string;
  email?: string;
  [key: string]: unknown;
}

interface UsersMeResponse {
  success?: boolean;
  user: CurrentUser;
}

export function useCurrentUser() {
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  return useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get<UsersMeResponse>("/users/me");
      return response.data.user;
    },
    enabled: hasToken,
  });
}
