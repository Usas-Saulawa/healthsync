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
    <div className="flex min-h-screen w-full bg-(--background)">
      {/* Left Side: Desktop Blue Gradient Hero Panel */}
      <div className="hidden bg-steth lg:flex lg:w-1/2 flex-col justify-center items-center relative overflow-hidden">
        {/* <div className="absolute w-full h-full bg-(--info-card)/60"></div> */}
        <div className="flex h-50 w-50 items-center justify-center rounded-full bg-(--button) opacity-20 text-(--button-text) shadow-md mb-4">
          <Activity className="h-30 w-30" />
        </div>
        <div className="p-5 bg-(--info-icon-bg)/40 mx-6 rounded-lg">
          <span className="text-white">
            Patient reports increased thirst and frequent urination over the
            past 3 months. Denies blurred vision, numbness, or tingling in
            extremities. Reports occasional fatigue, especially after meals.
            Family history significant — mother diagnosed at age 52, maternal
            grandmother had
          </span>
        </div>
      </div>

      {/* Right Side: Login Form Card Section */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-xl rounded-xl bg-(--card) p-8">
          {/* Exact Design Header: Icon Badge, Title, and Subtitle */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--button) text-(--button-text) shadow-md mb-4">
              <Activity className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">EHR</h1>
            <p className="text-xs sm:text-sm text-(--shade-text) mt-1">
              Enter the Staff ID or Patient ID and activation code provided by
              your administrator.
            </p>
          </div>

          {/* Screenshot-matched Staff ID / Residential ID Toggle Container */}
          <div className="flex bg-(--background) p-1.5 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setLoginType("staff")}
              className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-md transition-all shadow-sm ${
                loginType === "staff"
                  ? "bg-(--card) shadow-sm"
                  : "bg-transparent text-(--shade-text) shadow-none"
              }`}
            >
              Staff ID
            </button>
            <button
              type="button"
              onClick={() => setLoginType("resident")}
              className={`flex-1 py-3 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                loginType === "resident"
                  ? "bg-(--card) shadow-sm"
                  : "bg-transparent text-(--shade-text) shadow-none"
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
                  className="w-full rounded-lg bg-(--background) py-3.5 px-4 placeholder-(--shade) focus:border-(--primary) focus:bg-(--card) focus:outline-none focus:ring-1 focus:ring-(--primary) transition-all text-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-(--danger-title)">
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
                  className="w-full rounded-lg bg-(--background) py-3.5 px-4 placeholder-(--shade) focus:border-(--primary) focus:bg-(--card) focus:outline-none focus:ring-1 focus:ring-(--primary) transition-all text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-(--danger-title)">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center text-(--shade-text) cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-(--border) text-(--primary) focus:ring-blue-500 mr-2 h-4 w-4"
                />
                Remember me
              </label>
              <a
                href="#"
                className="font-medium text-(--shade-text) hover:text-(--primary) transition-colors"
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
              <div className="w-full border-t border-(--border)" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-(--card) px-4 text-(--shade) font-medium">
                or
              </span>
            </div>
          </div>

          {/* Account Activation Outline Button */}
          <Link
            href="auth/activate"
            className="w-full flex items-center justify-center rounded-lg border border-(--button) bg-transparent py-3.5 text-sm font-semibold text-(--button) hover:bg-(--card-hover) transition-all"
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
