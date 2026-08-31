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

  // Handle master select all toggle
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(patients.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual row checkbox toggle
  const handleToggleSelect = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    patients.length > 0 && selectedIds.length === patients.length;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
      <div className="w-full bg-white rounded-[2.5rem] border border-blue-100/60 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Table Grid Container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1050px] space-y-3">
            {/* Table Header Row */}
            <div className="grid grid-cols-[44px_1.4fr_1.1fr_0.8fr_1.1fr_1.4fr_1fr_0.9fr] items-center px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  aria-label="Select all patients"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Patient Name <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Hospital No. <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Age/Sex <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Ward/Bed <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Primary Diagnosis <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
                Status <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center justify-end gap-1.5 cursor-pointer hover:text-slate-700 pr-2">
                Insurance <ArrowUpDown className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Table Rows */}
            {patients.map((patient) => {
              const isSelected = selectedIds.includes(patient.id);
              return (
                <div
                  key={patient.id}
                  className={`grid grid-cols-[44px_1.4fr_1.1fr_0.8fr_1.1fr_1.4fr_1fr_0.9fr] items-center transition-all px-6 py-4 rounded-2xl gap-3 shadow-2xs border ${
                    isSelected
                      ? "bg-blue-50/80 border-blue-200"
                      : "bg-[#f8fbff]/70 hover:bg-blue-50/60 border-transparent hover:border-blue-100/80"
                  }`}
                >
                  {/* Row Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      aria-label={`Select patient ${patient.name}`}
                      checked={isSelected}
                      onChange={() => handleToggleSelect(patient.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>

                  {/* Patient Name with Avatar */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-amber-200/70 overflow-hidden shrink-0 flex items-center justify-center border border-amber-300/40 shadow-xs">
                      <svg
                        className="w-full h-full text-amber-900 mt-1"
                        viewBox="0 0 36 36"
                        fill="currentColor"
                      >
                        <path d="M18 16c3.313 0 6-2.687 6-6s-2.687-6-6-6-6 2.687-6 6 2.687 6 6 6zm0 3c-4.418 0-12 2.239-12 6.667V30h24v-4.333C30 21.239 22.418 19 18 19z" />
                      </svg>
                    </div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {patient.name}
                    </span>
                  </div>

                  {/* Hospital No */}
                  <div className="text-xs sm:text-sm text-slate-600 font-medium truncate">
                    {patient.hospNo}
                  </div>

                  {/* Age/Sex */}
                  <div className="text-xs sm:text-sm text-slate-600 font-medium truncate">
                    {patient.ageSex}
                  </div>

                  {/* Ward/Bed */}
                  <div className="text-xs sm:text-sm text-slate-600 font-medium truncate">
                    {patient.wardBed}
                  </div>

                  {/* Primary Diagnosis */}
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {patient.diagnosis}
                  </div>

                  {/* Status Badge */}
                  <div className="truncate">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#fff3cd] text-[#856404] border border-[#ffeeba] shadow-2xs whitespace-nowrap">
                      {patient.status}
                    </span>
                  </div>

                  {/* Insurance */}
                  <div className="text-xs sm:text-sm text-slate-600 font-medium text-right pr-2 truncate">
                    {patient.insurance}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-4">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing 1-{Math.min(5, totalPatients)} of {totalPatients} patients
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange?.(pageNum)}
                  className={`h-9 w-9 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-2xs ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() =>
                onPageChange?.(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
