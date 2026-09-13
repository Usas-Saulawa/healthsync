// app/components/ui/OtpModal.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";

interface OtpModalProps {
  isOpen: boolean;
  onVerify: (otpCode: string) => void;
  onResend?: () => void;
  isLoading?: boolean;
}

export function OtpModal({
  isOpen,
  onVerify,
  onResend,
  isLoading = false,
}: OtpModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return; // only allow numbers

    const newOtp = [...otp];
    // Keep only the last character entered if user pastes or types fast
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCompleteVerification = () => {
    const code = otp.join("");
    onVerify(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-gray-100 z-10 text-center animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Top Shield Icon Badge */}
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        {/* Header Text */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
          Security Verification
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-8">
          Your 6-digit code was sent to your via email.
        </p>

        {/* 6-Digit OTP Boxes */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-11 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border border-gray-200 bg-blue-50/20 text-gray-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all shadow-sm"
            />
          ))}
        </div>

        {/* Verify Action Button */}
        <div className="mb-6">
          <CustomButton
            type="button"
            isLoading={isLoading}
            onClick={handleCompleteVerification}
          >
            Verify
          </CustomButton>
        </div>

        {/* Resend Link */}
        <div className="text-xs text-gray-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={onResend}
            className="text-blue-600 font-semibold hover:underline"
          >
            Request again
          </button>
        </div>
      </div>
    </div>
  );
}
