// app/components/ui/loginModal.tsx
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import lottie from "lottie-web";
import successAnimation from "@/animations/success.json";
import errorAnimation from "@/animations/error.json";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    let animInstance: any = null;

    if (containerRef.current) {
      // Load the Lottie animation directly into the container ref
      animInstance = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: type === "success" ? successAnimation : errorAnimation,
      });
    }

    return () => {
      if (animInstance) {
        animInstance.destroy();
      }
    };
  }, [isOpen, type]);

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

        {/* Lottie Animation Header */}
        <div
          ref={containerRef}
          className="w-24 h-24 mx-auto mb-2 flex items-center justify-center"
        />

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

      {/* Embedded Native Animations */}
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
