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
    { time: "08:00", value: 180 },
    { time: "09:00", value: 290 },
    { time: "10:00", value: 240 },
    { time: "11:00", value: 420 },
    { time: "12:00", value: 380 },
    { time: "13:00", value: 620 },
    { time: "14:00", value: 410 },
    { time: "15:00", value: 250 },
    { time: "16:00", value: 490 },
    { time: "17:00", value: 340 },
    { time: "18:00", value: 510 },
    { time: "19:00", value: 440 },
  ],

  "Blood Pressure": [
    { time: "08:00", value: 100 },
    { time: "09:00", value: 280 },
    { time: "10:00", value: 300 },
    { time: "11:00", value: 220 },
    { time: "12:00", value: 450 },
    { time: "13:00", value: 400 },
    { time: "14:00", value: 730 },
    { time: "15:00", value: 510 },
    { time: "16:00", value: 200 },
    { time: "17:00", value: 530 },
    { time: "18:00", value: 220 },
    { time: "19:00", value: 590 },
    { time: "20:00", value: 560 },
  ],

  "Glucose Level": [
    { time: "08:00", value: 140 },
    { time: "09:00", value: 210 },
    { time: "10:00", value: 180 },
    { time: "11:00", value: 340 },
    { time: "12:00", value: 290 },
    { time: "13:00", value: 480 },
    { time: "14:00", value: 390 },
    { time: "15:00", value: 250 },
    { time: "16:00", value: 430 },
    { time: "17:00", value: 360 },
    { time: "18:00", value: 500 },
    { time: "19:00", value: 450 },
    { time: "20:00", value: 520 },
  ],

  "Oxygen Saturation": [
    { time: "08:00", value: 90 },
    { time: "09:00", value: 170 },
    { time: "10:00", value: 150 },
    { time: "11:00", value: 290 },
    { time: "12:00", value: 260 },
    { time: "13:00", value: 410 },
    { time: "14:00", value: 350 },
    { time: "15:00", value: 190 },
    { time: "16:00", value: 390 },
    { time: "17:00", value: 310 },
    { time: "18:00", value: 470 },
    { time: "19:00", value: 430 },
    { time: "20:00", value: 510 },
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

      {/* Chart */}
      <div className="mt-[7px] h-[168px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            key={activeMetric}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
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

            <XAxis dataKey="time" hide axisLine={false} tickLine={false} />

            <YAxis
              domain={[0, 800]}
              ticks={[0, 200, 400, 600, 800]}
              axisLine={false}
              tickLine={false}
              width={35}
              tick={{
                fill: "#6B8BC1",
                fontSize: 12,
                fontWeight: 400,
              }}
            />

            <Tooltip cursor={false} content={() => null} />

            <Area
              key={activeMetric}
              type="monotone"
              dataKey="value"
              stroke="#2028F5"
              strokeWidth={3}
              fill="url(#patientVitalsGradient)"
              fillOpacity={1}
              dot={false}
              activeDot={false}
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
