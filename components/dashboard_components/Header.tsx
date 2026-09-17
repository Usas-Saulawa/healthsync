// components/dashboard_components/Header.tsx
"use client";

import { useState } from "react";
import { Activity, Settings, Bell, Menu, X } from "lucide-react";
import { useHeader } from "@/hooks/dashboard_hooks/useHeader";
import { NotificationDrawer } from "@/components/dashboard_components/NotificationDrawer";

export function Header() {
  const { doctorName, currentPath, router, navItems } = useHeader();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      {/* STICKY HEADER CONTAINER */}
      <div className="sticky top-0 z-40 pb-1 w-full bg-(--background) transition-all">
        {/* Main Header */}
        <header
          className="
            relative
            z-40
            grid
            grid-cols-3
            min-h-12
            w-full
            items-center
            justify-between
            gap-4
            rounded-full
            bg-(--card)
            px-6
            py-3
            shadow-xs
          "
        >
          {/* LEFT SIDE - LOGO */}
          <div className="flex flex-1 shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--card) transition-colors hover:bg-(--card-hover) md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.4} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.4} />
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex shrink-0 items-center gap-3 text-left"
              aria-label="Go to dashboard"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--primary) text-white">
                <Activity className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <span className="hidden whitespace-nowrap text-[22px] font-bold tracking-[-0.7px] lg:inline-block">
                HealthCare
              </span>
            </button>
          </div>

          {/* CENTER - MAIN NAVIGATION (Figma: height 71px, background #EFF2F4, padding top/bottom 4px, left/right 5px, gap 11px) */}
          <nav
            className="hidden flex-1 h-full items-stretch rounded-full bg-(--active-track) px-1.25 py-1 md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === "/dashboard"
                  ? currentPath === "/dashboard"
                  : currentPath.startsWith(item.path);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => router.push(item.path)}
                  className={`flex flex-1 items-center justify-center rounded-full py-4 px-7 text-[16px] font-medium tracking-[-0.2px] transition-all duration-200 ${
                    isActive
                      ? "bg-(--active-bg) text-(--active-text)"
                      : "text-(--text) hover:bg-(--card)/70"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* RIGHT SIDE - ACTIONS + PROFILE */}
          <div className="flex shrink-0 flex-1 items-center justify-end gap-2">
            <button
              type="button"
              className="flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-full  transition-colors hover:bg-(--card-hover) shadow-[inset_1px_1px_5px_rgba(0,0,0,0.1)]"
              aria-label="Settings"
            >
              <Settings className="text-12" />
            </button>

            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              className="relative flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center rounded-full transition-colors hover:bg-(--card-hover) shadow-[inset_1px_1px_5px_rgba(0,0,0,0.1)]"
              aria-label="Open notifications"
            >
              <Bell className="text-3xl" />
              <span className="absolute right-2.5 top-2.25 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-3 pl-1 sm:gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#FFF3A6]">
                <img
                  src="/images/profile.jpeg"
                  alt="Doctor profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="hidden min-w-0 lg:block">
                <h4 className="whitespace-nowrap text-[16px] font-medium leading-tight tracking-[-0.2px] max-w-28 truncate">
                  {doctorName}
                </h4>
                <p className="mt-1 text-[11px] font-medium text-(--shade)">
                  Surgeon
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE NAVIGATION DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="absolute left-4 right-4 top-22 z-50 flex flex-col gap-3 rounded-2xl bg-(--background) p-4 shadow-xl md:hidden">
            <div className="flex items-center gap-3 px-2 pb-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#FFF3A6]">
                <img
                  src="/images/profile.jpeg"
                  alt="Doctor profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold">{doctorName}</h4>
                <p className="text-xs text-(--shade)">Surgeon</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? currentPath === "/dashboard"
                    : currentPath.startsWith(item.path);

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      router.push(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-(--active-bg) text-(--active-text)"
                        : "text-(--active-text) hover:bg-(--card-hover)"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
