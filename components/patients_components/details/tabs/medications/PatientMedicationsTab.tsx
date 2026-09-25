// components/patients_components/details/tabs/medications/PatientMedicationsTab.tsx
"use client";

import { useState, useMemo, useRef } from "react";
import { Download, Plus } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import { MedicationRow } from "./PatientMedicationsList";
import { AddPrescriptionModal } from "./AddPrescriptionModal";
import { PatientMedicationDetailModal } from "./PatientMedicationDetailModal";
import { mockMedicationsData } from "@/mock/mockDashboardData";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

export function PatientMedicationsTab() {
  const { medmanagementColumns } = useColumns();
  const [medications, setMedications] =
    useState<MedicationRow[]>(mockMedicationsData);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [sortValue, setSortValue] = useState("");
  const [sortLabel, setSortLabel] = useState("Sort by");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<MedicationRow | null>(
    null,
  );

  const itemsPerPage = 5;

  const filterOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Discontinued", value: "discontinued" },
  ];

  const sortOptions = [
    { label: "Date (Newest)", value: "date_newest" },
    { label: "Diagnosis (A-Z)", value: "diagnosis_az" },
  ];

  // Filter & Sort Logic
  const processedMedications = useMemo(() => {
    let result = [...medications];

    // Filter by Status (only if a specific filter or 'all' option with filter state is active)
    if (filterValue && filterValue !== "all") {
      result = result.filter(
        (item) => item.status.toLowerCase() === filterValue.toLowerCase(),
      );
    }

    // Sort Records
    if (sortValue === "diagnosis_az") {
      result.sort((a, b) => a.diagnosis.localeCompare(b.diagnosis));
    } else if (sortValue === "date_newest") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return result;
  }, [medications, filterValue, sortValue]);

  const handleFilterSelect = (val: string, label: string) => {
    // If selecting the already active filter or choosing to reset, clear it
    if (filterValue === val && val !== "all") {
      setFilterValue("");
      setFilterLabel("Filter");
    } else {
      setFilterValue(val);
      setFilterLabel(label);
    }
    setCurrentPage(1); // Reset page on filter change
  };

  const handleSortSelect = (val: string, label: string) => {
    if (sortValue === val) {
      setSortValue("");
      setSortLabel("Sort by");
    } else {
      setSortValue(val);
      setSortLabel(label);
    }
    setCurrentPage(1); // Reset page on sort change
  };

  const handleNewPrescription = () => {
    setIsAddModalOpen(true);
  };

  const handleModalSubmit = (newPrescriptionData: any) => {
    const newRow: MedicationRow = {
      id: Date.now().toString(),
      diagnosis: newPrescriptionData.medicationName || "General Diagnosis",
      medicationsList: `${newPrescriptionData.medicationName} (${newPrescriptionData.dosage})`,
      facility: "Medical Centre",
      doctor: "Dr. Ibrahim Muazu",
      prescriptionsCount: Number(newPrescriptionData.quantity) || 10,
      date: "Today",
      status: "Active",
    };
    setMedications([newRow, ...medications]);
  };

  const handleExport = () => {
    console.log("Exporting medication records...");
  };

  const handleRowClick = (row: MedicationRow) => {
    setSelectedRowData(row);
    setIsDetailModalOpen(true);
  };

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="bg-(--card) rounded-xl p-5 space-y-6">
      {/* Header & Action Bar Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Medication Management
          </h2>
          <p className="text-xs text-(--shade) mt-1">
            Active prescriptions, dosage schedules, and therapy history
          </p>
        </div>

        {/* Action Buttons & Filter Toolbar Wrapper */}
        <div className="flex flex-wrap items-center gap-3 relative z-20">
          <MasterFilterToolbar
            showSearch={false}
            showFilter={true}
            filterLabel={filterLabel}
            filterOptions={filterOptions}
            onFilterSelect={handleFilterSelect}
            showSort={true}
            sortLabel={sortLabel}
            sortOptions={sortOptions}
            onSortSelect={handleSortSelect}
            variant="tinted"
          />

          <button
            type="button"
            ref={buttonRef}
            onClick={handleNewPrescription}
            className="flex items-center gap-1 py-2 pr-4 pl-3 rounded-md bg-(--button) text-(--button-text) text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Prescription</span>
          </button>

          <button
            type="button"
            style={{ width: buttonRef?.current?.clientWidth }}
            className="flex items-center justify-center gap-1 py-2 pl-3 pr-4 rounded-md bg-(--background) text-sm sm:text-sm font-semibold hover:bg-(--card-hover) transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Medications List Table Component with Dynamic Data & Pagination Props */}
      <DataTable
        data={processedMedications}
        columns={medmanagementColumns}
        currentPage={currentPage}
        rowsPerPage={itemsPerPage}
        pagination={true}
        loading={loading}
        onPageChange={onPageChange}
        totalPages={Math.ceil(processedMedications.length / 5)}
        selectable={false}
        rowKey="id"
        onRowClick={handleRowClick}
      />

      {/* Add Prescription Modal Component */}
      <AddPrescriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      {/* Medication Detail Slide-Over Modal */}
      <PatientMedicationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        diagnosis={selectedRowData?.diagnosis || "Fever"}
        startDate={selectedRowData?.date || "Mar 22, 2023"}
        endDate={selectedRowData?.date || "Mar 22, 2023"}
        onDiscontinue={(ids: string[]) =>
          console.log("Discontinuing ids:", ids)
        }
        onAddNote={(ids: string[]) => console.log("Adding note for ids:", ids)}
      />
    </div>
  );
}
