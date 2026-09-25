// src/components/patients_components/details/tabs/medications/PatientMedicationTab.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import { mockMedicalHistory } from "@/mock/mockDashboardData";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

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
  const { medicationColumns } = useColumns();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
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

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="w-full bg-(--card) rounded-2xl shadow-xs overflow-hidden p-5 space-y-6">
      {/* Top heading and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Medical History</h2>
          <p className="mt-1 text-sm text-(--shade-text)">
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
      <DataTable
        data={currentTableData}
        columns={medicationColumns}
        currentPage={currentPage}
        rowsPerPage={10}
        pagination
        loading={loading}
        onPageChange={onPageChange}
        totalPages={Math.ceil(currentTableData.length / 10)}
        selectable={false}
        rowKey="id"
        onRowClick={(row) =>
          router.push(
            `/dashboard/patients/${patientId}/medical-history?recordId=${row.id}`,
          )
        }
      />
    </div>
  );
}
