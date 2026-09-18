// components/dashboard_components/DashboardMetricsGrid.tsx
"use client";

import {
  Users,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Loader2,
  CalendarDays,
  OctagonAlert,
  Stethoscope,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/dashboard_hooks/useDashboardData";

import { useState } from "react";
import { motion } from "framer-motion";
import MetricsBar from "../ui/TopTreatmentMetrics";
import { title } from "process";

// Dynamic chart data points with time periods for hover details
const chartTrendData = [
  { time: "Week 1", value: 25 },
  { time: "Week 2", value: 45 },
  { time: "Week 3", value: 20 },
  { time: "Week 4", value: 35 },
  { time: "Week 5", value: 50 },
  { time: "Week 6", value: 30 },
  { time: "Week 7", value: 65 },
  { time: "Week 8", value: 40 },
  { time: "Week 9", value: 25 },
  { time: "Week 10", value: 38 },
];

// Custom interactive Tooltip to display period and patient count on hover
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-900 px-3 py-2 shadow-lg border border-slate-800 text-white text-xs z-50">
        <p className="font-medium text-slate-300 mb-0.5">Period: {label}</p>
        <p className="font-bold text-blue-400">
          {payload[0].value}{" "}
          <span className="text-slate-400 font-normal">patients</span>
        </p>
      </div>
    );
  }
  return null;
}

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
          <div className="w-72 h-10 bg-(--background) rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-(--card) p-6 rounded-3xl shadow-xs h-64 flex items-center justify-center"
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
      <div className="w-full p-6 bg-red-50 rounded-3xl text-center text-red-600 text-sm">
        Unable to load dashboard metrics. Please check your connection.
      </div>
    );
  }

  const { totalPatients, todaysAppointments, criticalAlerts, topTreatments } =
    data.metrics;

  return (
    <div className="space-y-6 w-full">
      {/* Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 w-full">
        {/* Card 1: Total Patient */}
        {[
          {
            Icon: <Users className="h-4 w-4 text-(--primary)" />,
            title: "Total Patient",
            onClick: () => {},
            count: totalPatients.count,
            change: totalPatients.growth,
            jsx: (
              <>
                <div className="grid grid-cols-3 gap-1 text-[10px] xl:text-xs mb-3">
                  <div className="flex items-center gap-1.5 truncate">
                    <div className="h-2 w-2 rounded-full bg-(--graph-col-1) shrink-0" />
                    <span className="truncate">
                      In ({totalPatients.breakdown.inPatients})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <div className="h-2 w-2 rounded-full bg-(--graph-col-2) shrink-0" />
                    <span className="truncate">
                      Disch ({totalPatients.breakdown.discharged})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <div className="h-2 w-2 rounded-full bg-(--graph-col-3) shrink-0" />
                    <span className="truncate">
                      Out ({totalPatients.breakdown.outPatients})
                    </span>
                  </div>
                </div>

                {/* Professional Recharts Area Chart Container */}
                <div className="flex-1 w-full bg-(--background) p-1 relative overflow-hidden ">
                  <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 pointer-events-none z-0">
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-b border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-r border-b border-dashed border-(--border)" />
                    <div className="border-b border-(--border)" />
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
                          <stop
                            offset="5%"
                            stopColor="#2563eb"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2563eb"
                            stopOpacity={0.0}
                          />
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
              </>
            ),
          },
          {
            Icon: <CalendarDays className="h-4 w-4 text-(--primary)" />,
            title: "Todays Appointments",
            onClick: () => {},
            count: todaysAppointments.count,
            change: `+${todaysAppointments.nextAppointmentTime}`,
            jsx: (
              <>
                <div className="flex-1 flex flex-col gap-3 justify-end">
                  {todaysAppointments.queue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-(--info-card) hover:bg-(--table-card) cursor-pointer p-3 rounded-lg flex items-center justify-between transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 text-[10px] xl:text-xs font-semibold text-blue-600 mb-0.5">
                          <span className="text-(--info-title)">
                            {item.time}
                          </span>
                          <span className="text-(--shade)">•</span>
                          <span className="text-(--shade) font-normal truncate">
                            {item.hospNo}
                          </span>
                        </div>
                        <h4 className="text-xs xl:text-sm font-bold truncate">
                          {item.name}
                        </h4>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] xl:text-xs font-medium shrink-0 ${
                          item.status === "Checked In"
                            ? "bg-(--info-icon-bg) text-(--info-title)"
                            : "bg-(--warning-card) text-(--warning-title)"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ),
          },
          {
            Icon: <OctagonAlert className="h-4 w-4 text-(--primary)" />,
            title: "Critical Alerts",
            onClick: () => {},
            count: criticalAlerts.count,
            change: "+12 alerts",
            jsx: (
              <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                <div className="bg-(--danger-card)  p-2.5 rounded-lg flex items-start gap-2.5">
                  <div className="p-1 bg-(--danger-icon-bg) text-(--button-text) rounded-lg mt-0.5 shrink-0">
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] xl:text-xs font-bold text-(--danger-title) uppercase tracking-wide truncate">
                      Critical Vitals
                    </h4>
                    <p className="text-[10px] xl:text-xs text-(--danger-text) mt-0.5 line-clamp-2">
                      <span className="font-semibold">
                        {criticalAlerts.vitals.patient}
                      </span>{" "}
                      — {criticalAlerts.vitals.detail}
                    </p>
                  </div>
                </div>

                <div className="bg-(--warning-card)  p-2.5 rounded-lg flex items-start gap-2.5">
                  <div className="p-1 bg-(--warning-icon-bg) text-(--button-text) rounded-xl mt-0.5 shrink-0">
                    <Info className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] xl:text-xs font-bold text-(--warning-title) uppercase tracking-wide truncate">
                      Abnormal Lab
                    </h4>
                    <p className="text-[10px] xl:text-xs text-(--warning-text) mt-0.5 line-clamp-2">
                      <span className="font-semibold">
                        {criticalAlerts.labs.patient}
                      </span>{" "}
                      — {criticalAlerts.labs.detail}
                    </p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            Icon: <Stethoscope className="h-4 w-4 text-(--primary)" />,
            title: "Top Treatments",
            onClick: () => {},
            count: topTreatments.count,
            change: `+7% this week`,
            jsx: (
              <>
                <div className=" flex-1 grid grid-cols-3 gap-2 mb-3 text-xs font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full bg-(--graph-col-1) shrink-0" />
                    <span className="truncate">Surgery</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full bg-(--graph-col-2) shrink-0" />
                    <span className="truncate">Consultation</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full bg-(--graph-col-3) shrink-0" />
                    <span className="truncate">Diagnosis</span>
                  </div>
                </div>

                <MetricsBar
                  treatments={[
                    {
                      percentage: 58,
                      value: 70,
                      report: {
                        "Top Doctor": "Dr Bashir",
                        Count: 40,
                        "In Patients": 30,
                        "Out Patients": 10,
                      },
                    },
                    {
                      percentage: 17,
                      value: 30,
                      report: {
                        "Top Doctor": "Dr Bashir",
                        Count: 40,
                        "In Patients": 30,
                        "Out Patients": 10,
                      },
                    },
                    {
                      percentage: 25,
                      value: 42,
                      report: {
                        "Top Doctor": "Dr Bashir",
                        Count: 40,
                        "In Patients": 30,
                        "Out Patients": 10,
                      },
                    },
                  ]}
                />
              </>
            ),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-(--card) p-5 rounded-xl  shadow-xs flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-10 w-10 rounded-full bg-(--info-icon-bg) text-(--button) flex items-center justify-center shrink-0">
                  {item.Icon}
                </div>
                <h3 className="font-semibold text-(--card-title) text-sm whitespace-nowrap">
                  {item.title}
                </h3>
              </div>
              <button
                onClick={item.onClick}
                className="text-sm cursor-pointer font-semibold text-(--link-text) hover:text-(--primary) flex items-center gap-0.5 shrink-0"
              >
                View All
              </button>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 mb-3">
              <span className="text-3xl xl:text-4xl font-extrabold tracking-tight">
                {item.count}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] xl:text-xs font-semibold bg-(--info-icon-bg) text-(--info-title) whitespace-nowrap">
                {item.change}
              </span>
            </div>

            {item.jsx}
          </div>
        ))}
      </div>
    </div>
  );
}
