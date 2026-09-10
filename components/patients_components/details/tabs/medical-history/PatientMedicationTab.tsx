// src/components/patients_components/details/tabs/medications/PatientMedicationTab.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";

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

const initialMedicalHistory: MedicalHistoryItem[] = [
  {
    id: 1,
    date: "Oct 12, 2023",
    condition: "Type 2 Diabetes Mellitus",
    provider: "Dr. Sarah Jenkins, MD",
    facility: "Metro Cardiology Group",
    notes: "First diagnosed, initiated Metformin 500mg BID.",
  },
  {
    id: 2,
    date: "Nov 03, 2024",
    condition: "Essential Hypertension",
    provider: "Dr. Michael Chen, MD",
    facility: "City General Hospital",
    notes: "Blood pressure elevated, started Lisinopril 10mg.",
  },
  {
    id: 3,
    date: "Jan 15, 2022",
    condition: "Asthma Exacerbation",
    provider: "Dr. Amanda Ross, MD",
    facility: "Pulmonary Care Clinic",
    notes: "Prescribed Albuterol rescue inhaler.",
  },
  {
    id: 4,
    date: "Jul 22, 2025",
    condition: "Acute Bronchitis",
    provider: "Dr. Sarah Jenkins, MD",
    facility: "Metro Cardiology Group",
    notes: "Given course of Azithromycin and cough suppressants.",
  },
  {
    id: 5,
    date: "Mar 05, 2023",
    condition: "Hyperlipidemia",
    provider: "Dr. Robert Fox, MD",
    facility: "Wellness Family Practice",
    notes: "Dietary modifications and statin therapy discussed.",
  },
];

type SortField = "date" | "condition";
type SortDirection = "asc" | "desc";

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

  const totalPatients = 24;
  const totalPages = 2;

  const handleFilterSelect = (value: string, label: string) => {
    setFilterLabel(label);
  };

  const handleSortSelect = (value: string, label: string) => {
    setSortLabel(label);
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
  const sortedHistory = [...initialMedicalHistory].sort((a, b) => {
    if (!sortField) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "date") {
      valA = new Date(a.date).getTime() as any;
      valB = new Date(b.date).getTime() as any;
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handler to push route to the individual medical history detail view
  const handleRowClick = (item: MedicalHistoryItem) => {
    router.push(
      `/dashboard/patients/${patientId}/medical-history?recordId=${item.id}`,
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-blue-100/60 shadow-xs overflow-hidden p-6 sm:p-8 space-y-6">
      {/* Top heading and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2563EB]">
            Medical History
          </h2>
          <p className="mt-1 text-sm text-slate-500">
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
          <div className="grid grid-cols-[140px_minmax(220px,1.45fr)_minmax(160px,1fr)_minmax(170px,1.05fr)_minmax(260px,1.55fr)] items-center bg-[#F8FAFC] px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400">
            {/* Date Sort Header */}
            <button
              type="button"
              onClick={() => handleColumnSort("date")}
              className="flex items-center gap-1 text-left hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
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
              className="flex items-center gap-1 text-left hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
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
          <div className="mt-3 space-y-2.5">
            {sortedHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRowClick(item)}
                className="grid grid-cols-[140px_minmax(220px,1.45fr)_minmax(160px,1fr)_minmax(170px,1.05fr)_minmax(260px,1.55fr)] items-center min-h-[64px] bg-[#EAF4FF]/70 hover:bg-[#EAF4FF] transition-colors px-4 rounded-xl border border-blue-100/40 cursor-pointer group"
              >
                {/* Date */}
                <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.date}
                </div>

                {/* Condition */}
                <div className="text-sm font-semibold text-slate-900">
                  {item.condition}
                </div>

                {/* Provider */}
                <div className="text-sm text-slate-800">{item.provider}</div>

                {/* Facility */}
                <div className="text-sm text-slate-500">{item.facility}</div>

                {/* Notes */}
                <div className="text-sm text-slate-500 truncate pr-2">
                  {item.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <p className="text-xs sm:text-sm text-slate-500">
          Showing 1-5 of {totalPatients} history records
        </p>

        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page 1 */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
              currentPage === 1
                ? "bg-[#2563EB] text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
              currentPage === 2
                ? "bg-[#2563EB] text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            2
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
