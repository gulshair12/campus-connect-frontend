"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { LoginFormData, RegisterFormData } from "@/lib/validations/auth";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<{
        token?: string;
        accessToken?: string;
        user?: unknown;
      }>("/auth/login", data);
      const token = response.data.token ?? response.data.accessToken;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await api.post<{
        token?: string;
        accessToken?: string;
        user?: unknown;
      }>("/auth/register", data);
      const token = response.data.token ?? response.data.accessToken;
      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
