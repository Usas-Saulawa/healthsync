// components/patients_components/details/tabs/admission-and-discharge/TransferPatientModal.tsx
"use client";

import { useState } from "react";
import { X, ChevronDown, Info } from "lucide-react";

interface TransferPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferPatientModal({
  isOpen,
  onClose,
}: TransferPatientModalProps) {
  const [transferDate, setTransferDate] = useState("Oct 24, 2023");
  const [transferTime, setTransferTime] = useState("11:30 AM");
  const [reasonForTransfer, setReasonForTransfer] = useState(
    "Patient requires specialized cardiac telemetry monitoring not available in the current general medicine ward.",
  );
  const [currentWard, setCurrentWard] = useState("Cardiology A");
  const [currentBed, setCurrentBed] = useState("Bed 12");
  const [destinationDepartment, setDestinationDepartment] = useState(
    "Cardiology Intensive Care",
  );
  const [destinationWard, setDestinationWard] = useState("CICU - Ward C");
  const [bedType, setBedType] = useState<
    "Standard" | "ICU" | "Semi-Private" | "Private"
  >("ICU");
  const [transferSummary, setTransferSummary] = useState(
    "Patient stabilized after acute episode. Cardiac markers trending down but continuous monitor highly recommended.",
  );
  const [specialRequirements, setSpecialRequirements] = useState(
    "Continuous cardiac monitoring, IV access maintained at left forearm.",
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Transfer Request...", {
      transferDate,
      transferTime,
      reasonForTransfer,
      currentWard,
      currentBed,
      destinationDepartment,
      destinationWard,
      bedType,
      transferSummary,
      specialRequirements,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-[540px] bg-(--card) rounded-[12px] shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Transfer Patient
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-red-200 text-red-500 bg-red-50/50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 custom-scrollbar"
        >
          {/* SECTION 1: TRANSFER DETAILS */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Transfer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Transfer Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Transfer Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Transfer Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Transfer Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferTime}
                  onChange={(e) => setTransferTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Reason for Transfer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Reason for Transfer <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={reasonForTransfer}
                onChange={(e) => setReasonForTransfer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>
          </div>

          {/* SECTION 2: CURRENT LOCATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Current Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Current Ward */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Current Ward
                </label>
                <input
                  type="text"
                  value={currentWard}
                  readOnly
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-[8px] text-slate-600 focus:outline-none"
                />
              </div>

              {/* Current Bed */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Current Bed
                </label>
                <input
                  type="text"
                  value={currentBed}
                  readOnly
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-[8px] text-slate-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: DESTINATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Destination Department */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Destination Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={destinationDepartment}
                    onChange={(e) => setDestinationDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                  >
                    <option value="Cardiology Intensive Care">
                      Cardiology Intensive Care
                    </option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Destination Ward */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Destination Ward <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={destinationWard}
                    onChange={(e) => setDestinationWard(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                  >
                    <option value="CICU - Ward C">CICU - Ward C</option>
                    <option value="Ward A - General">Ward A - General</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Preferred Bed Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Preferred Bed Type
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(["Standard", "ICU", "Semi-Private", "Private"] as const).map(
                  (bt) => {
                    const isSelected = bedType === bt;
                    return (
                      <button
                        key={bt}
                        type="button"
                        onClick={() => setBedType(bt)}
                        className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-blue-50 text-[#2563EB] border-[#2563EB] shadow-2xs"
                            : "bg-(--card) text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {bt}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: CLINICAL HANDOVER */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Clinical Handover
            </h3>

            {/* Transfer Summary */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Transfer Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={transferSummary}
                onChange={(e) => setTransferSummary(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>

            {/* Special Requirements */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Special Requirements
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Info Notice Box */}
            <div className="relative flex items-start gap-2.5 bg-blue-50/70 border border-blue-100 rounded-[8px] p-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]" />
              <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#1E40AF] leading-relaxed">
                Transfer request will be sent to the destination ward for bed
                assignment and approval by nursing staff.
              </p>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card) text-slate-700 text-xs font-semibold rounded-[8px] border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-[8px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Submit Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
