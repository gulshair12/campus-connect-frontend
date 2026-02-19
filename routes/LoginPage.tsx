"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Mail, KeyRound, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLoginMutation } from "@/hooks/useAuthMutations";

export function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Login successful!");
      router.push("/");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      toast.error(message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2A6AD4] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="hidden w-[45%] bg-[#D2DBF0] lg:flex lg:items-center lg:justify-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#2A6AD4]/20">
            <LogIn className="h-32 w-32 text-[#2A6AD4]" strokeWidth={1.5} />
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
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                placeholder="Enter your password"
                type="password"
                icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                error={errors.password?.message}
                {...register("password")}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting || loginMutation.isPending}
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
