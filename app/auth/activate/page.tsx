// app/auth/activate/page.tsx
"use client";

import { CustomButton } from "@/components/ui/CustomButton";
import { Activity, ShieldCheck, Zap, WifiOff } from "lucide-react";
import Link from "next/link";
import { OtpModal } from "@/components/ui/otpModal";
import { LoginModal } from "@/components/ui/loginModal";
import { useActivation } from "@/hooks/auth_hooks/useActivation";

export default function ActivateAccountPage() {
  const {
    loginType,
    setLoginType,
    isLoading,
    isOtpOpen,
    isFeedbackOpen,
    setIsFeedbackOpen,
    feedbackType,
    feedbackTitle,
    feedbackMessage,
    register,
    handleSubmit,
    onSubmit,
    handleVerifyOtp,
    handleResendOtp,
  } = useActivation();

  return (
    <div className="flex min-h-screen w-full bg-blue-50 font-sans">
      {/* Left Side: Desktop Blue Gradient Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-900 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide">
            HealthCare EHR
          </span>
        </div>

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

        <div className="z-10 text-xs text-primary-200">
          © 2026 HealthCare EHR System. All rights reserved.
        </div>
      </div>

      {/* Right Side: Activation Form Card Section */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 sm:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
              Activate Your Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md">
              Enter the Staff ID or Patient ID and activation code provided by
              your administrator.
            </p>
          </div>

          {/* Toggle Switch */}
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

          {/* Activation Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    loginType === "staff"
                      ? "Enter your unique ID"
                      : "Enter your unique Residential ID"
                  }
                  {...register("uniqueId")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password / activation code"
                  {...register("activationCode")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <CustomButton type="submit" isLoading={isLoading}>
                Activate account
              </CustomButton>
            </div>
          </form>

          {/* "OR" divider */}
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

          <Link
            href="/"
            className="w-full flex items-center justify-center rounded-xl border border-blue-600/30 bg-white py-3.5 text-sm font-semibold text-blue-600 hover:bg-blue-50/50 transition-all shadow-sm"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        isLoading={isLoading}
      />

      {/* Feedback Notification Modal (Success / Error) */}
      <LoginModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen()}
        type={feedbackType}
        title={feedbackTitle}
        message={feedbackMessage}
      />
    </div>
  );
}
