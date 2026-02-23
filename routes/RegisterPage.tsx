"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
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
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(90deg, #427CC9 0%, #3A74C5 100%)" }}
    >
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border-0 bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
          <p className="mt-1 text-gray-500">
            Join Campus Connect to connect with peers and access resources
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                placeholder="Full name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <Input
                placeholder="Email address"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                placeholder="University"
                error={errors.university?.message}
                {...register("university")}
              />
              <Input
                placeholder="Department"
                error={errors.department?.message}
                {...register("department")}
              />
              <div>
                <select
                  className={`
                    w-full rounded-xl border border-gray-200 bg-white px-4 py-3
                    text-gray-900 shadow-sm
                    focus:border-[#3478F6] focus:outline-none focus:ring-2 focus:ring-[#3478F6]/20
                    ${errors.graduationYear ? "border-red-500" : ""}
                  `}
                  {...register("graduationYear")}
                >
                  <option value="">Graduation year</option>
                  {graduationYears.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.graduationYear.message}
                  </p>
                )}
              </div>
              <Input
                placeholder="Password"
                type="password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
              disabled={isSubmitting || registerMutation.isPending}
            >
              Sign up
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#3478F6] hover:underline"
            >
              Log in
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
