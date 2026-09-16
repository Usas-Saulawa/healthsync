// src/components/patients_components/details/tabs/overview/PatientOverviewMetricsChart.tsx

"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type VitalMetric =
  | "Heart Rate"
  | "Blood Pressure"
  | "Glucose Level"
  | "Oxygen Saturation";

interface VitalDataPoint {
  time: string;
  value: number;
}

const metricData: Record<VitalMetric, VitalDataPoint[]> = {
  "Heart Rate": [
    { time: "08:00", value: 72 },
    { time: "09:00", value: 75 },
    { time: "10:00", value: 78 },
    { time: "11:00", value: 82 },
    { time: "12:00", value: 80 },
    { time: "13:00", value: 85 },
    { time: "14:00", value: 79 },
    { time: "15:00", value: 76 },
    { time: "16:00", value: 88 },
    { time: "17:00", value: 81 },
    { time: "18:00", value: 77 },
    { time: "19:00", value: 74 },
  ],

  "Blood Pressure": [
    { time: "08:00", value: 120 },
    { time: "09:00", value: 122 },
    { time: "10:00", value: 118 },
    { time: "11:00", value: 125 },
    { time: "12:00", value: 130 },
    { time: "13:00", value: 128 },
    { time: "14:00", value: 135 },
    { time: "15:00", value: 124 },
    { time: "16:00", value: 120 },
    { time: "17:00", value: 126 },
    { time: "18:00", value: 122 },
    { time: "19:00", value: 119 },
    { time: "20:00", value: 121 },
  ],

  "Glucose Level": [
    { time: "08:00", value: 95 },
    { time: "09:00", value: 110 },
    { time: "10:00", value: 105 },
    { time: "11:00", value: 140 },
    { time: "12:00", value: 130 },
    { time: "13:00", value: 160 },
    { time: "14:00", value: 145 },
    { time: "15:00", value: 115 },
    { time: "16:00", value: 135 },
    { time: "17:00", value: 120 },
    { time: "18:00", value: 150 },
    { time: "19:00", value: 135 },
    { time: "20:00", value: 140 },
  ],

  "Oxygen Saturation": [
    { time: "08:00", value: 98 },
    { time: "09:00", value: 97 },
    { time: "10:00", value: 99 },
    { time: "11:00", value: 96 },
    { time: "12:00", value: 97 },
    { time: "13:00", value: 95 },
    { time: "14:00", value: 96 },
    { time: "15:00", value: 98 },
    { time: "16:00", value: 97 },
    { time: "17:00", value: 98 },
    { time: "18:00", value: 96 },
    { time: "19:00", value: 97 },
    { time: "20:00", value: 98 },
  ],
};

const metricTabs: VitalMetric[] = [
  "Heart Rate",
  "Blood Pressure",
  "Glucose Level",
  "Oxygen Saturation",
];

interface PatientVitalsTimelineProps {
  initialMetric?: VitalMetric;
}

// Custom interactive Tooltip to display time and value on hover

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-900 px-3 py-2 shadow-lg border border-slate-800 text-white text-xs">
        <p className="font-medium text-slate-300 mb-0.5">Time: {label}</p>
        <p className="font-bold text-blue-400">
          {payload[0].value}{" "}
          <span className="text-slate-400 font-normal">units</span>
        </p>
      </div>
    );
  }
  return null;
}

export function PatientOverViewMetricsChart({
  initialMetric = "Blood Pressure",
}: PatientVitalsTimelineProps) {
  const [activeMetric, setActiveMetric] = useState<VitalMetric>(initialMetric);

  const chartData = metricData[activeMetric];

  return (
    <section className="w-full rounded-[15px] bg-white px-[39px] pb-[37px] pt-[23px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-medium leading-[20px] text-[#111827]">
          Health Metrics Timeline
        </h2>

        {/* Metric Tabs */}
        <div className="flex h-[32px] items-center rounded-[8px] bg-[#F1F3F7] p-0">
          {metricTabs.map((metric) => {
            const isActive = activeMetric === metric;

            return (
              <button
                key={metric}
                type="button"
                onClick={() => setActiveMetric(metric)}
                className={[
                  "h-[32px] whitespace-nowrap rounded-[7px]",
                  "px-[16px] text-[12px] font-medium",
                  "leading-none transition-all duration-300 ease-out",
                  "focus:outline-none",
                  isActive
                    ? "bg-[#2167F3] text-white shadow-[0_1px_2px_rgba(33,103,243,0.18)]"
                    : "bg-transparent text-[#1F2937] hover:text-[#2167F3]",
                ].join(" ")}
              >
                {metric}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart container */}
      <div className="mt-4 h-[190px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            key={activeMetric}
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="patientVitalsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#2167F3" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#2167F3" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#DCE6F2"
              strokeDasharray="4 4"
              vertical={true}
              horizontal={true}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              dy={8}
              tick={{
                fill: "#6B8BC1",
                fontSize: 11,
                fontWeight: 400,
              }}
              interval="preserveStartEnd"
            />

            <YAxis
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
              axisLine={false}
              tickLine={false}
              width={35}
              tick={{
                fill: "#6B8BC1",
                fontSize: 12,
                fontWeight: 400,
              }}
            />

            {/* Enabled Tooltip with our Custom Tooltip component */}
            <Tooltip content={<CustomTooltip />} />

            <Area
              key={activeMetric}
              type="monotone"
              dataKey="value"
              stroke="#2028F5"
              strokeWidth={3}
              fill="url(#patientVitalsGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#2167F3",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              isAnimationActive={true}
              animationDuration={700}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
