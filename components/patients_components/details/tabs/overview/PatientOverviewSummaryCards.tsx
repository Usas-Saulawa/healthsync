// components/patients_components/details/tabs/overview/PatientOverviewSummaryCards.tsx
"use client";

import { Activity, Droplets, Thermometer } from "lucide-react";

interface VitalSummary {
  label: string;
  value: string;
  unit: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: "temperature" | "heart-rate" | "oxygen";
}

interface PatientOverviewSummaryCardsProps {
  vitals?: VitalSummary[];
}

const mockVitals: VitalSummary[] = [
  {
    label: "Weight",
    value: "165",
    unit: "lbs",
    change: "5%",
    changeType: "negative",
    icon: "temperature",
  },
  {
    label: "Temperature",
    value: "35",
    unit: "lbs",
    change: "5%",
    changeType: "negative",
    icon: "temperature",
  },
  {
    label: "Heart rate",
    value: "99.4",
    unit: "F",
    change: "+2.5%",
    changeType: "negative",
    icon: "heart-rate",
  },
  {
    label: "Oxygen Saturation",
    value: "140",
    unit: "bpm",
    change: "5%",
    changeType: "neutral",
    icon: "oxygen",
  },
];

function VitalIcon({ type }: { type: VitalSummary["icon"] }) {
  if (type === "heart-rate") {
    return <Activity className="h-5 w-5 text-[#2167F3]" strokeWidth={1.8} />;
  }

  if (type === "oxygen") {
    return <Droplets className="h-5 w-5 text-[#2167F3]" strokeWidth={1.8} />;
  }

  return <Thermometer className="h-5 w-5 text-[#2167F3]" strokeWidth={1.8} />;
}

export function PatientOverviewSummaryCards({
  vitals = mockVitals,
}: PatientOverviewSummaryCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {vitals.map((vital) => (
        <div
          key={vital.label}
          className="flex h-[108px] w-full flex-col justify-between rounded-xl bg-white px-5 py-4 border border-blue-100/60 shadow-xs transition-all hover:border-slate-300"
        >
          {/* Vital name and icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <VitalIcon type={vital.icon} />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {vital.label}
            </span>
          </div>

          {/* Value and change */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                {vital.value}
              </span>
              <span className="text-xs font-normal text-slate-500">
                {vital.unit}
              </span>
            </div>

            <span
              className={[
                "inline-flex h-5 min-w-[36px] items-center justify-center rounded-md px-1.5",
                "text-[10px] font-semibold leading-none",
                vital.changeType === "negative"
                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                  : "bg-blue-50 text-blue-600 border border-blue-200",
              ].join(" ")}
            >
              {vital.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
