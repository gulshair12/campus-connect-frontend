"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  KeyRound,
  GraduationCap,
  Building2,
  Calendar,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/auth";
import { useRegisterMutation } from "@/hooks/useAuthMutations";

const graduationYears = Array.from({ length: 10 }, (_, i) => 2024 + i);

export function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Registration successful!");
      router.push("/login");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
            ?.data?.message
          : null;
      toast.error(message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2A6AD4] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="hidden w-[45%] bg-[#D2DBF0] lg:flex lg:items-center lg:justify-center">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#2A6AD4]/20">
            <UserPlus className="h-32 w-32 text-[#2A6AD4]" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center bg-white px-8 py-12 lg:w-[55%] lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#2A6AD4]">Sign Up</h1>
            <p className="mt-2 text-gray-500">
              Create your account to join Campus Connect
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <Input
                placeholder="Full name"
                icon={<User className="h-5 w-5 text-gray-400" />}
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <Input
                placeholder="Email address"
                type="email"
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                placeholder="Password"
                type="password"
                icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                placeholder="University"
                icon={<Building2 className="h-5 w-5 text-gray-400" />}
                error={errors.university?.message}
                {...register("university")}
              />
              <Input
                placeholder="Department"
                icon={<GraduationCap className="h-5 w-5 text-gray-400" />}
                error={errors.department?.message}
                {...register("department")}
              />
              <div className="w-full">
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <select
                    className={`
                      w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-10
                      text-gray-900 shadow-sm
                      focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20
                      ${errors.graduationYear ? "border-red-500" : ""}
                    `}
                    {...register("graduationYear")}
                  >
                    <option value="">Select graduation year</option>
                    {graduationYears.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.graduationYear.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting || registerMutation.isPending}
              >
                Sign Up
              </Button>
            </form>
            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#3478F6] hover:underline"
              >
                Log In
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
