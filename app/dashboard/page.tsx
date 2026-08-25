// app/dashboard/page.tsx
"use client";

import { Header } from "@/components/dashboard_components/Header";
import { DashboardMetricsGrid } from "@/components/dashboard_components/DashboardMetricsGrid";
import { PatientsWidget } from "@/components/dashboard_components/PatientsWidget";
import { FollowUpsWidget } from "@/components/dashboard_components/FollowUpsWidget";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <DashboardMetricsGrid />

        {/* Main Grid for Patients Table and Follow-ups Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          <PatientsWidget className="xl:col-span-2" />
          <FollowUpsWidget className="xl:col-span-1" />
        </div>
      </main>
    </div>
  );
}
