// components/patients_components/PatientTable.tsx
"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { PatientListItem } from "@/lib/validations/dashboard";

interface PatientTableProps {
  patients: PatientListItem[];
  currentPage?: number;
  totalPages?: number;
  totalPatients?: number;
  onPageChange?: (page: number) => void;
}

export function PatientTable({
  patients,
  currentPage = 1,
  totalPages = 2,
  totalPatients = 24,
  onPageChange,
}: PatientTableProps) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  // Select or clear all patients currently shown on this page.
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(patients.map((patient) => patient.id));
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
    patients.length > 0 && selectedIds.length === patients.length;

  return (
    <div className="w-full px-7 bg-[#eef4fb] pb-6">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] w-full overflow-hidden rounded-[14px] bg-white shadow-2xs">
          {/* Table heading - Perfectly aligned with px-7 (28px) matching the header */}
          <div className="grid h-[91px] grid-cols-[44px_1.42fr_1.15fr_0.9fr_1.15fr_1.55fr_1fr_0.95fr] items-center px-[28px] text-[13px] font-medium text-[#64748B]">
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
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Patient Name</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Hospital Number */}
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Hospital No.</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Age / Sex */}
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Age/Sex</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Ward / Bed */}
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Ward/bed</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Primary Diagnosis */}
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Primary Diagnosis</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-[7px] whitespace-nowrap">
              <span>Status</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>

            {/* Insurance */}
            <div className="flex items-center justify-end gap-[7px] whitespace-nowrap pr-2">
              <span>Insurance</span>
              <ArrowUpDown
                className="h-[13px] w-[13px] text-[#607286]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Patient rows container */}
          <div className="space-y-[7px] px-[20px] pb-4">
            {patients.map((patient) => {
              const isSelected = selectedIds.includes(patient.id);

              return (
                <div
                  key={patient.id}
                  className={[
                    "grid h-[50px]",
                    "grid-cols-[44px_1.42fr_1.15fr_0.9fr_1.15fr_1.55fr_1fr_0.95fr]",
                    "items-center",
                    "px-[8px]",
                    "rounded-[6px]",
                    "transition-colors",
                    isSelected
                      ? "bg-[#E4F0FF]"
                      : "bg-[#EDF6FF] hover:bg-[#E8F3FF]",
                  ].join(" ")}
                >
                  {/* Row checkbox */}
                  <div className="flex items-center">
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
                      <svg
                        className="h-[24px] w-[24px] text-[#4B2200]"
                        viewBox="0 0 36 36"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M18 16c3.313 0 6-2.687 6-6s-2.687-6-6-6-6 2.687-6 6 2.687 6 6 6zm0 3c-4.418 0-12 2.239-12 6.667V30h24v-4.333C30 21.239 22.418 19 18 19z" />
                      </svg>
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

                  {/* Status */}
                  <div className="flex items-center">
                    <span className="inline-flex h-[23px] items-center rounded-full bg-[#FFF0A6] px-[11px] text-[10px] font-medium leading-none text-[#D99A00]">
                      {patient.status}
                    </span>
                  </div>

                  {/* Insurance */}
                  <div className="truncate text-right text-[11px] font-normal leading-[15px] text-[#718096] pr-2">
                    {patient.insurance}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex h-[74px] items-center justify-between border-t border-slate-100 px-[28px] bg-white">
            <p className="text-[12px] font-normal leading-[16px] text-[#64748B]">
              Showing 1-{Math.min(5, patients.length)} of {totalPatients}{" "}
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
                  onPageNumberHandler(Math.min(totalPages, currentPage + 1))
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
