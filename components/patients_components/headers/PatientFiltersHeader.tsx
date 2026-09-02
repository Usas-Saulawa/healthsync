// components/patients_components/headers/PatientFiltersHeader.tsx
"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import { useState } from "react";

interface PatientFiltersHeaderProps {
  activeTab: "out-patient" | "in-patient";
  onTabChange: (tab: "out-patient" | "in-patient") => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedWard: string;
  onWardSelect: (value: string) => void;
  selectedStatus: string;
  onStatusSelect: (value: string) => void;
  selectedDoctor: string;
  onDoctorSelect: (value: string) => void;
  dateRange: string;
  onDateRangeSelect: (value: string) => void;
}

export function PatientFiltersHeader({
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  selectedWard,
  onWardSelect,
  selectedStatus,
  onStatusSelect,
  selectedDoctor,
  onDoctorSelect,
  dateRange,
  onDateRangeSelect,
}: PatientFiltersHeaderProps) {
  // Local states for the MasterFilterToolbar labels
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [sortLabel, setSortLabel] = useState("Sort by");

  return (
    <section className="w-full bg-[#eef4fb] px-7 pt-5 pb-0">
      {/* =========================================================
          TOP HEADER
          ========================================================= */}
      <div className="flex min-h-[34px] items-center justify-between">
        {/* ---------------------------------------------------------
            LEFT SIDE - Title + Patient Type (Bolder text & sharp radios)
            --------------------------------------------------------- */}
        <div className="flex items-center">
          {/* Page Title */}
          <h2 className="text-[16px] font-bold leading-[20px] tracking-[-0.2px] text-[#253246]">
            All Patient
          </h2>

          {/* Patient Type Selector */}
          <div className="ml-[44px] flex items-center gap-[34px]">
            {/* Out-patient */}
            <label className="flex cursor-pointer items-center gap-[7px] select-none">
              <input
                type="radio"
                name="patient-type"
                value="out-patient"
                checked={activeTab === "out-patient"}
                onChange={() => onTabChange("out-patient")}
                className="peer sr-only"
              />

              <span
                className={[
                  "relative flex h-[13px] w-[13px] items-center justify-center",
                  "rounded-full border-[2px] transition-all shadow-2xs",
                  activeTab === "out-patient"
                    ? "border-[#1769ff] bg-white ring-2 ring-[#1769ff]/10"
                    : "border-[#1769ff] bg-white",
                ].join(" ")}
              >
                {activeTab === "out-patient" && (
                  <span className="h-[6px] w-[6px] rounded-full bg-[#1769ff]" />
                )}
              </span>

              <span
                className={[
                  "text-[10px] leading-[14px] tracking-wide",
                  activeTab === "out-patient"
                    ? "font-bold text-[#1769ff]"
                    : "font-semibold text-[#1769ff]/80 hover:text-[#1769ff]",
                ].join(" ")}
              >
                Out-patient
              </span>
            </label>

            {/* In-patient */}
            <label className="flex cursor-pointer items-center gap-[7px] select-none">
              <input
                type="radio"
                name="patient-type"
                value="in-patient"
                checked={activeTab === "in-patient"}
                onChange={() => onTabChange("in-patient")}
                className="peer sr-only"
              />

              <span
                className={[
                  "relative flex h-[13px] w-[13px] items-center justify-center",
                  "rounded-full border-[2px] transition-all shadow-2xs",
                  activeTab === "in-patient"
                    ? "border-[#1769ff] bg-white ring-2 ring-[#1769ff]/10"
                    : "border-[#1769ff] bg-white",
                ].join(" ")}
              >
                {activeTab === "in-patient" && (
                  <span className="h-[6px] w-[6px] rounded-full bg-[#1769ff]" />
                )}
              </span>

              <span
                className={[
                  "text-[10px] leading-[14px] tracking-wide",
                  activeTab === "in-patient"
                    ? "font-bold text-[#1769ff]"
                    : "font-semibold text-[#1769ff]/80 hover:text-[#1769ff]",
                ].join(" ")}
              >
                In-patient
              </span>
            </label>
          </div>
        </div>

        {/* ---------------------------------------------------------
            RIGHT SIDE
            Imported MasterFilterToolbar with expansion animations
            --------------------------------------------------------- */}
        <MasterFilterToolbar
          showSearch={true}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search"
          showFilter={true}
          filterLabel={filterLabel}
          filterOptions={[
            { label: "All Status", value: "all" },
            { label: "Critical", value: "critical" },
            { label: "Stable", value: "stable" },
            { label: "Recovering", value: "recovering" },
          ]}
          onFilterSelect={(value, label) => {
            setFilterLabel(label);
            onStatusSelect(value);
          }}
          showSort={true}
          sortLabel={sortLabel}
          sortOptions={[
            { label: "Name (A-Z)", value: "name_asc" },
            { label: "Newest Admitted", value: "date_desc" },
            { label: "Room No.", value: "room" },
          ]}
          onSortSelect={(value, label) => {
            setSortLabel(label);
            // Hook up your sorting state/logic here using value
          }}
        />
      </div>

      {/* =========================================================
          FILTER ROW
          ========================================================= */}
      <div className="mt-[17px] flex h-[47px] w-full items-center rounded-[7px] bg-white px-[10px]">
        {/* Ward / Clinic */}
        <button
          type="button"
          onClick={() => onWardSelect(selectedWard)}
          className="flex h-[25px] items-center gap-[5px] rounded-[4px] bg-[#f0f6ff] px-[10px] text-[9px] leading-none cursor-pointer font-medium"
        >
          <span className="font-normal text-[#7d8795]">Ward/Clinic:</span>

          <span className="font-semibold text-[#26364a]">
            {selectedWard || "All Wards"}
          </span>

          <ChevronDown
            className="ml-[1px] h-[10px] w-[10px] text-[#718096]"
            strokeWidth={1.8}
          />
        </button>

        {/* Status */}
        <button
          type="button"
          onClick={() => onStatusSelect(selectedStatus)}
          className="ml-[9px] flex h-[25px] items-center gap-[5px] rounded-[4px] bg-[#f0f6ff] px-[10px] text-[9px] leading-none cursor-pointer font-medium"
        >
          <span className="font-normal text-[#7d8795]">Status:</span>

          <span className="font-semibold text-[#26364a]">
            {selectedStatus || "All Patients"}
          </span>

          <ChevronDown
            className="ml-[1px] h-[10px] w-[10px] text-[#718096]"
            strokeWidth={1.8}
          />
        </button>

        {/* Attending Doctor */}
        <button
          type="button"
          onClick={() => onDoctorSelect(selectedDoctor)}
          className="ml-[9px] flex h-[25px] items-center gap-[5px] rounded-[4px] bg-[#f0f6ff] px-[10px] text-[9px] leading-none cursor-pointer font-medium"
        >
          <span className="font-normal text-[#7d8795]">Attending Doctor:</span>

          <span className="font-semibold text-[#26364a]">
            {selectedDoctor || "Dr. Sarah Jenkins"}
          </span>

          <ChevronDown
            className="ml-[1px] h-[10px] w-[10px] text-[#718096]"
            strokeWidth={1.8}
          />
        </button>

        {/* Date Range */}
        <button
          type="button"
          onClick={() => onDateRangeSelect(dateRange)}
          className="ml-[9px] flex h-[25px] items-center gap-[6px] rounded-[4px] bg-[#f0f6ff] px-[10px] text-[9px] leading-none cursor-pointer font-medium"
        >
          <Calendar
            className="h-[11px] w-[11px] text-[#596b80]"
            strokeWidth={1.8}
          />

          <span
            className={
              dateRange
                ? "font-semibold text-[#26364a]"
                : "font-normal text-[#64748b]"
            }
          >
            {dateRange || "Select date range"}
          </span>
        </button>
      </div>
    </section>
  );
}
