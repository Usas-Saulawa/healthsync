// components/dashboard/ClinicalMetricsGroup.tsx
"use client";

import {
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Info,
} from "lucide-react";
import { mockDashboardMetrics } from "@/mock/mockDashboardData";

export function ClinicalMetricsGroup() {
  const { criticalAlerts, topTreatments } = mockDashboardMetrics;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Card 3: Critical Alert */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Critical Alert
            </h3>
          </div>
          <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Metric Value & Badge */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {criticalAlerts.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600">
            Action Req.
          </span>
        </div>

        {/* Alert Boxes Stack */}
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {/* Critical Vitals Alert */}
          <div className="bg-red-50/70 border border-red-100 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="p-1.5 bg-red-100 text-red-600 rounded-xl mt-0.5">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-800 uppercase tracking-wide">
                Critical Vitals
              </h4>
              <p className="text-xs text-red-700 mt-0.5">
                <span className="font-semibold">
                  Patient: {criticalAlerts.vitals.patient}
                </span>{" "}
                — {criticalAlerts.vitals.detail}
              </p>
            </div>
          </div>

          {/* Abnormal Lab Alert */}
          <div className="bg-amber-50/70 border border-amber-100 p-3.5 rounded-2xl flex items-start gap-3">
            <div className="p-1.5 bg-amber-100 text-amber-700 rounded-xl mt-0.5">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Abnormal Lab
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
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
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Top Treatment</h3>
          </div>
          <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Metric Value & Badge */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {topTreatments.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary-600">
            Active Breakdown
          </span>
        </div>

        {/* Treatment Category Stats Breakdown */}
        <div className="space-y-4 pt-2">
          {/* Legend indicators */}
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            {topTreatments.stats.map((stat) => (
              <div key={stat.name} className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${stat.color}`} />
                <span>{stat.name}</span>
              </div>
            ))}
          </div>

          {/* Numeric values layout */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {topTreatments.stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-gray-50 p-2.5 rounded-xl border border-gray-100"
              >
                <span className="text-sm font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Visual Bar Graph Split */}
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-gray-100 gap-1 p-0.5">
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
