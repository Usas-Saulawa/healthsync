"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "error";
  title: string;
  message: string;
}

export function LoginModal({
  isOpen,
  onClose,
  type = "success",
  title,
  message,
}: LoginModalProps) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with smooth fade-in and focus blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal Card with pop-in scale animation */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 z-10 animate-[scaleUp_0.25s_cubic-bezier(0.16,1,0.3,1)] text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon Header */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 animate-pulse">
              <AlertCircle className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className={`w-full py-2.5 px-4 rounded-xl text-white font-medium shadow-md transition-colors ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSuccess ? "Proceed to Dashboard" : "Try Again"}
        </button>
      </div>

      {/* Embedded Native Animations (No Framer Motion required!) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
