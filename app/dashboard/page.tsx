// app/dashboard/page.tsx
"use client";

import { Header } from "@/components/dashboard_components/Header";
import { PatientMetricsGroup } from "@/components/dashboard_components/PatientMetricsGroup";
import { ClinicalMetricsGroup } from "@/components/dashboard_components/ClinicalMetricsGroup";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col font-sans">
      {/* Persistent Top Navigation Bar (Includes Header & Welcome Greeting) */}
      <Header />

      {/* Main Page Content Area housing our metric card groups */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Group 1: Total Patients & Today's Appointments */}
        <PatientMetricsGroup />

        {/* Group 2: Critical Alerts & Top Treatments */}
        <ClinicalMetricsGroup />
      </main>
    </div>
  );
}
