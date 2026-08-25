// components/dashboard/Header.tsx
"use client";

import { useState } from "react";
import { Activity, Settings, Bell, Menu, X, Sun } from "lucide-react";
import { useHeader } from "@/hooks/dashboard_hooks/useHeader";
import { NotificationDrawer } from "@/components/dashboard_components/NotificationDrawer";

export function Header() {
  const { doctorName, currentPath, router, navItems } = useHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for drawer

  return (
    <div className="w-full px-4 sm:px-6 pt-4 space-y-4 relative">
      {/* 1. Main Navigation Bar */}
      <header className="w-full bg-white px-6 py-4 rounded-3xl border border-blue-100/50 shadow-xs flex items-center justify-between">
        {/* Left: Brand Logo & Title + Mobile Menu Trigger */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden h-10 w-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden xs:inline-block">
              HealthCare
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Switcher (Desktop Only) */}
        <nav className="hidden md:flex items-center bg-[#f1f5f9]/80 p-1.5 rounded-full border border-slate-200/50 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#1e293b] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions & Doctor Profile Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="h-11 w-11 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs">
            <Settings className="h-5 w-5" />
          </button>

          {/* Notification Button Trigger */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="h-11 w-11 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors relative shadow-2xs"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200/80">
            <div className="h-11 w-11 rounded-full bg-amber-200 overflow-hidden flex-shrink-0 flex items-center justify-center border border-amber-300/50 shadow-2xs">
              <svg
                className="w-full h-full text-amber-900 mt-1"
                viewBox="0 0 36 36"
                fill="currentColor"
              >
                <path d="M18 16c3.313 0 6-2.687 6-6s-2.687-6-6-6-6 2.687-6 6 2.687 6 6 6zm0 3c-4.418 0-12 2.239-12 6.667V30h24v-4.333C30 21.239 22.418 19 18 19z" />
              </svg>
            </div>

            <div className="hidden lg:block text-left">
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {doctorName}
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Surgeon
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 z-50 bg-white rounded-2xl border border-slate-100 shadow-xl p-4 md:hidden flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 px-2">
            <div className="h-10 w-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold">
              {doctorName.charAt(4) || "D"}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{doctorName}</h4>
              <p className="text-xs text-slate-500">Surgeon • Active Session</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Simple Welcome Greeting Bar */}
      <div className="flex items-center justify-between px-2 py-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          Welcome Back {doctorName}
          <Sun className="h-6 w-6 text-amber-500 fill-amber-400" />
        </h1>
      </div>

      {/* 3. Notification Drawer Component */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
