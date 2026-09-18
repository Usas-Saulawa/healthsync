// components/patients_components/details/tabs/medications/PatientMedicationDetailModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

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
            className="relative w-full max-w-[608px] h-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto custom-scrollbar"
          >
            {/* Modal Header */}
            <div className="px-9 pt-[25px] pb-4 flex items-start justify-between min-h-[126px]">
              <div className="flex items-start gap-3.5">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-[52px] h-[52px] rounded-full bg-amber-200 overflow-hidden border-2 border-white shadow-xs flex items-center justify-center">
                    <img
                      src="/images/profile.jpeg"
                      alt="Bashir Musa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#2167F3] text-white text-[9px] font-bold rounded-full shadow-2xs whitespace-nowrap">
                    In-Patient
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#111827] tracking-tight">
                    Bashir Musa
                  </h4>
                  <p className="text-xs text-(--shade) font-medium flex flex-wrap items-center gap-1.5">
                    <span>Male, 10/11/1995</span>
                    <span>&bull;</span>
                    <span className=" font-semibold">09:30 AM</span>
                    <span>&bull;</span>
                    <span className=" font-semibold">Oct 24, 2023</span>
                  </p>
                  <p className="text-[11px] text-(--shade) leading-tight">
                    Cardiology A - Bed 12 &bull; Nurse Sarah Jenkins &bull;
                    Hospital: Medical Centre
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover: transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Download Medication Button */}
            <div className="px-[42px] mt-2">
              <button
                type="button"
                onClick={() => console.log("Printing medication...")}
                className="w-[529px] h-[50px] bg-app-bg  font-semibold text-sm rounded-[6px] px-6 py-3 flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="h-4 w-4 text-slate-600" />
                <span>Print Medication</span>
              </button>
            </div>

            {/* Start Date and End Date */}
            <div className="px-[45px] mt-6">
              <div className="w-[526px] flex items-center justify-between text-xs font-semibold ">
                <span>Start Date: {startDate}</span>
                <span>End Date: {endDate}</span>
              </div>
              <p className="text-xs font-semibold  mt-2">
                Diagnosis: {diagnosis}
              </p>
            </div>

            {/* Medication Table List Body Container */}
            <div className="px-[24px] mt-3 flex-1">
              <div className="w-[557px] bg-white rounded-xl p-2">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-bold text-slate-400 tracking-wider items-center">
                  <div className="col-span-5 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>MEDICATION NAME</span>
                  </div>
                  <div className="col-span-2">ROUTE</div>
                  <div className="col-span-3">FREQUENCY</div>
                  <div className="col-span-2 text-right">DURATION</div>
                </div>

                {/* Table Body List Rows with custom-scrollbar */}
                <div className="space-y-[11px] mt-2 overflow-y-auto max-h-[440px] pr-1 custom-scrollbar">
                  {medications.map((med) => {
                    const isSelected = selectedIds.includes(med.id);
                    return (
                      <div
                        key={med.id}
                        onClick={() => toggleSelectOne(med.id)}
                        className={`w-[528px] h-[51px] bg-app-bg rounded-[5px] px-[18px] py-[5px] flex items-center justify-between cursor-pointer ${
                          isSelected ? " bg-app-bg" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 w-[210px]">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(med.id)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <p className="text-xs font-bold  truncate">
                              {med.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {med.dosage}
                            </p>
                          </div>
                        </div>

                        <div className="w-[70px] text-xs font-medium ">
                          {med.route}
                        </div>

                        <div className="w-[120px] flex items-center gap-1.5">
                          <span className="text-xs font-semibold ">
                            {med.frequencyText.split(" ")[0]}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {med.status}
                          </span>
                        </div>

                        <div className="w-[70px] text-xs font-medium  text-right">
                          {med.duration}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Add Note and Discontinue Buttons Footer */}
            <div className="px-[35px] py-5 border-t border-slate-100 bg-white mt-auto">
              <div className="w-[528px] h-[69px] flex items-center gap-[15px]">
                <button
                  type="button"
                  onClick={() => onDiscontinue?.(selectedIds)}
                  className="flex-1 h-[50px] bg-red-600 text-white font-bold text-xs rounded-[6px] shadow-xs cursor-pointer flex items-center justify-center"
                >
                  Discontinue
                </button>

                <button
                  type="button"
                  onClick={() => onAddNote?.(selectedIds)}
                  className="flex-1 h-[50px] bg-[#2563EB] text-white font-bold text-xs rounded-[6px] shadow-xs cursor-pointer flex items-center justify-center gap-2"
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
