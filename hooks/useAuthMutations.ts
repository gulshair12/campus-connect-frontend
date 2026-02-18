"use client";

import { useMutation } from "@tanstack/react-query";
import type { LoginFormData, RegisterFormData } from "@/lib/validations/auth";
// import api from "@/lib/api";

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      // TODO: Implement when API is ready
      // const response = await api.post("/auth/login", data);
      // return response.data;
      return Promise.resolve({ token: "placeholder", user: data });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      // TODO: Implement when API is ready
      // const response = await api.post("/auth/register", data);
      // return response.data;
      return Promise.resolve({ token: "placeholder", user: data });
    },
  });
}
