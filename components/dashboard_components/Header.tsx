// components/dashboard/Header.tsx
"use client";

import { useState } from "react";
import { Activity, Settings, Bell, Menu, X, Sun } from "lucide-react";
import { useHeader } from "@/hooks/dashboard_hooks/useHeader";

export function Header() {
  const { doctorName, currentPath, router, navItems } = useHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-6 pt-4 space-y-4 relative">
      {/* 1. Main Navigation Bar */}
      <header className="w-full bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        {/* Left: Brand Logo & Title + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden h-9 w-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 hidden xs:inline-block">
              HealthCare
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Switcher (Desktop Only) */}
        <nav className="hidden md:flex items-center bg-gray-50 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions & Doctor Profile Badge */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-amber-100 border border-amber-200 overflow-hidden flex items-end justify-center">
              <div className="h-full w-full bg-amber-300 flex items-end justify-center overflow-hidden">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-amber-700 mt-2" />
              </div>
            </div>

            <div className="hidden lg:block text-left">
              <h4 className="text-sm font-bold text-gray-900 leading-tight">
                {doctorName}
              </h4>
              <p className="text-xs text-gray-400 font-medium">Surgeon</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 z-50 bg-white rounded-2xl border border-gray-100 shadow-xl p-4 md:hidden flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100 px-2">
            <div className="h-10 w-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold">
              {doctorName.charAt(4) || "D"}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{doctorName}</h4>
              <p className="text-xs text-gray-500">Surgeon • Active Session</p>
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
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Simple Welcome Greeting Bar (Search & Monthly Filters reserved for metrics area) */}
      <div className="flex items-center justify-between px-2 py-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
          Welcome Back {doctorName}
          <Sun className="h-6 w-6 text-amber-500 fill-amber-400" />
        </h1>
      </div>
    </div>
  );
}
