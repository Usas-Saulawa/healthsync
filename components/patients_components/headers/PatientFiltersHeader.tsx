// components/patients_components/headers/PatientFiltersHeader.tsx
"use client";

import { Calendar, ChevronDown, Check } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import { useState, useRef, useEffect } from "react";

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

const wardOptions = [
  "All Wards",
  "Emergency",
  "ICU",
  "Pediatrics",
  "Surgery Ward",
  "General Ward",
];
const statusOptions = [
  "All Patients",
  "Critical",
  "Stable",
  "Recovering",
  "Discharged",
];
const doctorOptions = [
  "All Doctors",
  "Dr. Sarah Jenkins",
  "Dr. Ibrahim Muazu",
  "Dr. Aminu Bello",
  "Dr. Chioma Adebayo",
];
const dateOptions = [
  "All Time",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Custom Range",
];

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
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [sortLabel, setSortLabel] = useState("Sort by");

  const [openDropdown, setOpenDropdown] = useState<
    "ward" | "status" | "doctor" | "date" | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-(--background) px-6 sm:px-8 pt-6 pb-2"
    >
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* LEFT SIDE - Title + Patient Type */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            All Patient
          </h2>

          {/* Patient Type Radio Switcher */}
          <div className="flex items-center gap-6">
            {/* Out-patient */}
            <label className="flex cursor-pointer items-center gap-2.5 select-none">
              <input
                type="radio"
                name="patient-type"
                value="out-patient"
                checked={activeTab === "out-patient"}
                onChange={() => onTabChange("out-patient")}
                className="peer sr-only"
              />
              <span
                className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all ${
                  activeTab === "out-patient"
                    ? "border-blue-600 bg-(--card)"
                    : "border-slate-300 bg-(--card)"
                }`}
              >
                {activeTab === "out-patient" && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </span>
              <span
                className={`text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === "out-patient"
                    ? "text-blue-600"
                    : "text-blue-500 "
                }`}
              >
                Out-patient
              </span>
            </label>

            {/* In-patient */}
            <label className="flex cursor-pointer items-center gap-2.5 select-none">
              <input
                type="radio"
                name="patient-type"
                value="in-patient"
                checked={activeTab === "in-patient"}
                onChange={() => onTabChange("in-patient")}
                className="peer sr-only"
              />
              <span
                className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all ${
                  activeTab === "in-patient"
                    ? "border-blue-600 bg-(--card)"
                    : "border-slate-300 bg-(--card)"
                }`}
              >
                {activeTab === "in-patient" && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </span>
              <span
                className={`text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === "in-patient"
                    ? "text-blue-600"
                    : "text-blue-500 hover:text-blue-600"
                }`}
              >
                In-patient
              </span>
            </label>
          </div>
        </div>

        {/* RIGHT SIDE - MasterFilterToolbar (Untouched as requested) */}
        <MasterFilterToolbar
          variant="white"
          showSearch={true}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search "
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
          }}
        />
      </div>

      {/* FILTER ROW */}
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[8px] bg-(--card) px-4 py-3 shadow-xs">
        {/* Ward / Clinic Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "ward" ? null : "ward")
            }
            className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 px-3.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <span className="text-slate-500 font-normal">Ward/Clinic:</span>
            <span className="font-semibold text-slate-900">
              {selectedWard || "All Wards"}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 text-slate-500"
              strokeWidth={2}
            />
          </button>

          {openDropdown === "ward" && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-(--card) p-1.5 shadow-xl z-50 border border-slate-100">
              {wardOptions.map((ward) => (
                <button
                  key={ward}
                  type="button"
                  onClick={() => {
                    onWardSelect(ward === "All Wards" ? "" : ward);
                    setOpenDropdown(null);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <span>{ward}</span>
                  {(selectedWard === ward ||
                    (!selectedWard && ward === "All Wards")) && (
                    <Check className="h-3.5 w-3.5 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
            className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 px-3.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <span className="text-slate-500 font-normal">Status:</span>
            <span className="font-semibold text-slate-900">
              {selectedStatus || "All Patients"}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 text-slate-500"
              strokeWidth={2}
            />
          </button>

          {openDropdown === "status" && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-(--card) p-1.5 shadow-xl z-50 border border-slate-100">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusSelect(status === "All Patients" ? "" : status);
                    setOpenDropdown(null);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <span>{status}</span>
                  {(selectedStatus === status ||
                    (!selectedStatus && status === "All Patients")) && (
                    <Check className="h-3.5 w-3.5 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attending Doctor Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "doctor" ? null : "doctor")
            }
            className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 px-3.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <span className="text-slate-500 font-normal">
              Attending Doctor:
            </span>
            <span className="font-semibold text-slate-900">
              {selectedDoctor || "All Doctors"}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 text-slate-500"
              strokeWidth={2}
            />
          </button>

          {openDropdown === "doctor" && (
            <div className="absolute left-0 mt-2 w-52 rounded-xl bg-(--card) p-1.5 shadow-xl z-50 border border-slate-100">
              {doctorOptions.map((doc) => (
                <button
                  key={doc}
                  type="button"
                  onClick={() => {
                    onDoctorSelect(doc === "All Doctors" ? "" : doc);
                    setOpenDropdown(null);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <span>{doc}</span>
                  {(selectedDoctor === doc ||
                    (!selectedDoctor && doc === "All Doctors")) && (
                    <Check className="h-3.5 w-3.5 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "date" ? null : "date")
            }
            className="flex h-10 items-center gap-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 px-3.5 text-xs font-medium transition-colors cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-slate-500" strokeWidth={2} />
            <span
              className={
                dateRange
                  ? "font-semibold text-slate-900"
                  : "font-normal text-slate-500"
              }
            >
              {dateRange || "Select date range"}
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 text-slate-500"
              strokeWidth={2}
            />
          </button>

          {openDropdown === "date" && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-(--card) p-1.5 shadow-xl z-50 border border-slate-100">
              {dateOptions.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    onDateRangeSelect(date === "All Time" ? "" : date);
                    setOpenDropdown(null);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <span>{date}</span>
                  {(dateRange === date ||
                    (!dateRange && date === "All Time")) && (
                    <Check className="h-3.5 w-3.5 text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
