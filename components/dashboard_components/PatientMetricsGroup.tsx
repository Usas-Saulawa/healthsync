// components/dashboard/PatientMetricsGroup.tsx
"use client";

import { Users, Calendar, ArrowUpRight } from "lucide-react";
import { mockDashboardMetrics } from "@/mock/mockDashboardData";

export function PatientMetricsGroup() {
  const { totalPatients, todaysAppointments } = mockDashboardMetrics;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Card 1: Total Patient */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Total Patient</h3>
          </div>
          <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Metric Value & Growth Badge */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {totalPatients.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary-600">
            {totalPatients.growth}
          </span>
        </div>

        {/* Legend / Breakdown Tags */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary-600" />
            <span>In-patients ({totalPatients.breakdown.inPatients})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-sky-300" />
            <span>Discharged ({totalPatients.breakdown.discharged})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-indigo-900" />
            <span>Outpatients ({totalPatients.breakdown.outPatients})</span>
          </div>
        </div>

        {/* Visual Trend Line Graph Mock */}
        <div className="h-24 w-full bg-gradient-to-b from-blue-50/50 to-transparent rounded-2xl p-2 relative overflow-hidden flex items-end">
          <svg
            className="absolute inset-0 w-full h-full text-primary-500 overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 40"
          >
            <path
              d="M0 30 Q 15 10, 30 25 T 60 15 T 90 35 L 100 40 L 0 40 Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M0 30 Q 15 10, 30 25 T 60 15 T 90 35 L 100 38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: Today's Appointment */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              Today&apos;s Appointment
            </h3>
          </div>
          <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Metric Value & Badge */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {todaysAppointments.count}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary-600">
            +{todaysAppointments.nextAppointmentTime} mins
          </span>
        </div>

        {/* Queue List Items */}
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {todaysAppointments.queue.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50/80 hover:bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center justify-between transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 mb-0.5">
                  <span>{item.time}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-normal">
                    {item.hospNo}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.type}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
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
    </div>
  );
}
