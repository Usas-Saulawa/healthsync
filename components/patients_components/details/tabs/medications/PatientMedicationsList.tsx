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
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onRowClick?: (row: MedicationRow) => void;
}

export function PatientMedicationsList({
  data,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onRowClick,
}: PatientMedicationsListProps) {
  const startRange =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-(--card) rounded-[16px] shadow-xs overflow-hidden p-2">
      {/* Table Container */}
      <div className="overflow-x-auto min-h-[320px]">
        <table className="w-full text-left border-separate border-spacing-y-[7px]">
          {/* Table Header */}
          <thead>
            <tr className="text-[11px] font-bold text-(--shade) uppercase tracking-wider bg-gray-50">
              <th className="py-3 px-6">
                <div className="flex items-center gap-1.5 cursor-pointer hover:">
                  Diagnosis
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-6">Facility</th>
              <th className="py-3 px-6">Prescriptions</th>
              <th className="py-3 px-6">
                <div className="flex items-center gap-1.5 cursor-pointer hover:">
                  Date
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-xs ">
            {data.length > 0 ? (
              data.map((row) => {
                let statusBadgeStyles = "";
                if (row.status === "Active") {
                  statusBadgeStyles =
                    "bg-blue-100 text-blue-600 border border-blue-200/60 font-semibold px-3 py-1 rounded-full";
                } else if (row.status === "Completed") {
                  statusBadgeStyles =
                    "bg-slate-100 text-blue-600 border border-slate-200/60 font-semibold px-3 py-1 rounded-full";
                } else if (row.status === "Discontinued") {
                  statusBadgeStyles =
                    "bg-red-100 text-red-500 border border-red-200/60 font-semibold px-3 py-1 rounded-full";
                }

                return (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className="bg-app-bg transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 rounded-l-[8px]">
                      <div className="font-bold ">{row.diagnosis}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                        {row.medicationsList}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-semibold ">{row.facility}</div>
                      <div className="text-[11px] text-slate-400 font-normal italic mt-0.5">
                        {row.doctor}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-semibold ">
                      {row.prescriptionsCount}
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-medium whitespace-nowrap">
                      {row.date}
                    </td>

                    <td className="py-4 px-6 rounded-r-[8px] whitespace-nowrap">
                      <span
                        className={`${statusBadgeStyles} text-[11px] inline-block`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-slate-400 text-xs"
                >
                  No medication history matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 mt-2 bg-white gap-4">
        <p className="text-xs text-(--shade)">
          Showing {startRange}-{endRange} of {totalItems} history
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-3.5 py-1.5 rounded-[6px] border-0 bg-app-bg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-[6px] border-0 text-xs font-bold transition-colors cursor-pointer shadow-2xs ${
                currentPage === page
                  ? "bg-[#2563EB] text-white"
                  : "bg-app-bg text-slate-600 hover:bg-slate-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3.5 py-1.5 rounded-[6px] border-0 bg-app-bg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
