// components/dashboard_components/FollowUpsWidget.tsx
"use client";

import Link from "next/link";
import { Calendar, CalendarDays } from "lucide-react";
import { FollowUpItem } from "@/lib/validations/dashboard";
import { mockFollowUps } from "@/mock/mockDashboardData";

interface FollowUpsWidgetProps {
  followUps?: FollowUpItem[];
  className?: string;
}

export function FollowUpsWidget({
  followUps = mockFollowUps,
  className = "",
}: FollowUpsWidgetProps) {
  return (
    <div
      className={`bg-(--card)  p-5 shadow-xs rounded-xl space-y-4 overflow-hidden ${className}`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="h-10 w-10 rounded-full bg-(--info-icon-bg) text-(--primary) flex items-center justify-center shrink-0">
            <CalendarDays />
          </div>
          <h2 className="text-sm font-bold tracking-tight truncate">
            Follow-ups
          </h2>
        </div>
        <Link
          href="/dashboard/follow-ups"
          className="text-sm font-semibold text-(--active-track) hover:text-(--primary) transition-colors shrink-0"
        >
          View All
        </Link>
      </div>

      {/* Status Legend Indicators */}
      <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] xl:text-xs text-slate-500 font-medium pt-1 flex-wrap gap-y-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-(--graph-col-1) inline-block shrink-0"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-(--graph-col-2) inline-block shrink-0"></span>
          <span>Unselected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-(--graph-col-3) inline-block shrink-0"></span>
          <span>Unavailable</span>
        </div>
      </div>

      {/* Follow-ups List Container */}
      <div className="space-y-3.5">
        {followUps.map((item) => {
          // Dynamic status pill styling based on state
          const isCheckedIn = item.status === "Checked In";
          const statusBadgeStyle = isCheckedIn
            ? "bg-[#cce5ff] text-[#004085] border border-[#b8daff]"
            : "bg-[#fff3cd] text-[#856404] border border-[#ffeeba]";

          return (
            <div
              key={item.id}
              className="bg-(--info-card) hover:bg-blue-100/60 transition-all p-4 sm:p-5 rounded-lg  flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0 pr-2">
                <span className="text-[11px] xl:text-xs font-bold text-(--info-title) tracking-wide uppercase block truncate">
                  {item.time}
                </span>
                <h3 className="text-sm sm:text-base font-bold truncate">
                  {item.name}
                </h3>
                <p className="text-[11px] xl:text-xs text-slate-500 font-medium truncate">
                  {item.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-bold shadow-2xs whitespace-nowrap ${statusBadgeStyle}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
