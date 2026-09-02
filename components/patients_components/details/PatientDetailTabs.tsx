// components/patients_components/details/PatientDetailTabs.tsx
"use client";

import { useState } from "react";

const tabs = [
  "Overview",
  "Medical History",
  "Vitals",
  "Medications",
  "Encounter Notes",
  "Lab Results",
  "Radiology",
  "Order & Follow Ups",
  "Admission & Discharge",
  "Immunization",
] as const;

type Tab = (typeof tabs)[number];

interface PatientProfileTabsProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function PatientProfileTabs({
  activeTab,
  onTabChange,
}: PatientProfileTabsProps) {
  const [internalTab, setInternalTab] = useState<Tab>("Overview");

  const currentTab = activeTab ?? internalTab;

  const handleChange = (tab: Tab) => {
    if (!activeTab) setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Container with overflow control for smaller screens, using justify-between to stretch edge-to-edge on desktop */}
      <div className="w-full overflow-x-auto scrollbar-none py-2">
        <div className="flex items-center justify-start lg:justify-between gap-1.5 sm:gap-2 min-w-max lg:min-w-0 w-full">
          {tabs.map((tab) => {
            const isActive = currentTab === tab;

            return (
              <button
                key={tab}
                onClick={() => handleChange(tab)}
                className={[
                  "h-[38px] whitespace-nowrap rounded-full px-3.5 sm:px-4",
                  "text-xs font-semibold leading-none",
                  "border transition-all duration-200 ease-out cursor-pointer",
                  isActive
                    ? "border-[#2167F3] bg-[#2167F3] text-white shadow-sm shadow-blue-500/25"
                    : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
