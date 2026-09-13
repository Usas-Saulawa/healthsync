// components/dashboard_components/FollowUpsWidget.tsx
"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
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
      className={`bg-white  p-6 sm:p-8 shadow-xs rounded-[16px] space-y-6 overflow-hidden ${className}`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-blue-50/80 flex items-center justify-center text-blue-600 shadow-inner shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight truncate">
            Follow-ups
          </h2>
        </div>
        <Link
          href="/dashboard/follow-ups"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
        >
          View All
        </Link>
      </div>

      {/* Status Legend Indicators */}
      <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] xl:text-xs text-slate-500 font-medium pt-1 flex-wrap gap-y-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block shrink-0"></span>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-200 inline-block shrink-0"></span>
          <span>Unselected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-slate-300 inline-block shrink-0"></span>
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
              className="bg-blue-50 hover:bg-blue-100/60 transition-all p-4 sm:p-5 rounded-[16px]  flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0 pr-2">
                <span className="text-[11px] xl:text-xs font-bold text-blue-600 tracking-wide uppercase block truncate">
                  {item.time}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
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
