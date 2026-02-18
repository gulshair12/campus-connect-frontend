"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Implement API call when backend is ready
      // const response = await api.post('/auth/login', data);
      console.log("Login data:", data);
      toast.success("Login successful!");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2A6AD4] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-tl-[2rem] rounded-bl-[2rem] rounded-tr-xl rounded-br-xl bg-white shadow-2xl">
        <div className="hidden w-[45%] bg-[#D2DBF0] lg:flex lg:items-center lg:justify-center">
          <div className="flex h-80 w-80 items-center justify-center">
            <svg
              className="h-64 w-64 text-[#3478F6]/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center bg-white px-8 py-12 lg:w-[55%] lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#2A6AD4]">Login</h1>
            <p className="mt-2 text-gray-500">
              Hey enter your details to sign in to your account
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <Input
                placeholder="Enter your email"
                type="email"
                icon={<User className="h-5 w-5" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                placeholder="Enter your password"
                type="password"
                icon={<Lock className="h-5 w-5" />}
                error={errors.password?.message}
                {...register("password")}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                Login
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-[#3478F6] hover:underline">
                Sign Up
              </Link>
            </p>
            <Link
              href="/"
              className="mt-4 block text-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
