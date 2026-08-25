// app/page.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/auth_hooks/useLogin";
import { CustomButton } from "@/components/ui/CustomButton";
import { LoginModal } from "@/components/ui/loginModal";
import { Activity, ShieldCheck, Zap, WifiOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { form, isLoading, modalState, closeModal, onSubmit } = useLogin();
  const {
    register,
    formState: { errors },
  } = form;

  // Toggle state matching the design: 'staff' or 'resident'
  const [loginType, setLoginType] = useState<"staff" | "resident">("staff");

  return (
    <div className="flex min-h-screen w-full bg-blue-50 font-sans">
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

        {/* Center Typography */}
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
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-gray-100">
          {/* Exact Design Header: Icon Badge, Title, and Subtitle */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-md mb-4">
              <Activity className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              EHR
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Screenshot-matched Staff ID / Residential ID Toggle Container */}
          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-6 border border-gray-100">
            <button
              type="button"
              onClick={() => setLoginType("staff")}
              className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm ${
                loginType === "staff"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-gray-900 shadow-none"
              }`}
            >
              Staff ID
            </button>
            <button
              type="button"
              onClick={() => setLoginType("resident")}
              className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                loginType === "resident"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-gray-900 shadow-none"
              }`}
            >
              Residential ID
            </button>
          </div>

          {/* Rest of your login form, inputs, and buttons... */}

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    loginType === "staff"
                      ? "Enter your unique ID"
                      : "Enter your unique Residential ID"
                  }
                  suppressHydrationWarning
                  {...register("email")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  suppressHydrationWarning
                  {...register("password")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2 h-4 w-4"
                />
                Remember me
              </label>
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <div className="pt-2">
              <CustomButton type="submit" isLoading={isLoading}>
                Sign in
              </CustomButton>
            </div>
          </form>

          {/* Screenshot-matched "OR" divider line */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-medium">
                or
              </span>
            </div>
          </div>

          {/* Account Activation Outline Button */}
          <Link
            href="auth/activate"
            className="w-full flex items-center justify-center rounded-xl border border-blue-600/30 bg-white py-3.5 text-sm font-semibold text-blue-600 hover:bg-blue-50/50 transition-all shadow-sm"
          >
            Activate your account
          </Link>
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
