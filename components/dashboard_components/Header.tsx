// components/dashboard_components/Header.tsx
"use client";

import { useState } from "react";
import { Activity, Settings, Bell, Menu, X, Sun } from "lucide-react";
import { useHeader } from "@/hooks/dashboard_hooks/useHeader";
import { NotificationDrawer } from "@/components/dashboard_components/NotificationDrawer";

interface HeaderProps {
  showGreeting?: boolean;
}

export function Header({ showGreeting = true }: HeaderProps) {
  const { doctorName, currentPath, router, navItems } = useHeader();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="relative z-40 w-full px-4 pt-4 sm:px-6 lg:px-8">
      {/* Main Header */}
      <header
        className="
          sticky
          top-4
          z-40
          flex
          min-h-[72px]
          w-full
          items-center
          justify-between
          gap-4
          rounded-[36px]
          bg-white
          px-4
          py-3
          sm:px-5
          lg:px-6
        "
      >
        {/* ---------------------------------------------------------- */}
        {/* LEFT SIDE - LOGO */}
        {/* ---------------------------------------------------------- */}

        <div className="flex shrink-0 items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#1F2937]
              transition-colors
              hover:bg-slate-50
              md:hidden
            "
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={2.4} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            )}
          </button>

          {/* Brand */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="
              flex
              shrink-0
              items-center
              gap-3
              text-left
            "
            aria-label="Go to dashboard"
          >
            {/* Logo */}
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#2563EB]
                text-white
              "
            >
              <Activity className="h-7 w-7" strokeWidth={2.5} />
            </div>

            {/* Brand Name */}
            <span
              className="
                hidden
                whitespace-nowrap
                text-[22px]
                font-bold
                tracking-[-0.7px]
                text-[#1F2937]
                lg:inline-block
              "
            >
              HealthCare
            </span>
          </button>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* CENTER - MAIN NAVIGATION */}
        {/* ---------------------------------------------------------- */}

        <nav
          className="
            hidden
            items-center
            rounded-full
            bg-[#F1F3F5]
            p-1
            md:flex
          "
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => router.push(item.path)}
                className={`
                  flex
                  h-[48px]
                  items-center
                  justify-center
                  rounded-full
                  px-7
                  text-[16px]
                  font-medium
                  tracking-[-0.2px]
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-[#1F2937] text-white"
                      : "text-[#374151] hover:bg-white/70"
                  }
                `}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* ---------------------------------------------------------- */}
        {/* RIGHT SIDE - ACTIONS + PROFILE */}
        {/* ---------------------------------------------------------- */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Settings */}
          <button
            type="button"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#1F2937]
              transition-colors
              hover:bg-slate-50
            "
            aria-label="Settings"
          >
            <Settings className="h-[24px] w-[24px]" strokeWidth={2.4} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(true)}
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#1F2937]
              transition-colors
              hover:bg-slate-50
            "
            aria-label="Open notifications"
          >
            <Bell className="h-[23px] w-[23px]" strokeWidth={2.4} />

            {/* Notification Dot */}
            <span
              className="
                absolute
                right-[10px]
                top-[9px]
                h-[6px]
                w-[6px]
                rounded-full
                bg-red-500
              "
            />
          </button>

          {/* ------------------------------------------------------ */}
          {/* DOCTOR PROFILE */}
          {/* ------------------------------------------------------ */}

          <div
            className="
              flex
              items-center
              gap-3
              pl-1
              sm:gap-3
              sm:pl-2
            "
          >
            {/* Avatar Placeholder */}
            <div
              className="
                h-12
                w-12
                shrink-0
                overflow-hidden
                rounded-full
                bg-[#FFF3A6]
              "
            >
              <img
                src="/images/doctor-avatar.png"
                alt="Doctor profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Doctor Information */}
            <div className="hidden min-w-0 lg:block">
              <h4
                className="
                  whitespace-nowrap
                  text-[16px]
                  font-medium
                  leading-tight
                  tracking-[-0.2px]
                  text-[#111827]
                "
              >
                {doctorName}
              </h4>

              <p
                className="
                  mt-1
                  text-[11px]
                  font-medium
                  text-[#9CA3AF]
                "
              >
                Surgeon
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* MOBILE NAVIGATION */}
      {/* ---------------------------------------------------------- */}

      {isMobileMenuOpen && (
        <div
          className="
            absolute
            left-4
            right-4
            top-[88px]
            z-50
            flex
            flex-col
            gap-3
            rounded-2xl
            bg-white
            p-4
            shadow-xl
            md:hidden
          "
        >
          {/* Mobile Profile */}
          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-slate-100
              px-2
              pb-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-[#FFF3A6]
              "
            >
              <img
                src="/images/doctor-avatar.png"
                alt="Doctor profile"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">{doctorName}</h4>
              <p className="text-xs text-slate-500">Surgeon</p>
            </div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    router.push(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    transition-colors
                    ${
                      isActive
                        ? "bg-[#1F2937] text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* GREETING - Relaxed top margin to fix tightness */}
      {/* ---------------------------------------------------------- */}

      {showGreeting && (
        <div className="flex items-center justify-between px-3 pt-15 pb-6 sm:px-4">
          <h1
            className="
              flex
              items-center
              gap-2.5
              text-xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-2xl
            "
          >
            Welcome Back {doctorName}
            <Sun className="h-6 w-6 text-amber-500" fill="currentColor" />
          </h1>
        </div>
      )}
      {/* ---------------------------------------------------------- */}
      {/* NOTIFICATION DRAWER */}
      {/* ---------------------------------------------------------- */}

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
