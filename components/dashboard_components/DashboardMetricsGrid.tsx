// components/dashboard_components/DashboardMetricsGrid.tsx
"use client";

import {
  Users,
  Calendar,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Loader2,
} from "lucide-react";
import { useDashboardData } from "@/hooks/dashboard_hooks/useDashboardData";

export function DashboardMetricsGrid() {
  const { data, isLoading, isError } = useDashboardData();

  // Show a sleek loading skeleton or indicator if data is fetching on initial load
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 flex items-center justify-center"
          >
            <Loader2 className="h-6 w-6 text-primary-600 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  // Handle graceful fallback/error states if needed
  if (isError || !data) {
    return (
      <div className="w-full p-6 bg-red-50 border border-red-100 rounded-3xl text-center text-red-600 text-sm">
        Unable to load dashboard metrics. Please check your connection.
      </div>
    );
  }

  const { totalPatients, todaysAppointments, criticalAlerts, topTreatments } =
    data.metrics;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {/* Card 1: Total Patient */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-blue-50/80 text-primary-600 flex items-center justify-center shrink-0 shadow-inner">
              <Users className="h-5 w-5 fill-blue-100/50" />
            </div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base truncate">
              Total Patient
            </h3>
          </div>
          <button className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 shrink-0">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {totalPatients.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50 text-primary-600 whitespace-nowrap">
            {totalPatients.growth}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary-600 shrink-0" />
            <span className="truncate">
              In-patients ({totalPatients.breakdown.inPatients})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-sky-300 shrink-0" />
            <span className="truncate">
              Discharged ({totalPatients.breakdown.discharged})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-indigo-900 shrink-0" />
            <span className="truncate">
              Outpatients ({totalPatients.breakdown.outPatients})
            </span>
          </div>
        </div>

        {/* Enhanced Chart Box with Grid Lines matching the design image */}
        <div className="h-24 sm:h-28 w-full bg-blue-50/20 rounded-2xl p-2 relative overflow-hidden flex items-end border border-blue-50/50">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 pointer-events-none">
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-r border-b border-blue-100/40" />
            <div className="border-b border-blue-100/40" />
          </div>

          <svg
            className="absolute inset-0 w-full h-full text-primary-600 overflow-visible z-10"
            preserveAspectRatio="none"
            viewBox="0 0 100 40"
          >
            <path
              d="M0 25 Q 12 5, 25 22 T 50 12 T 75 28 T 100 35 L 100 40 L 0 40 Z"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <path
              d="M0 25 Q 12 5, 25 22 T 50 12 T 75 28 T 100 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: Today's Appointment */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base truncate">
              Today&apos;s Appointment
            </h3>
          </div>
          <button className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 shrink-0">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {todaysAppointments.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50 text-primary-600 whitespace-nowrap">
            +{todaysAppointments.nextAppointmentTime}
          </span>
        </div>

        <div className="space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-center">
          {todaysAppointments.queue.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/80 hover:bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100 flex items-center justify-between transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-primary-600 mb-0.5">
                  <span>{item.time}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-normal truncate">
                    {item.hospNo}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                  {item.type}
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium shrink-0 ${
                  item.status === "Checked In"
                    ? "bg-blue-100 text-primary-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Critical Alert */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base truncate">
              Critical Alert
            </h3>
          </div>
          <button className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 shrink-0">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {criticalAlerts.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-red-50 text-red-600 whitespace-nowrap">
            Action Req.
          </span>
        </div>

        <div className="space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-center">
          <div className="bg-red-50/75 border border-red-100 p-3 rounded-2xl flex items-start gap-2.5">
            <div className="p-1.5 bg-red-100 text-red-600 rounded-xl mt-0.5 shrink-0">
              <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-bold text-red-800 uppercase tracking-wide truncate">
                Critical Vitals
              </h4>
              <p className="text-[10px] sm:text-xs text-red-700 mt-0.5 line-clamp-2">
                <span className="font-semibold">
                  Patient: {criticalAlerts.vitals.patient}
                </span>{" "}
                — {criticalAlerts.vitals.detail}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/75 border border-amber-100 p-3 rounded-2xl flex items-start gap-2.5">
            <div className="p-1.5 bg-amber-100 text-amber-700 rounded-xl mt-0.5 shrink-0">
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase tracking-wide truncate">
                Abnormal Lab
              </h4>
              <p className="text-[10px] sm:text-xs text-amber-700 mt-0.5 line-clamp-2">
                <span className="font-semibold">
                  Patient: {criticalAlerts.labs.patient}
                </span>{" "}
                — {criticalAlerts.labs.detail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Top Treatment */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base truncate">
              Top Treatment
            </h3>
          </div>
          <button className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 shrink-0">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {topTreatments.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50 text-primary-600 whitespace-nowrap">
            Active Breakdown
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 px-0.5">
            {topTreatments.stats.map((stat) => (
              <div
                key={stat.name}
                className="flex items-center gap-1 sm:gap-1.5 truncate"
              >
                <div
                  className={`h-2 w-2 rounded-full ${stat.color} shrink-0`}
                />
                <span className="truncate">{stat.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            {topTreatments.stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-50 p-2 sm:p-2.5 rounded-xl border border-gray-100 truncate"
              >
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex h-2.5 sm:h-3 w-full rounded-full overflow-hidden bg-gray-100 gap-1 p-0.5">
            <div
              className="bg-primary-600 rounded-full h-full"
              style={{ width: "60%" }}
            />
            <div
              className="bg-primary-200 rounded-full h-full"
              style={{ width: "15%" }}
            />
            <div
              className="bg-gray-300 rounded-full h-full"
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
