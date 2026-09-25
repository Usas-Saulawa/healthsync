// src/components/patients_components/details/tabs/medical-history/VitalsAndTrendsSection.tsx
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
    <div className="w-full bg-(--card) rounded-xl p-5 space-y-3">
      {/* Header & Status Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">HbA1c Trend</h3>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-(--lab-timeline-bg) text-(--lab-timeline-text)">
          <span>On Target</span>
          <span className="font-bold">✓</span>
        </span>
      </div>

      {/* Graphical Trend Box */}
      <div className="w-full space-y-2">
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
  );
}
