// components/dashboard_components/NotificationDrawer.tsx
"use client";

import { useEffect } from "react";
import { X, Bell } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({
  isOpen,
  onClose,
}: NotificationDrawerProps) {
  // Close drawer on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Right Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors border border-slate-200/60"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body (Empty State matching mockup) */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-2xs border border-blue-100/50">
            <Bell className="h-6 w-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            You&apos;re all caught up
          </h4>
          <p className="text-xs text-slate-500 max-w-[260px] leading-relaxed">
            New updates about your patients will appear here.
          </p>
        </div>
      </div>
    </>
  );
}
