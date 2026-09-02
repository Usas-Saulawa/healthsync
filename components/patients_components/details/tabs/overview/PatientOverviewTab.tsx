// components/patients_components/details/tabs/overview/PatientOverviewTab.tsx
"use client";

import { PatientAllergiesCard } from "./PatientAllergiesCard";

export function PatientOverviewTab() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* 1. Allergies & Medications Card */}
      <PatientAllergiesCard />

      {/* 2. We will place subsequent overview cards here next (e.g. Vitals summary, Quick Notes, etc.) */}
    </div>
  );
}
