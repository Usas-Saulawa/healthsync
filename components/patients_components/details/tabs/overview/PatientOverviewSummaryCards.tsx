// components/patients_components/details/tabs/overview/PatientOverviewSummaryCards.tsx
"use client";

import { Activity, Thermometer } from "lucide-react";

interface VitalSummary {
  label: string;
  value: string;
  unit: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: "temperature" | "heart-rate" | "oxygen" | "weight";
}

interface PatientOverviewSummaryCardsProps {
  vitals?: VitalSummary[];
}

const mockVitals: VitalSummary[] = [
  {
    label: "Weight",
    value: "72.5",
    unit: "kg",
    change: "-1.2%",
    changeType: "negative",
    icon: "weight",
  },
  {
    label: "Temperature",
    value: "36.6",
    unit: "°C",
    change: "0%",
    changeType: "neutral",
    icon: "temperature",
  },
  {
    label: "Heart Rate",
    value: "75",
    unit: "bpm",
    change: "+2.5%",
    changeType: "neutral",
    icon: "heart-rate",
  },
  {
    label: "Oxygen Saturation",
    value: "98",
    unit: "%",
    change: "+1.0%",
    changeType: "positive",
    icon: "oxygen",
  },
];

// Custom Weight Icon using the uploaded svg asset
function WeightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img
      src="/icon/weight.svg"
      alt="Weight icon"
      className={`${className} object-contain`}
    />
  );
}

// Custom Lungs Icon using the uploaded svg asset
function LungsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img
      src="/icon/lung.svg"
      alt="Lungs icon"
      className={`${className} object-contain`}
    />
  );
}

function VitalIcon({ type }: { type: VitalSummary["icon"] }) {
  if (type === "weight") {
    return <WeightIcon className="h-5 w-5 text-(--primary)" />;
  }

  if (type === "heart-rate") {
    return <Activity className="h-5 w-5 text-(--primary)" />;
  }

  if (type === "oxygen") {
    return <LungsIcon className="h-5 w-5 text-(--primary)" />;
  }

  return <Thermometer className="h-5 w-5 text-(--primary)" />;
}

export function PatientOverviewSummaryCards({
  vitals = mockVitals,
}: PatientOverviewSummaryCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {vitals.map((vital) => (
        <div
          key={vital.label}
          className="flex w-full flex-col gap-4 rounded-xl bg-(--card) p-5 shadow-xs transition-all hover:bg-(--card-hover)"
        >
          {/* Vital name and icon (No background wrapper) */}
          <div className="flex items-center gap-3">
            <VitalIcon type={vital.icon} />
            <span
              className="text-sm font-semibold max-w-28 truncate"
              title={vital.label}
            >
              {vital.label}
            </span>
          </div>

          {/* Value and change */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight ">
                {vital.value}
              </span>
              <span className="text-xs font-normal text-(--shade-text)">
                {vital.unit}
              </span>
            </div>

            <span
              className={[
                "inline-flex py-1 min-w-9 items-center justify-center rounded-full px-2",
                "text-xs font-semibold leading-none",
                vital.changeType === "negative"
                  ? "bg-(--danger-card) text-(--danger-text)"
                  : vital.changeType === "positive"
                    ? "bg-(--lab-timeline-bg) text-(--lab-timeline-text)"
                    : "bg-(--info-icon-bg) text-(--info-title)",
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
