// components/patients_components/details/tabs/medications/PatientMedicationDetailModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

export interface MedicationDetailItem {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequencyText: string;
  status: "Active" | "Completed" | "Discontinued";
  duration: string;
}

interface PatientMedicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnosis?: string;
  startDate?: string;
  endDate?: string;
  medications?: MedicationDetailItem[];
  onDiscontinue?: (selectedIds: string[]) => void;
  onAddNote?: (selectedIds: string[]) => void;
}

const mockMedicationItems: MedicationDetailItem[] = [
  {
    id: "1",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "0/2 Completed",
    status: "Completed",
    duration: "7 Days",
  },
  {
    id: "2",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "3/3 Completed",
    status: "Completed",
    duration: "7 Days",
  },
  {
    id: "3",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "IM",
    frequencyText: "BDL Active",
    status: "Active",
    duration: "7 Days",
  },
  {
    id: "4",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Rectal",
    frequencyText: "0/1 Active",
    status: "Active",
    duration: "7 Days",
  },
  {
    id: "5",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "BDL Active",
    status: "Active",
    duration: "7 Days",
  },
  {
    id: "6",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "BDL Active",
    status: "Active",
    duration: "7 Days",
  },
  {
    id: "7",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "BDL Active",
    status: "Active",
    duration: "7 Days",
  },
  {
    id: "8",
    name: "Amoxilin Tryhydrate",
    dosage: "500mg",
    route: "Oral",
    frequencyText: "BDL Active",
    status: "Active",
    duration: "7 Days",
  },
];

export function PatientMedicationDetailModal({
  isOpen,
  onClose,
  diagnosis = "Fever",
  startDate = "Mar 22, 2023",
  endDate = "Mar 22, 2023",
  medications = mockMedicationItems,
  onDiscontinue,
  onAddNote,
}: PatientMedicationDetailModalProps) {
  const { prescriptionModalColumns } = useColumns();
  const [selectedIds, setSelectedIds] = useState<string[]>(["0"]);

  const toggleSelectAll = () => {
    if (selectedIds.length === medications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(medications.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected =
    medications.length > 0 && selectedIds.length === medications.length;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Slide-over Modal Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-152 h-full bg-(--card) flex flex-col gap-6 z-10 overflow-y-auto custom-scrollbar p-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3.5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-16 h-16 rounded-full bg-(--warning-icon-bg) overflow-hidden border border-(--border) shadow-xs flex items-center justify-center">
                    <img
                      src="/images/profile.jpeg"
                      alt="Bashir Musa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 -mt-3 bg-(--button) text-(--button-text) text-[10px] font-bold rounded-full whitespace-nowrap">
                    In-Patient
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold tracking-tight">
                    Bashir Musa
                  </h4>
                  <p className="text-xs text-(--shade-text) font-medium flex flex-wrap items-center gap-1.5">
                    <span>Male, 10/11/1995</span>
                    <span>&bull;</span>
                    <span className=" font-semibold">09:30 AM</span>
                    <span>&bull;</span>
                    <span className=" font-semibold">Oct 24, 2023</span>
                  </p>
                  <p className="text-[11px] text-(--shade-text) leading-tight">
                    Cardiology A - Bed 12 &bull; Nurse Sarah Jenkins &bull;
                    Hospital: Medical Centre
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-(--card-hover) text-(--shade) transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Download Medication Button */}
            <div className="w-full">
              <button
                type="button"
                onClick={() => console.log("Printing medication...")}
                className="bg-(--background) w-full font-semibold text-sm rounded-md px-6 py-3 flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="h-4 w-4" />
                <span>Print Medication</span>
              </button>
            </div>

            {/* Start Date and End Date */}
            <div className="w-full">
              <div className="flex items-center justify-between text-xs border-b border-dashed border-(--border) pb-3 font-semibold ">
                <span>Start Date: {startDate}</span>
                <span>End Date: {endDate}</span>
              </div>
              <p className="text-xs font-semibold  mt-2">
                Diagnosis: {diagnosis}
              </p>
            </div>

            {/* Medication Table List Body Container */}
            <div className="flex-1 max-h-[60%]">
              <DataTable
                data={medications}
                columns={prescriptionModalColumns}
                currentPage={1}
                rowsPerPage={medications.length}
                pagination={false}
                loading={false}
                onPageChange={() => {}}
                totalPages={1}
                selectable
                rowKey="id"
                // onRowClick={handleRowClick}
              />
            </div>

            {/* Add Note and Discontinue Buttons Footer */}
            <div className="border-t border-(--border) border-dashed pt-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onDiscontinue?.(selectedIds)}
                  className="flex-1 bg-(--badge-bg) text-(--badge-text) py-3 font-bold text-xs rounded-md shadow-xs cursor-pointer flex items-center justify-center"
                >
                  Discontinue
                </button>

                <button
                  type="button"
                  onClick={() => onAddNote?.(selectedIds)}
                  className="flex-1 bg-(--button) text-(--button-text) py-3 font-bold text-xs rounded-md shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>+ Add Note</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
