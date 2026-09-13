// components/patients_components/details/tabs/vitals/PatientVitalTab.tsx
"use client";

import { PatientVitalsSummaryCards } from "./PatientVitalsSummaryCards";
import { PatientHistoricalVitalsLog } from "./PatientHistoricalVitalsLog";
import { PatientVitalsChartsSidebar } from "./PatientVitalsChartsSidebar";

export function PatientVitalTab() {
  return (
    // Changed items-start to items-stretch so both columns match heights perfectly
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Left Column: Summary Cards + Historical Vitals Log Table */}
      <div className="lg:col-span-8 w-full flex flex-col gap-5">
        <PatientVitalsSummaryCards />
        <PatientHistoricalVitalsLog />
      </div>

      {/* Right Column: Vitals Charts & Analytics Sidebar (Stretches to match left column height) */}
      <div className="lg:col-span-4 w-full flex flex-col">
        <div className="h-full flex flex-col">
          <PatientVitalsChartsSidebar />
        </div>
      </div>
    </div>
  );
}
