// components/patients_components/details/tabs/medications/PatientMedicationsList.tsx
"use client";

import { ArrowUpDown } from "lucide-react";

export interface MedicationRow {
  id: string;
  diagnosis: string;
  medicationsList: string;
  facility: string;
  doctor: string;
  prescriptionsCount: number;
  date: string;
  status: "Active" | "Completed" | "Discontinued";
}

interface PatientMedicationsListProps {
  data: MedicationRow[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PatientMedicationsList({
  data,
  currentPage,
  onPageChange,
}: PatientMedicationsListProps) {
  return (
    <div className="bg-white rounded-[16px] shadow-xs overflow-hidden p-2">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-[7px]">
          {/* Table Header */}
          <thead>
            <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-gray-50">
              <th className="py-3 px-6">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                  Diagnosis
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-6">Facility</th>
              <th className="py-3 px-6">Prescriptions</th>
              <th className="py-3 px-6">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                  Date
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>

          {/* Table Body with 7px gap & 8px border-radius per row */}
          <tbody className="text-xs text-slate-700">
            {data.map((row) => {
              // Exact screenshot style pill badge variants
              let statusBadgeStyles = "";
              if (row.status === "Active") {
                statusBadgeStyles =
                  "bg-blue-50 text-blue-600 border border-blue-200/60 font-semibold px-3 py-1 rounded-full";
              } else if (row.status === "Completed") {
                statusBadgeStyles =
                  "bg-slate-100 text-blue-600 border border-slate-200/60 font-semibold px-3 py-1 rounded-full";
              } else if (row.status === "Discontinued") {
                statusBadgeStyles =
                  "bg-red-50 text-red-500 border border-red-200/60 font-semibold px-3 py-1 rounded-full";
              }

              return (
                <tr
                  key={row.id}
                  className="bg-app-bg hover:bg-blue-50/40 transition-colors cursor-pointer shadow-2xs"
                >
                  {/* Diagnosis & Sub-medications */}
                  <td className="py-4 px-6 rounded-l-[8px] ">
                    <div className="font-bold text-slate-900">
                      {row.diagnosis}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                      {row.medicationsList}
                    </div>
                  </td>

                  {/* Facility & Doctor */}
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">
                      {row.facility}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal italic mt-0.5">
                      {row.doctor}
                    </div>
                  </td>

                  {/* Prescriptions Count */}
                  <td className="py-4 px-6 font-semibold text-slate-700">
                    {row.prescriptionsCount}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">
                    {row.date}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 rounded-r-[8px] whitespace-nowrap">
                    <span
                      className={`${statusBadgeStyles} text-[11px] inline-block`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 mt-2 bg-white gap-4">
        <p className="text-xs text-slate-500">Showing 1-5 of 24 history</p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-3.5 py-1.5 rounded-[6px] border-0 bg-app-bg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => onPageChange(1)}
            className={`w-8 h-8 rounded-[6px] border-0 text-xs font-bold transition-colors cursor-pointer shadow-2xs ${
              currentPage === 1
                ? "bg-[#2563EB] text-white"
                : "bg-app-bg text-slate-600 hover:bg-slate-200"
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => onPageChange(2)}
            className={`w-8 h-8 rounded-[6px] border-0 text-xs font-bold transition-colors cursor-pointer shadow-2xs ${
              currentPage === 2
                ? "bg-[#2563EB] text-white"
                : "bg-app-bg text-slate-600 hover:bg-slate-200"
            }`}
          >
            2
          </button>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(2, currentPage + 1))}
            className="px-3.5 py-1.5 rounded-[6px] border-0 bg-app-bg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
