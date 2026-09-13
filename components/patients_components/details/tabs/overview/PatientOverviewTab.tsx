// components/patients_components/details/tabs/overview/PatientOverviewTab.tsx
"use client";

import { PatientAllergiesCard } from "./PatientAllergiesCard";
import { PatientOverviewSummaryCards } from "./PatientOverviewSummaryCards";
import { PatientOverViewMetricsChart } from "./PatientOverviewMetricsChart";
import { PatientOverviewClinicalTimeline } from "./PatientOverviewClinicalTimeline";

export function PatientOverviewTab() {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* Top Section: Two-column layout for Allergies vs (Vitals + Metrics Chart) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Allergies & Medications Card */}
        <div className="lg:col-span-4 w-full">
          <PatientAllergiesCard />
        </div>

        {/* Right Column: Vitals Summary Cards + Health Metrics Timeline Chart */}
        <div className="lg:col-span-8 w-full flex flex-col gap-5">
          <PatientOverviewSummaryCards />
          <PatientOverViewMetricsChart />
        </div>
      </div>

      {/* Bottom Section: Full-width Clinical Timeline spanning edge-to-edge */}
      <div className="w-full">
        <PatientOverviewClinicalTimeline />
      </div>
    </div>
  );
}
