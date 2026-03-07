"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
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
      const result = await loginMutation.mutateAsync(data);
      toast.success("Login successful!");
      const role = result?.user?.role ?? (typeof window !== "undefined" ? localStorage.getItem("role") : null);
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      toast.error(message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(90deg, #427CC9 0%, #3A74C5 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="rounded-2xl border-0 bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
          <p className="mt-1 text-gray-500">
            Enter your details to sign in to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              placeholder="Email address"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              placeholder="Password"
              type="password"
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
              Log in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#3478F6] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 block text-center text-sm text-white/90 hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
