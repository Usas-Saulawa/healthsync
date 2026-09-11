// components/patients_components/table/PatientTable.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { PatientListItem } from "@/lib/validations/dashboard";

interface PatientTableProps {
  patients: PatientListItem[];
  currentPage?: number;
  totalPages?: number;
  totalPatients?: number;
  onPageChange?: (page: number) => void;
  isOutPatient?: boolean; // Controls whether the status column/row is shown (false for in-patient, true for out-patient)
}

type SortField =
  | "name"
  | "hospNo"
  | "ageSex"
  | "wardBed"
  | "diagnosis"
  | "status"
  | "insurance";
type SortOrder = "asc" | "desc";

export function PatientTable({
  patients,
  currentPage = 1,
  totalPages = 2,
  totalPatients = 24,
  onPageChange,
  isOutPatient = false,
}: PatientTableProps) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const router = useRouter();

  // Sorting Handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Functional Sort logic
  const sortedPatients = useMemo(() => {
    if (!sortField) return patients;

    return [...patients].sort((a, b) => {
      let aVal = a[sortField as keyof PatientListItem] ?? "";
      let bVal = b[sortField as keyof PatientListItem] ?? "";

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [patients, sortField, sortOrder]);

  // Pagination slice: Show 7 records per page
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * 7;
    return sortedPatients.slice(startIndex, startIndex + 7);
  }, [sortedPatients, currentPage]);

  // Select or clear all patients currently shown on this page.
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedPatients.map((patient) => patient.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Toggle selection for one patient.
  const handleToggleSelect = (id: string | number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const isAllSelected =
    paginatedPatients.length > 0 &&
    selectedIds.length === paginatedPatients.length;

  // Dynamic grid setup: 7 columns if out-patient (no status column), 8 columns if in-patient (includes status)
  const gridColumnsClass = isOutPatient
    ? "grid-cols-[44px_1.6fr_1.3fr_1fr_1.3fr_1.8fr_1.1fr]"
    : "grid-cols-[44px_1.42fr_1.15fr_0.9fr_1.15fr_1.55fr_1fr_0.95fr]";

  return (
    <div className="w-full px-7 bg-app-bg pb-6">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] w-full overflow-hidden rounded-[14px] bg-white shadow-2xs">
          {/* Table heading - Perfectly aligned with px-7 (28px) matching the header */}
          <div
            className={`grid h-[91px] ${gridColumnsClass} items-center px-[28px] text-[13px] font-medium text-[#64748B]`}
          >
            {/* Select all */}
            <div className="flex items-center">
              <input
                type="checkbox"
                aria-label="Select all patients"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="h-[13px] w-[13px] cursor-pointer appearance-none rounded-[2px] border-[1.5px] border-[#71859A] bg-white checked:border-[#1769FF] checked:bg-[#1769FF]"
              />
            </div>

            {/* Patient Name */}
            <div
              onClick={() => handleSort("name")}
              className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
            >
              <span>Patient Name</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Hospital Number */}
            <div
              onClick={() => handleSort("hospNo")}
              className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
            >
              <span>Hospital No.</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Age / Sex */}
            <div
              onClick={() => handleSort("ageSex")}
              className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
            >
              <span>Age/Sex</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Ward / Bed */}
            <div
              onClick={() => handleSort("wardBed")}
              className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
            >
              <span>Ward/bed</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Primary Diagnosis */}
            <div
              onClick={() => handleSort("diagnosis")}
              className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
            >
              <span>Primary Diagnosis</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Status Header (Only visible for in-patients) */}
            {!isOutPatient && (
              <div
                onClick={() => handleSort("status")}
                className="flex items-center gap-[7px] whitespace-nowrap cursor-pointer select-none"
              >
                <span>Status</span>
                <ArrowUpDown
                  className="h-[13px] w-[13px] text-[#607286]"
                  strokeWidth={1.5}
                />
              </div>
            )}

            {/* Insurance */}
            <div
              onClick={() => handleSort("insurance")}
              className="flex items-center justify-end gap-[7px] whitespace-nowrap pr-2 cursor-pointer select-none"
            >
              <span>Insurance</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Patient rows container */}
          <div className="space-y-[7px] px-[20px] pb-4">
            {paginatedPatients.map((patient) => {
              const isSelected = selectedIds.includes(patient.id);

              return (
                <div
                  key={patient.id}
                  onClick={() =>
                    router.push(`/dashboard/patients/${patient.id}`)
                  }
                  className={[
                    "grid h-[50px] cursor-pointer",
                    gridColumnsClass,
                    "items-center",
                    "px-[8px]",
                    "rounded-[6px]",
                    "transition-colors",
                    isSelected
                      ? "bg-[#E4F0FF]"
                      : "bg-[#EDF6FF] hover:bg-[#E8F3FF]",
                  ].join(" ")}
                >
                  {/* Row checkbox - Stops propagation so clicking checkbox doesn't trigger row navigation */}
                  <div
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      aria-label={`Select patient ${patient.name}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(patient.id)}
                      className="h-[13px] w-[13px] cursor-pointer appearance-none rounded-[2px] border-[1.5px] border-[#71859A] bg-transparent checked:border-[#1769FF] checked:bg-[#1769FF]"
                    />
                  </div>

                  {/* Patient name and avatar */}
                  <div className="flex min-w-0 items-center gap-[9px]">
                    <div className="flex h-[31px] w-[31px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF2A8]">
                      <img
                        src="/images/profile.jpeg"
                        alt={patient.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <span className="truncate text-[11px] font-semibold leading-[15px] text-[#172033]">
                      {patient.name}
                    </span>
                  </div>

                  {/* Hospital number */}
                  <div className="truncate text-[11px] font-normal leading-[15px] text-[#718096]">
                    {patient.hospNo}
                  </div>

                  {/* Age / sex */}
                  <div className="truncate text-[11px] font-normal leading-[15px] text-[#718096]">
                    {patient.ageSex}
                  </div>

                  {/* Ward / bed */}
                  <div className="truncate text-[11px] font-normal leading-[15px] text-[#718096]">
                    {patient.wardBed}
                  </div>

                  {/* Primary diagnosis */}
                  <div className="truncate text-[11px] font-medium leading-[15px] text-[#172033]">
                    {patient.diagnosis}
                  </div>

                  {/* Status (Only rendered for in-patients, showing standard status / Active Admitted) */}
                  {!isOutPatient && (
                    <div className="flex items-center">
                      <span className="inline-flex h-[23px] items-center rounded-full bg-[#FFF0A6] px-[11px] text-[10px] font-medium leading-none text-[#D99A00]">
                        {patient.status || "Active Admitted"}
                      </span>
                    </div>
                  )}

                  {/* Insurance */}
                  <div className="truncate text-right text-[11px] font-normal leading-[15px] text-[#718096] pr-2">
                    {patient.insurance}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination configured for 7 items per page */}
          <div className="flex h-[74px] items-center justify-between border-t border-slate-100 px-[28px] bg-white">
            <p className="text-[12px] font-normal leading-[16px] text-[#64748B]">
              Showing {Math.min((currentPage - 1) * 7 + 1, totalPatients)}-
              {Math.min(currentPage * 7, totalPatients)} of {totalPatients}{" "}
              patients
            </p>

            <div className="flex items-center gap-[6px]">
              {/* Previous */}
              <button
                type="button"
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex h-[35px] items-center justify-center rounded-[6px] border border-[#E1E6ED] bg-white px-[12px] text-[12px] font-medium text-[#1E293B] transition-colors hover:bg-[#F7F9FC] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => {
                  const isCurrentPage = currentPage === pageNumber;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => onPageChange?.(pageNumber)}
                      aria-current={isCurrentPage ? "page" : undefined}
                      className={[
                        "flex h-[35px] w-[35px] items-center justify-center rounded-[6px]",
                        "text-[12px] font-medium",
                        "transition-colors cursor-pointer",
                        isCurrentPage
                          ? "bg-[#2167F3] text-white"
                          : "border border-[#E1E6ED] bg-white text-[#1E293B] hover:bg-[#F7F9FC]",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </button>
                  );
                },
              )}

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  onPageChange?.(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-[35px] items-center justify-center rounded-[6px] border border-[#E1E6ED] bg-white px-[15px] text-[12px] font-medium text-[#1E293B] transition-colors hover:bg-[#F7F9FC] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
