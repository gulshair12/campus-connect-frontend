"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { LoginFormData, RegisterFormData } from "@/lib/validations/auth";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  user?: AuthUser;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<LoginResponse>("/auth/login", data);
      const token = response.data.token ?? response.data.accessToken;
      const user = response.data.user;
      if (typeof window !== "undefined") {
        if (token) localStorage.setItem("token", token);
        if (user) {
          localStorage.setItem("role", user.role);
          localStorage.setItem("user", JSON.stringify(user));
        }
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
      const response = await api.post<LoginResponse>("/auth/register", data);
      const token = response.data.token ?? response.data.accessToken;
      const user = response.data.user;
      if (typeof window !== "undefined") {
        if (token) localStorage.setItem("token", token);
        if (user) {
          localStorage.setItem("role", user.role);
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
