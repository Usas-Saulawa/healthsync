// components/patients/PatientFiltersHeader.tsx
"use client";

import {
  SearchBar,
  FilterDropdown,
  FilterOption,
} from "@/components/ui/FilterTools";

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

const wardOptions: FilterOption[] = [
  { label: "All Wards", value: "all" },
  { label: "Ward 3A", value: "ward-3a" },
  { label: "Ward 3B", value: "ward-3b" },
  { label: "ICU", value: "icu" },
];

const statusOptions: FilterOption[] = [
  { label: "All Patients", value: "all" },
  { label: "Active Admitted", value: "admitted" },
  { label: "Discharged", value: "discharged" },
];

const doctorOptions: FilterOption[] = [
  { label: "Dr. Sarah Jenkins", value: "sarah-jenkins" },
  { label: "Dr. Bashir Musa", value: "bashir-musa" },
];

const dateOptions: FilterOption[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7-days" },
  { label: "Last 30 Days", value: "30-days" },
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
  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-[2.5rem] border border-blue-100/60 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Row: Title, Out/In-Patient Radios, and Top Action Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Title & Type Switcher */}
          <div className="flex flex-wrap items-center gap-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              All Patient
            </h2>

            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="radio"
                  name="patient-type"
                  checked={activeTab === "out-patient"}
                  onChange={() => onTabChange("out-patient")}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                Out-patient
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="radio"
                  name="patient-type"
                  checked={activeTab === "in-patient"}
                  onChange={() => onTabChange("in-patient")}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                In-patient
              </label>
            </div>
          </div>

          {/* Right: Search, Filter, Sort Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search"
              className="w-full sm:w-auto"
            />
            <FilterDropdown
              label="Filter"
              selectedOption=""
              options={statusOptions}
              onSelect={() => {}}
            />
            <FilterDropdown
              label="Sort by"
              selectedOption=""
              options={[
                { label: "Name", value: "name" },
                { label: "Date", value: "date" },
              ]}
              onSelect={() => {}}
            />
          </div>
        </div>

        {/* Secondary Filtering Toolbar Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
          <FilterDropdown
            label="Ward/Clinic"
            selectedOption={selectedWard}
            options={wardOptions}
            onSelect={onWardSelect}
          />

          <FilterDropdown
            label="Status"
            selectedOption={selectedStatus}
            options={statusOptions}
            onSelect={onStatusSelect}
          />

          <FilterDropdown
            label="Attending Doctor"
            selectedOption={selectedDoctor}
            options={doctorOptions}
            onSelect={onDoctorSelect}
          />

          <FilterDropdown
            label="Select date range"
            selectedOption={dateRange}
            options={dateOptions}
            onSelect={onDateRangeSelect}
          />
        </div>
      </div>
    </div>
  );
}
