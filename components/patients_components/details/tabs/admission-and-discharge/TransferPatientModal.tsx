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
      <div className="relative w-full max-w-135 bg-(--card) rounded-xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-(--border) px-6 pt-5 pb-4">
          <h2 className="text-lg font-bold  tracking-tight">
            Transfer Patient
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-(--shade) hover: hover:bg-(--card-hover) transition-colors cursor-pointer"
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
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Transfer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Transfer Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Transfer Date <span className="text-(--danger-title)">*</span>
                </label>
                <input
                  type="text"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>

              {/* Transfer Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Transfer Time <span className="text-(--danger-title)">*</span>
                </label>
                <input
                  type="text"
                  value={transferTime}
                  onChange={(e) => setTransferTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>
            </div>

            {/* Reason for Transfer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Reason for Transfer{" "}
                <span className="text-(--danger-title)">*</span>
              </label>
              <textarea
                rows={2}
                value={reasonForTransfer}
                onChange={(e) => setReasonForTransfer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) resize-none"
              />
            </div>
          </div>

          {/* SECTION 2: CURRENT LOCATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Current Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Current Ward */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">Current Ward</label>
                <input
                  type="text"
                  value={currentWard}
                  readOnly
                  className="w-full px-3 py-2 text-xs  border border-(--border) rounded-md text-(--shade-text) focus:outline-none"
                />
              </div>

              {/* Current Bed */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">Current Bed</label>
                <input
                  type="text"
                  value={currentBed}
                  readOnly
                  className="w-full px-3 py-2 text-xs  border border-(--border) rounded-md text-(--shade-text) focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: DESTINATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Destination Department */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Destination Department{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <div className="relative">
                  <select
                    value={destinationDepartment}
                    onChange={(e) => setDestinationDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
                  >
                    <option value="Cardiology Intensive Care">
                      Cardiology Intensive Care
                    </option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--shade-text) pointer-events-none" />
                </div>
              </div>

              {/* Destination Ward */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Destination Ward{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <div className="relative">
                  <select
                    value={destinationWard}
                    onChange={(e) => setDestinationWard(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
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
              <label className="text-xs font-semibold ">
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
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-(--info-icon-bg) text-(--info-title) border-(--info-icon-bg)"
                            : "bg-(--card) text-(--shade-text) border-(--border) hover:"
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
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Clinical Handover
            </h3>

            {/* Transfer Summary */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Transfer Summary{" "}
                <span className="text-(--danger-title)">*</span>
              </label>
              <textarea
                rows={2}
                value={transferSummary}
                onChange={(e) => setTransferSummary(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) resize-none"
              />
            </div>

            {/* Special Requirements */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Special Requirements
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
              />
            </div>

            {/* Info Notice Box */}
            <div className="relative flex items-start gap-2.5 bg-(--info-icon-bg) rounded-md p-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--info-title)" />
              <Info className="w-4 h-4 text-(--primary) shrink-0 mt-0.5" />
              <p className="text-[11px] text-(--info-title) leading-relaxed">
                Transfer request will be sent to the destination ward for bed
                assignment and approval by nursing staff.
              </p>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center border-t border-(--border) justify-end gap-2.5 pt-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card) text-xs font-semibold rounded-md border border-(--border) hover: transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--button) text-(--button-text) text-xs font-bold rounded-md hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Submit Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
