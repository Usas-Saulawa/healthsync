// components/patients_components/details/tabs/admission-and-discharge/AdmissionRequestModal.tsx
"use client";

import { useState } from "react";
import { X, Filter, Info } from "lucide-react";

interface AdmissionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdmissionRequestModal({
  isOpen,
  onClose,
}: AdmissionRequestModalProps) {
  const [admissionType, setAdmissionType] = useState("Emergency");
  const [requestedDate, setRequestedDate] = useState("10/24/2023");
  const [requestedTime, setRequestedTime] = useState("08:30 AM");
  const [admittingProvider, setAdmittingProvider] = useState(
    "Dr. Sarah Jenkins, MD",
  );
  const [referringProvider, setReferringProvider] = useState("");
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState(
    "Acute Coronary Syndrome",
  );
  const [icd10Code, setIcd10Code] = useState("I24.9");
  const [reason, setReason] = useState(
    "Patient presents with acute chest pain radiating to left arm and shortness of breath...",
  );
  const [priority, setPriority] = useState<"Routine" | "Urgent" | "Emergency">(
    "Emergency",
  );
  const [department, setDepartment] = useState("Cardiology");
  const [bedType, setBedType] = useState<
    "Standard" | "ICU" | "Semi-Private" | "Private"
  >("Standard");
  const [specialRequirements, setSpecialRequirements] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Admission Request...", {
      admissionType,
      requestedDate,
      requestedTime,
      admittingProvider,
      referringProvider,
      primaryDiagnosis,
      icd10Code,
      reason,
      priority,
      department,
      bedType,
      specialRequirements,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-135 bg-(--card) rounded-xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-lg font-bold  tracking-tight">
            Request Admission
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
          {/* SECTION 1: ADMISSION DETAILS */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Admission Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Admission Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">Admission Type</label>
                <input
                  type="text"
                  value={admissionType}
                  onChange={(e) => setAdmissionType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>

              {/* Requested Date & Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Requested Date & Time{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                  />
                  <input
                    type="text"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Admitting Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Admitting Provider{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <input
                  type="text"
                  value={admittingProvider}
                  onChange={(e) => setAdmittingProvider(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>

              {/* Referring Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Referring Provider
                </label>
                <input
                  type="text"
                  placeholder="Enter physician..."
                  value={referringProvider}
                  onChange={(e) => setReferringProvider(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  placeholder:text-slate-400 focus:outline-none focus:border-(--shade)"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CLINICAL INFORMATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Clinical Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Primary Diagnosis */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Primary Diagnosis{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <input
                  type="text"
                  value={primaryDiagnosis}
                  onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>

              {/* ICD-10 Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  ICD-10 Code <span className="text-(--danger-title)">*</span>
                </label>
                <input
                  type="text"
                  value={icd10Code}
                  onChange={(e) => setIcd10Code(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
              </div>
            </div>

            {/* Reason for Admission */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Reason for Admission
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) resize-none"
              />
            </div>

            {/* Priority Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">Priority</label>
              <div className="flex items-center gap-2 flex-wrap">
                {(["Routine", "Urgent", "Emergency"] as const).map((p) => {
                  const isSelected = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border ${
                        isSelected
                          ? p === "Emergency"
                            ? "bg-(--danger-card) text-(--danger-title) border-(--danger-title) shadow-xs"
                            : "bg-(--card-hover)  border-(--shade) shadow-xs"
                          : "bg-(--card) text-(--shade-text) border-(--border) hover:bg-(--card-hover)"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: PREFERRED WARD */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Preferred Ward
            </h3>

            {/* Preferred Department / Ward */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Preferred Department / Ward
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Filter className="w-3.5 h-3.5" />
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
                            ? "bg-(--info-icon-bg) text-(--info-title) border-(--info-icon-bg) shadow-2xs"
                            : "bg-(--card) text-(--shade) border-(--border) hover:bg-(--card-hover)"
                        }`}
                      >
                        {bt}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Special Requirements */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Special Requirements
              </label>
              <input
                type="text"
                placeholder="e.g. Isolation, continuous telemetry..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  placeholder:text-slate-400 focus:outline-none focus:border-(--shade)"
              />
            </div>

            {/* Info Notice Box */}
            <div className="relative flex items-start gap-2.5 bg-(--info-card) rounded-md p-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--info-icon-bg)" />
              <Info className="w-4 h-4 text-(--primary) shrink-0 mt-0.5" />
              <p className="text-[11px] text-(--info-title) leading-relaxed">
                Note: Bed assignment and admission approval will be processed by
                ward staff. You will be notified once reviewed.
              </p>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-(--border) mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card) text-xs font-semibold rounded-md border border-(--border) hover:bg-(--card-hover) transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--button) text-(--button-text) text-xs font-bold rounded-md hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
