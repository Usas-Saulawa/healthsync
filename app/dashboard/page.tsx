// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Header } from "@/components/dashboard_components/Header";
import { DashboardMetricsGrid } from "@/components/dashboard_components/DashboardMetricsGrid";
import { PatientsWidget } from "@/components/dashboard_components/PatientsWidget";
import { FollowUpsWidget } from "@/components/dashboard_components/FollowUpsWidget";
import {
  MasterFilterToolbar,
  FilterOption,
} from "@/components/tools/filterTools";
import { useHeader } from "@/hooks/dashboard_hooks/useHeader";
import { useTheme } from "@/hooks/addons/useTheme";

const filterOptions: FilterOption[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

export default function DashboardPage() {
  const { doctorName } = useHeader();
  const [searchValue, setSearchValue] = useState("");
  const [filterLabel, setFilterLabel] = useState("Monthly");
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex-1 py-2 flex flex-col gap-3">
      {/* Unified Greeting & Filter Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
        <h1 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-(--text) sm:text-2xl">
          Welcome Back {doctorName}
          <button onClick={() => toggleTheme()}>
            {theme === "light" ? (
              <Sun className="h-6 w-6 text-amber-500" fill="currentColor" />
            ) : (
              <Moon className="h-6 w-6 text-blue-200" />
            )}
          </button>
        </h1>

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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 items-start">
        <PatientsWidget className="xl:col-span-2 h-full" />
        <FollowUpsWidget className="xl:col-span-1 h-full" />
      </div>
    </main>
  );
}
