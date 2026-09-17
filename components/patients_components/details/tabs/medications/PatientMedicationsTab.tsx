// components/patients_components/details/tabs/medications/PatientMedicationsTab.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { MasterFilterToolbar } from "@/components/tools/filterTools";
import {
  PatientMedicationsList,
  MedicationRow,
} from "./PatientMedicationsList";
import { AddPrescriptionModal } from "./AddPrescriptionModal";

const mockMedicationsData: MedicationRow[] = [
  {
    id: "1",
    diagnosis: "Fever",
    medicationsList:
      "Lisinopril, Atorvastatin Calcium, Amoxilin Trihydrate.......",
    facility: "Medical Centre",
    doctor: "Dr. Ibrahim Muazu",
    prescriptionsCount: 10,
    date: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "2",
    diagnosis: "Diabetis",
    medicationsList:
      "Lisinopril, Atorvastatin Calcium, Amoxilin Trihydrate.......",
    facility: "General Hospital",
    doctor: "Dr. Ibrahim Muazu",
    prescriptionsCount: 10,
    date: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "3",
    diagnosis: "Diabetis",
    medicationsList:
      "Lisinopril, Atorvastatin Calcium, Amoxilin Trihydrate.......",
    facility: "Alheri Clinic",
    doctor: "Dr. Ibrahim Muazu",
    prescriptionsCount: 10,
    date: "Oct 12, 2023",
    status: "Completed",
  },
  {
    id: "4",
    diagnosis: "Fever",
    medicationsList:
      "Lisinopril, Atorvastatin Calcium, Amoxilin Trihydrate.......",
    facility: "Medical Centre",
    doctor: "Dr. Ibrahim Muazu",
    prescriptionsCount: 10,
    date: "Oct 12, 2023",
    status: "Active",
  },
  {
    id: "5",
    diagnosis: "Fever",
    medicationsList:
      "Lisinopril, Atorvastatin Calcium, Amoxilin Trihydrate.......",
    facility: "Medical Centre",
    doctor: "Dr. Ibrahim Muazu",
    prescriptionsCount: 10,
    date: "Oct 12, 2023",
    status: "Discontinued",
  },
];

export function PatientMedicationsTab() {
  const [medications, setMedications] =
    useState<MedicationRow[]>(mockMedicationsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLabel, setFilterLabel] = useState("Filter");
  const [sortLabel, setSortLabel] = useState("Sort by");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleNewPrescription = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (newPrescriptionData: any) => {
    // Append new prescription or mock insert to state list
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

  return (
    <div className="bg-(--card) rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      {/* Header & Action Bar Section Inside the Container */}
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
            onFilterSelect={(val, label) => setFilterLabel(label)}
            showSort={true}
            sortLabel={sortLabel}
            sortOptions={sortOptions}
            onSortSelect={(val, label) => setSortLabel(label)}
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-(--background) text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer h-[40px]"
          >
            Export
          </button>
        </div>
      </div>

      {/* Medications List Table Component Embedded Cleanly */}
      <PatientMedicationsList
        data={medications}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add Prescription Modal Component */}
      <AddPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
