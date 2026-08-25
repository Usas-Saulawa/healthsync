// components/dashboard_components/DashboardMetricsGrid.tsx
"use client";

import { Users, ArrowUpRight, ShieldAlert, Info, Loader2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/dashboard_hooks/useDashboardData";
import { SearchBar, FilterDropdown } from "@/components/ui/FilterTools";
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

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        {/* Loading state filter placeholder bar */}
        <div className="flex items-center justify-end gap-3 w-full">
          <div className="w-72 h-10 bg-slate-100 rounded-full animate-pulse" />
          <div className="w-36 h-10 bg-slate-100 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-blue-100/50 shadow-xs h-64 flex items-center justify-center"
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
      <div className="w-full p-6 bg-red-50 border border-red-100 rounded-3xl text-center text-red-600 text-sm">
        Unable to load dashboard metrics. Please check your connection.
      </div>
    );
  }

  const { totalPatients, todaysAppointments, criticalAlerts, topTreatments } =
    data.metrics;

  return (
    <div className="space-y-6 w-full">
      {/* Search and Filter Toolbar Row */}
      <div className="flex items-center justify-end gap-3 w-full">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
        <FilterDropdown
          label="Monthly"
          selectedOption={timeFilter}
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          onSelect={(val) => setTimeFilter(val)}
        />
      </div>

      {/* Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
        {/* Card 1: Total Patient */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-100/50 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm xl:text-base truncate">
                Total Patient
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
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
          <div className="h-24 w-full bg-blue-50/20 rounded-2xl p-1 relative overflow-hidden border border-blue-50/50">
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
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-100/50 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm xl:text-base truncate">
                Today&apos;s Appointment
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
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
                className="bg-slate-50/80 hover:bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-between transition-colors"
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
                      ? "bg-blue-100 text-blue-700"
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
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-100/50 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm xl:text-base truncate">
                Critical Alert
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              {criticalAlerts.count}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-semibold bg-red-50 text-red-600 whitespace-nowrap">
              Action Req.
            </span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            <div className="bg-red-50/75 border border-red-100 p-2.5 rounded-2xl flex items-start gap-2.5">
              <div className="p-1 bg-red-100 text-red-600 rounded-xl mt-0.5 shrink-0">
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

            <div className="bg-amber-50/75 border border-amber-100 p-2.5 rounded-2xl flex items-start gap-2.5">
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
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-100/50 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm xl:text-base truncate">
                Top Treatment
              </h3>
            </div>
            <button className="text-[11px] xl:text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 shrink-0">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-3">
            <span className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              {topTreatments.count}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-semibold bg-blue-50 text-blue-600 whitespace-nowrap">
              Active Breakdown
            </span>
          </div>

          <div className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between text-[10px] xl:text-xs text-slate-500 px-0.5">
              {topTreatments.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex items-center gap-1.5 truncate"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${stat.color} shrink-0`}
                  />
                  <span className="truncate">{stat.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {topTreatments.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-slate-50/80 p-2 rounded-xl border border-slate-100 truncate"
                >
                  <span className="text-xs xl:text-sm font-extrabold text-slate-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex h-2.5 w-full rounded-xl overflow-hidden bg-slate-100 gap-1.5 p-0.5">
              <div
                className="bg-blue-600 rounded-lg h-full transition-all duration-500"
                style={{ width: "60%" }}
              />
              <div
                className="bg-blue-200 rounded-lg h-full transition-all duration-500"
                style={{ width: "15%" }}
              />
              <div
                className="bg-slate-200 rounded-lg h-full transition-all duration-500"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
