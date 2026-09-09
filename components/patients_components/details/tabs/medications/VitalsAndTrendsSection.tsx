// src/components/patients_components/details/tabs/medications/VitalsAndTrendsSection.tsx
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const trendData = [
  { month: "Oct '23", value: 7.2 },
  { month: "Nov '23", value: 6.8 },
  { month: "Jan '24", value: 6.7 },
  { month: "Apr '24", value: 6.7 },
];

const CustomizedLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y - 12}
      fill="#1e293b"
      fontSize={10}
      fontWeight={700}
      textAnchor="middle"
    >
      {value}%
    </text>
  );
};

export function VitalsAndTrendsSection() {
  return (
    <div className="space-y-6">
      {/* Component 1: Vitals Summary Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        {/* Section Title */}
        <h3 className="text-lg font-bold text-[#0f172a]">Vitals</h3>

        {/* Vitals Cards Container */}
        <div className="space-y-3">
          {/* Card A: Latest HbA1c */}
          <div className="w-full rounded-xl bg-blue-50/90  p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Latest HbA1c
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>↓ Improving</span>
              </div>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-extrabold text-emerald-600 tracking-tight">
                6.7%
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                Target: &lt; 7.0%
              </p>
            </div>
          </div>

          {/* Card B: Fasting Glucose */}
          <div className="w-full rounded-xl bg-blue-50/90 p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Fasting Glucose
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>↓ Improving</span>
              </div>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
                118 mg/dL
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                Normal: 70-99 mg/dL
              </p>
            </div>
          </div>

          {/* Card C: BMI */}
          <div className="w-full rounded-xl bg-blue-50/90  p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">BMI</span>
              <span className="text-xs font-bold text-amber-600">
                Overweight
              </span>
            </div>
            <div className="pt-1">
              <p className="text-2xl font-extrabold text-amber-600 tracking-tight">
                28.4
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                Target: &lt; 25.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Component 2: HbA1c Trend Tracker Card (Recharts-powered) */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        {/* Header & Status Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0f172a]">HbA1c Trend</h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span>On Target</span>
            <span className="text-emerald-600 font-bold">✓</span>
          </span>
        </div>

        {/* Graphical Trend Box */}
        <div className="w-full rounded-xl  p-4 space-y-2">
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 20, right: 15, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                  dy={6}
                />
                <YAxis
                  domain={[6.0, 7.5]}
                  ticks={[6.0, 6.5, 7.0, 7.5]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <ReferenceLine
                  y={7.0}
                  stroke="#fbbf24"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: "Target (<7.0%)",
                    fill: "#d97706",
                    fontSize: 10,
                    position: "top",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: "#059669",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6 }}
                  label={<CustomizedLabel />}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
