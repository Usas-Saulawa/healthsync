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
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/dashboard_hooks/useDashboardData";

// Dynamic chart data points derived or scaled from metric properties
const chartTrendData = [
  { value: 25 },
  { value: 45 },
  { value: 20 },
  { value: 35 },
  { value: 50 },
  { value: 30 },
  { value: 65 },
  { value: 40 },
  { value: 25 },
  { value: 38 },
];

export function DashboardMetricsGrid() {
  const { data, isLoading, isError } = useDashboardData();

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
          <div className="flex items-center gap-2.5">
            {/* Exact solid-fill icon wrapper matching screenshot */}
            <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
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

        {/* Professional Recharts Area Chart Container with Background Grid */}
        <div className="h-24 sm:h-28 w-full bg-blue-50/20 rounded-2xl p-1 relative overflow-hidden border border-blue-50/50">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 pointer-events-none z-0">
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

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartTrendData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="patientTrendGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#patientTrendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Card 2: Today's Appointment */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            {/* Exact solid-fill icon wrapper matching screenshot */}
            <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
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
            {/* Exact solid-fill icon wrapper matching screenshot */}
            <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
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
          <div className="flex items-center gap-2.5">
            {/* Users filled icon wrapper matching screenshot */}
            <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xs sm:text-base truncate">
              Top Treatment
            </h3>
          </div>
          <button className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5 shrink-0">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {topTreatments.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-50 text-primary-600 whitespace-nowrap">
            Active Breakdown
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-1 flex-1 flex flex-col justify-center">
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

          {/* Numeric Values Display matching the screenshot card layout */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            {topTreatments.stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-50/80 p-2 sm:p-2.5 rounded-xl border border-gray-100 truncate"
              >
                <span className="text-xs sm:text-sm font-extrabold text-gray-900">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Thinner, sleeker progress breakdown matching the card view */}
          <div className="flex h-2 sm:h-2.5 w-full rounded-xl overflow-hidden bg-gray-100 gap-1.5 p-0.5">
            <div
              className="bg-blue-600 rounded-lg h-full transition-all duration-500"
              style={{ width: "60%" }}
            />
            <div
              className="bg-blue-200 rounded-lg h-full transition-all duration-500"
              style={{ width: "15%" }}
            />
            <div
              className="bg-gray-200 rounded-lg h-full transition-all duration-500"
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
