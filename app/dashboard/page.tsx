// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard_components/Header";
import { DashboardMetricsGrid } from "@/components/dashboard_components/DashboardMetricsGrid";
import { PatientsWidget } from "@/components/dashboard_components/PatientsWidget";
import { FollowUpsWidget } from "@/components/dashboard_components/FollowUpsWidget";
import {
  MasterFilterToolbar,
  FilterOption,
} from "@/components/tools/filterTools";

const filterOptions: FilterOption[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState("");
  const [filterLabel, setFilterLabel] = useState("Monthly");

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Toolbar section sitting naturally below the greeting with zero awkward overlap */}
        <div className="flex justify-end px-3 sm:px-4">
          <MasterFilterToolbar
            variant="white"
            showSearch={true}
            searchValue={searchValue}
            onSearchChange={(e) => setSearchValue(e.target.value)}
            searchPlaceholder="Search"
            showFilter={true}
            filterLabel={filterLabel}
            filterOptions={filterOptions}
            onFilterSelect={(_val, label) => setFilterLabel(label)}
            showSort={false}
          />
        </div>

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
