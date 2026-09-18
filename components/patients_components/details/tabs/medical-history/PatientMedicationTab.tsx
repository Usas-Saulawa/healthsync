// src/components/patients_components/details/tabs/medications/PatientMedicationTab.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import { mockMedicalHistory } from "@/mock/mockDashboardData";

interface MedicalHistoryItem {
  id: number;
  date: string;
  condition: string;
  provider: string;
  facility: string;
  notes: string;
}

interface PatientMedicationTabProps {
  patientId?: string;
}

type SortField = "date" | "condition";
type SortDirection = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

export function PatientMedicalHistoryTab({
  patientId = "1",
}: PatientMedicationTabProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [sortLabel, setSortLabel] = useState("Sort by");

  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const totalRecords = mockMedicalHistory.length;
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  const handleFilterSelect = (value: string, _label: string) => {
    setFilterLabel(_label);
    // Add filtering logic here if needed based on value
  };

  const handleSortSelect = (value: string, _label: string) => {
    setSortLabel(_label);
    if (value === "newest") {
      setSortField("date");
      setSortDirection("desc");
    } else if (value === "oldest") {
      setSortField("date");
      setSortDirection("asc");
    } else if (value === "condition") {
      setSortField("condition");
      setSortDirection("asc");
    }
  };

  // Toggle column sort when header button is clicked
  const handleColumnSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort logic for records
  const sortedHistory = [...mockMedicalHistory].sort((a, b) => {
    if (!sortField) return 0;

    let valA: any = a[sortField];
    let valB: any = b[sortField];

    if (sortField === "date") {
      valA = new Date(a.date).getTime();
      valB = new Date(b.date).getTime();
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculation
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTableData = sortedHistory.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalRecords);

  // Handler to push route to the individual medical history detail view
  const handleRowClick = (item: MedicalHistoryItem) => {
    router.push(
      `/dashboard/patients/${patientId}/medical-history?recordId=${item.id}`,
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xs overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Top heading and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2563EB]">
            Medical History
          </h2>
          <p className="mt-1 text-sm text-(--shade)">
            All documented diagnoses, procedures, and hospitalizations
          </p>
        </div>

        <div className="shrink-0">
          <MasterFilterToolbar
            showSearch={false}
            showFilter={true}
            filterLabel={filterLabel}
            filterOptions={[
              { label: "All", value: "all" },
              { label: "Diagnoses", value: "diagnoses" },
              { label: "Procedures", value: "procedures" },
              { label: "Hospitalizations", value: "hospitalizations" },
            ]}
            onFilterSelect={handleFilterSelect}
            showSort={true}
            sortLabel={sortLabel}
            sortOptions={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Condition", value: "condition" },
            ]}
            onSortSelect={handleSortSelect}
            className="gap-3.5"
          />
        </div>
      </div>

      {/* Medical history table container with horizontal scroll support */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[950px] w-full">
          {/* Table header */}
          <div className="grid grid-cols-[140px_minmax(220px,1.45fr)_minmax(160px,1fr)_minmax(170px,1.05fr)_minmax(260px,1.55fr)] items-center bg-[#F8FAFC] px-4 py-3.5 rounded-[6px] text-xs font-bold uppercase tracking-wider text-slate-400">
            {/* Date Sort Header */}
            <button
              type="button"
              onClick={() => handleColumnSort("date")}
              className="flex items-center gap-1 text-left hover: transition-colors cursor-pointer focus:outline-none"
            >
              <span>Date</span>
              <ArrowUpDown
                className={`h-3.5 w-3.5 transition-colors ${
                  sortField === "date" ? "text-blue-600" : "text-slate-400"
                }`}
                strokeWidth={2}
              />
            </button>

            {/* Condition / Procedure Sort Header */}
            <button
              type="button"
              onClick={() => handleColumnSort("condition")}
              className="flex items-center gap-1 text-left hover: transition-colors cursor-pointer focus:outline-none"
            >
              <span>Condition / Procedure</span>
              <ArrowUpDown
                className={`h-3.5 w-3.5 transition-colors ${
                  sortField === "condition" ? "text-blue-600" : "text-slate-400"
                }`}
                strokeWidth={2}
              />
            </button>

            <div>Provider</div>
            <div>Facility</div>
            <div>Notes</div>
          </div>

          {/* Table rows */}
          <div className="mt-3 space-y-2">
            {currentTableData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRowClick(item)}
                className="grid grid-cols-[140px_minmax(220px,1.45fr)_minmax(160px,1fr)_minmax(170px,1.05fr)_minmax(260px,1.55fr)] items-center min-h-[64px] bg-app-bg hover:bg-[#EAF4FF] transition-colors px-4 rounded-[6px] border cursor-pointer group"
              >
                {/* Date */}
                <div className="text-sm font-semibold  group-hover:text-blue-600 transition-colors">
                  {item.date}
                </div>

                {/* Condition */}
                <div className="text-sm font-semibold ">{item.condition}</div>

                {/* Provider */}
                <div className="text-sm ">{item.provider}</div>

                {/* Facility */}
                <div className="text-sm text-(--shade)">{item.facility}</div>

                {/* Notes */}
                <div className="text-sm text-(--shade) truncate pr-2">
                  {item.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-xs sm:text-sm text-(--shade)">
          Showing {startIndex + 1}-{endIndex} of {totalRecords} history records
        </p>

        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="flex h-9 items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-semibold  transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {/* Dynamic Page Buttons (1, 2, 3) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                currentPage === page
                  ? "bg-[#2563EB] text-white"
                  : "border border-slate-200 bg-white  hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="flex h-9 items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-semibold  transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
