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
      <div className="relative w-full max-w-[540px] bg-white rounded-[12px] shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Request Admission
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
          {/* SECTION 1: ADMISSION DETAILS */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Admission Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Admission Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Admission Type
                </label>
                <input
                  type="text"
                  value={admissionType}
                  onChange={(e) => setAdmissionType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Requested Date & Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Requested Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                  <input
                    type="text"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Admitting Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Admitting Provider <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={admittingProvider}
                  onChange={(e) => setAdmittingProvider(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Referring Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Referring Provider
                </label>
                <input
                  type="text"
                  placeholder="Enter physician..."
                  value={referringProvider}
                  onChange={(e) => setReferringProvider(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CLINICAL INFORMATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Clinical Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Primary Diagnosis */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Primary Diagnosis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={primaryDiagnosis}
                  onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* ICD-10 Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  ICD-10 Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={icd10Code}
                  onChange={(e) => setIcd10Code(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            {/* Reason for Admission */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Reason for Admission
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] resize-none"
              />
            </div>

            {/* Priority Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Priority
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {(["Routine", "Urgent", "Emergency"] as const).map((p) => {
                  const isSelected = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer border ${
                        isSelected
                          ? p === "Emergency"
                            ? "bg-white text-red-600 border-red-500 shadow-xs"
                            : "bg-white text-slate-900 border-slate-800 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
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
            <h3 className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              Preferred Ward
            </h3>

            {/* Preferred Department / Ward */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Preferred Department / Ward
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Filter className="w-3.5 h-3.5" />
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
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
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
              <label className="text-xs font-semibold text-slate-700">
                Special Requirements
              </label>
              <input
                type="text"
                placeholder="e.g. Isolation, continuous telemetry..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-[8px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Info Notice Box */}
            <div className="relative flex items-start gap-2.5 bg-blue-50/70 border border-blue-100 rounded-[8px] p-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]" />
              <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#1E40AF] leading-relaxed">
                Note: Bed assignment and admission approval will be processed by
                ward staff. You will be notified once reviewed.
              </p>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-slate-700 text-xs font-semibold rounded-[8px] border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-[8px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
