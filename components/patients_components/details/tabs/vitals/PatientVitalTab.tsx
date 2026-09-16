// components/patients_components/details/tabs/vitals/PatientVitalTab.tsx
"use client";

import { PatientVitalsSummaryCards } from "./PatientVitalsSummaryCards";
import { PatientHistoricalVitalsLog } from "./PatientHistoricalVitalsLog";

export function PatientVitalTab() {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* Summary Cards & Historical Vitals Log Table taking full width */}
      <PatientVitalsSummaryCards />
      <PatientHistoricalVitalsLog />
    </div>
  );
}
