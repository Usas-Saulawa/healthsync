// components/patients_components/details/tabs/medications/PatientMedicationsTab.tsx
"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import {
  PatientMedicationsList,
  MedicationRow,
} from "./PatientMedicationsList";
import { AddPrescriptionModal } from "./AddPrescriptionModal";
import { PatientMedicationDetailModal } from "./PatientMedicationDetailModal";
import { mockMedicationsData } from "@/mock/mockDashboardData";

export function PatientMedicationsTab() {
  const [medications, setMedications] =
    useState<MedicationRow[]>(mockMedicationsData);
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

  // Paginated slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedMedications.slice(start, start + itemsPerPage);
  }, [processedMedications, currentPage]);

  const totalPages = Math.ceil(processedMedications.length / itemsPerPage) || 1;

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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      {/* Header & Action Bar Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
            Medication Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Active prescriptions, dosage schedules, and therapy history
          </p>
        </div>

        {/* Action Buttons & Filter Toolbar Wrapper */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-20">
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
            onClick={handleNewPrescription}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer h-[40px]"
          >
            <Plus className="h-4 w-4" />
            <span>New Prescription</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-app-bg text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer h-[40px]"
          >
            Export
          </button>
        </div>
      </div>

      {/* Medications List Table Component with Dynamic Data & Pagination Props */}
      <PatientMedicationsList
        data={paginatedData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={processedMedications.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
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
