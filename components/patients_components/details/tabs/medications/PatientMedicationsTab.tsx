// components/patients_components/details/tabs/medications/PatientMedicationsTab.tsx
"use client";

import { useState } from "react";
import { SlidersHorizontal, ArrowUpDown, Plus, Download } from "lucide-react";
import {
  PatientMedicationsList,
  MedicationRow,
} from "./PatientMedicationsList";

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
  const [medications] = useState<MedicationRow[]>(mockMedicationsData);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNewPrescription = () => {
    console.log("Opening new prescription modal...");
  };

  const handleExport = () => {
    console.log("Exporting medication records...");
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
            Medication Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Active prescriptions, dosage schedules, and therapy history
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Filter</span>
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Sort by</span>
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
          </button>

          <button
            type="button"
            onClick={handleNewPrescription}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>+ New Prescription</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>

      {/* Medications List Table Component */}
      <PatientMedicationsList
        data={medications}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
