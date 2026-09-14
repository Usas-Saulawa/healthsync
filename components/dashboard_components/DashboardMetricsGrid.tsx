// components/dashboard_components/DashboardMetricsGrid.tsx
"use client";

import { Users, ArrowUpRight, ShieldAlert, Info, Loader2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/dashboard_hooks/useDashboardData";

import { useState } from "react";

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

  // State for the filter tools
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("Monthly");
  const [timeFilterValue, setTimeFilterValue] = useState("monthly");

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        {/* Loading state filter placeholder bar */}
        <div className="flex items-center justify-end w-full">
          <div className="w-72 h-10 bg-[#ECF2F9] rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl shadow-xs h-64 flex items-center justify-center"
            >
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full p-6 bg-red-50  rounded-3xl text-center text-red-600 text-sm">
        Unable to load dashboard metrics. Please check your connection.
      </div>
    );
  }

  const { totalPatients, todaysAppointments, criticalAlerts, topTreatments } =
    data.metrics;

  return (
    <div className="space-y-6 w-full">
      {/* Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
        {/* Card 1: Total Patient */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl  shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-[13px] whitespace-nowrap">
                Total Patient
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              {totalPatients.count}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-semibold bg-blue-50 text-blue-600 whitespace-nowrap">
              {totalPatients.growth}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-[10px] xl:text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1.5 truncate">
              <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
              <span className="truncate">
                In ({totalPatients.breakdown.inPatients})
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <div className="h-2 w-2 rounded-full bg-sky-300 shrink-0" />
              <span className="truncate">
                Disch ({totalPatients.breakdown.discharged})
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <div className="h-2 w-2 rounded-full bg-indigo-900 shrink-0" />
              <span className="truncate">
                Out ({totalPatients.breakdown.outPatients})
              </span>
            </div>
          </div>

          {/* Professional Recharts Area Chart Container */}
          <div className="h-24 w-full bg-blue-50/20 rounded-2xl p-1 relative overflow-hidden ">
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
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-[13px] whitespace-nowrap">
                Today's Appointment
              </h3>
            </div>
            <button
              title="View all appointments"
              className="font-['Nunito'] font-semibold text-[14px] leading-[150%] text-center text-blue-600 hover:text-blue-700 transition-colors shrink-0 cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              {todaysAppointments.count}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-semibold bg-blue-50 text-blue-600 whitespace-nowrap">
              +{todaysAppointments.nextAppointmentTime}
            </span>
          </div>

          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {todaysAppointments.queue.map((item) => (
              <div
                key={item.id}
                className="bg-[#EBF5FF] hover:bg-slate-50 p-2.5 rounded-lg flex items-center justify-between transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 text-[10px] xl:text-xs font-semibold text-blue-600 mb-0.5">
                    <span>{item.time}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-normal truncate">
                      {item.hospNo}
                    </span>
                  </div>
                  <h4 className="text-xs xl:text-sm font-bold text-slate-900 truncate">
                    {item.name}
                  </h4>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] xl:text-xs font-medium shrink-0 ${
                    item.status === "Checked In"
                      ? "bg-blue-100/90 text-blue-700"
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
        <div className="bg-white p-5 sm:p-6 rounded-2xl  shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-[13px] whitespace-nowrap">
                Critical Alert
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              {criticalAlerts.count}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-700">
              +23
            </span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            <div className="bg-[#FEF2F2]  p-2.5 rounded-lg flex items-start gap-2.5">
              <div className="p-1 bg-[#FEF2F2] text-red-600 rounded-lg mt-0.5 shrink-0">
                <ShieldAlert className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] xl:text-xs font-bold text-red-800 uppercase tracking-wide truncate">
                  Critical Vitals
                </h4>
                <p className="text-[10px] xl:text-xs text-red-700 mt-0.5 line-clamp-2">
                  <span className="font-semibold">
                    {criticalAlerts.vitals.patient}
                  </span>{" "}
                  — {criticalAlerts.vitals.detail}
                </p>
              </div>
            </div>

            <div className="bg-[#FFFBEB]  p-2.5 rounded-lg flex items-start gap-2.5">
              <div className="p-1 bg-amber-100 text-amber-700 rounded-xl mt-0.5 shrink-0">
                <Info className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] xl:text-xs font-bold text-amber-800 uppercase tracking-wide truncate">
                  Abnormal Lab
                </h4>
                <p className="text-[10px] xl:text-xs text-amber-700 mt-0.5 line-clamp-2">
                  <span className="font-semibold">
                    {criticalAlerts.labs.patient}
                  </span>{" "}
                  — {criticalAlerts.labs.detail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Top Treatment */}
        <div className="bg-white p-6 sm:p-7 rounded-[16px] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-[13px] whitespace-nowrap">
                Top Treatment
              </h3>
            </div>
            <button
              title="View all treatments"
              className="font-['Nunito'] font-medium text-[14px] leading-[150%] text-center text-blue-600 hover:text-blue-700 transition-colors shrink-0 cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {topTreatments.count}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-700">
              +23
            </span>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <span className="h-2 w-2 rounded-full bg-[#1C64F2] shrink-0" />
              <span className="truncate">Surgery</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <span className="h-2 w-2 rounded-full bg-[#C3DDFD] shrink-0" />
              <span className="truncate">Consultation</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <span className="h-2 w-2 rounded-full bg-[#DFE5EE] shrink-0" />
              <span className="truncate">Diagnosis</span>
            </div>
          </div>

          {/* Proportionally Sized Bar & Metrics Section */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Values Row */}
            <div className="flex items-center justify-between px-1">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                200
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                40
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                80
              </span>
            </div>

            {/* Proportional Bars Container matching Figma width ratios (137 : 58 : 91) */}
            <div className="flex items-center gap-1 w-full">
              <div
                style={{ flex: "137" }}
                className="h-[40px] bg-[#1C64F2] rounded-[6px] shadow-xs"
              />
              <div
                style={{ flex: "58" }}
                className="h-[40px] bg-[#C3DDFD] rounded-[6px]"
              />
              <div
                style={{ flex: "91" }}
                className="h-[40px] bg-[#DFE5EE] rounded-[6px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
