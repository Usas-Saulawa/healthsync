// components/patients_components/details/tabs/vitals/PatientVitalsChartsSidebar.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Data for the Donut/Ring segments matching the 4 quadrants (Cyan, Pink, Yellow, Blue)
const donutData = [
  { name: "Segment 1", value: 25, color: "#06b6d4" }, // Cyan
  { name: "Segment 2", value: 25, color: "#f43f5e" }, // Pink
  { name: "Segment 3", value: 25, color: "#fbbf24" }, // Yellow
  { name: "Segment 4", value: 25, color: "#3b82f6" }, // Blue
];

// Inner secondary ring data for layered depth effect
const innerRingData = [
  { name: "Inner 1", value: 33, color: "#22d3ee" },
  { name: "Inner 2", value: 33, color: "#fb7185" },
  { name: "Inner 3", value: 34, color: "#60a5fa" },
];

// Data for the smooth curve area chart
const trendData = [
  { month: "", value: 0 },
  { month: "Jul", value: 210 },
  { month: "Aug", value: 360 },
  { month: "Sep", value: 650 },
  { month: "Oct", value: 120 },
  { month: "Nov", value: 430 },
  { month: "Dec", value: 150 },
  { month: "Jan", value: 500 },
];

export function PatientVitalsChartsSidebar() {
  return (
    <div className="bg-white rounded-[16px] border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between h-full gap-6">
      {/* Top Section: Segmented Donut Chart */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 border-b border-slate-100">
        <div className="w-full h-[220px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Outer Ring */}
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`outer-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              {/* Inner Concentric Ring for layered depth */}
              <Pie
                data={innerRingData}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={52}
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {innerRingData.map((entry, index) => (
                  <Cell
                    key={`inner-cell-${index}`}
                    fill={entry.color}
                    opacity={0.6}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Smooth Area / Line Chart */}
      <div className="flex flex-col space-y-3">
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 800]}
                ticks={[0, 200, 400, 600, 800]}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
