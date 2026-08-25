// app/dashboard/page.tsx
"use client";

import { Header } from "@/components/dashboard_components/Header";
import { DashboardMetricsGrid } from "@/components/dashboard_components/DashboardMetricsGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        <DashboardMetricsGrid />
      </main>
    </div>
  );
}
