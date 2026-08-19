// app/page.tsx
"use client";

import { useLogin } from "@/hooks/auth_hooks/useLogin";
import { CustomButton } from "@/components/ui/CustomButton";
import { LoginModal } from "@/components/ui/loginModal";
import { Activity, Lock, Mail, ShieldCheck, Zap, WifiOff } from "lucide-react";

export default function LoginPage() {
  const { form, isLoading, modalState, closeModal, onSubmit } = useLogin();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      {/* Left Side: Desktop Blue Gradient Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-900 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        {/* Top Brand Tag */}
        <div className="flex items-center gap-3 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide">
            HealthCare EHR
          </span>
        </div>

        {/* Center Typography (Everyday English explaining the purpose) */}
        <div className="z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-primary-100 border border-white/10">
            <Zap className="h-3.5 w-3.5 text-primary-300" />
            Next-Generation Clinical Workflow
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Smart patient care, made simple and reliable.
          </h1>
          <p className="text-primary-100 text-base leading-relaxed">
            Welcome to your digital hospital workspace. Review patient health
            records, track daily appointments, and manage treatments
            securely—all in one fast, easy-to-use platform.
          </p>

          {/* Quick feature highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-primary-200 mt-1">
                <WifiOff className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Works Offline
                </h3>
                <p className="text-xs text-primary-200">
                  Never lose data even if internet drops.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-primary-200 mt-1">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Secure Records
                </h3>
                <p className="text-xs text-primary-200">
                  Protected patient history at your fingertips.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer copyright */}
        <div className="z-10 text-xs text-primary-200">
          © 2026 HealthCare EHR System. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login Form Card Section */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
          {/* Mobile Header (Shown only on small screens where left panel is hidden) */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md mb-4">
              <Activity className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              HealthCare EHR
            </h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Sign in to access your clinical workspace
            </p>
          </div>

          {/* Desktop Form Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Doctor Sign In
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please enter your credentials to open your dashboard.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  placeholder="dr.bashir@healthcare.com"
                  suppressHydrationWarning
                  {...register("email")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all text-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  suppressHydrationWarning
                  {...register("password")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-600 transition-all text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2 h-4 w-4"
                />
                Remember me
              </label>
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </a>
            </div>

            <CustomButton type="submit" isLoading={isLoading}>
              Sign In to Dashboard
            </CustomButton>
          </form>
        </div>
      </div>

      {/* Animated Feedback Modal Component */}
      <LoginModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
      />
    </div>
  );
}
