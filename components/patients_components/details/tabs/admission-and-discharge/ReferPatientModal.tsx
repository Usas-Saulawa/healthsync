// components/patients_components/details/tabs/admission-and-discharge/ReferPatientModal.tsx
"use client";

import { useState } from "react";
import { X, ChevronDown, Activity, Info } from "lucide-react";

interface ReferPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferPatientModal({ isOpen, onClose }: ReferPatientModalProps) {
  const [referralType, setReferralType] = useState("Outpatient Consultation");
  const [urgency, setUrgency] = useState<"Routine" | "Urgent" | "Emergency">(
    "Routine",
  );
  const [referralDate, setReferralDate] = useState("Oct 24, 2023");
  const [specialty, setSpecialty] = useState("Endocrinology");
  const [preferredProvider, setPreferredProvider] = useState(
    "Dr. Alan Marcus, MD",
  );
  const [facility, setFacility] = useState("Same Facility (General Hospital)");
  const [reasonForReferral, setReasonForReferral] = useState(
    "Patient requires endocrinology consultation for uncontrolled Type 2 Diabetes Mellitus with HbA1c of 9.2%.",
  );
  const [relevantHistory, setRelevantHistory] = useState(
    "Failed oral therapy. Patient has insulin non-compliance history.",
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Referral...", {
      referralType,
      urgency,
      referralDate,
      specialty,
      preferredProvider,
      facility,
      reasonForReferral,
      relevantHistory,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-135 bg-(--card) rounded-xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-(--border)">
          <h2 className="text-lg font-bold  tracking-tight">Refer Patient</h2>
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
          {/* SECTION 1: REFERRAL DETAILS */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Referral Details
            </h3>

            {/* Referral Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Referral Type <span className="text-(--danger-title)">*</span>
              </label>
              <div className="relative">
                <select
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
                >
                  <option value="Outpatient Consultation">
                    Outpatient Consultation
                  </option>
                  <option value="Inpatient Consultation">
                    Inpatient Consultation
                  </option>
                  <option value="Diagnostic Imaging">Diagnostic Imaging</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Urgency Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">Urgency</label>
              <div className="flex items-center gap-2 flex-wrap">
                {(["Routine", "Urgent", "Emergency"] as const).map((u) => {
                  const isSelected = urgency === u;
                  return (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUrgency(u)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer border ${
                        isSelected
                          ? u === "Emergency"
                            ? "bg-(--danger-card) text-(--danger-title) border-(--danger-title) shadow-xs"
                            : "bg-(--card-hover)  border-(--shade) shadow-xs"
                          : "bg-(--card) text-(--shade-text) border-(--border) hover:bg-(--card-hover)"
                      }`}
                    >
                      {u}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Referral Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Referral Date <span className="text-(--danger-title)">*</span>
              </label>
              <input
                type="text"
                value={referralDate}
                onChange={(e) => setReferralDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade)"
              />
            </div>
          </div>

          {/* SECTION 2: REFERRING TO */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Referring To
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Specialty / Department */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Specialty / Department{" "}
                  <span className="text-(--danger-title)">*</span>
                </label>
                <div className="relative">
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
                  >
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Preferred Provider */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold ">
                  Preferred Provider
                </label>
                <div className="relative">
                  <select
                    value={preferredProvider}
                    onChange={(e) => setPreferredProvider(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
                  >
                    <option value="Dr. Alan Marcus, MD">
                      Dr. Alan Marcus, MD
                    </option>
                    <option value="Dr. Sarah Jenkins, MD">
                      Dr. Sarah Jenkins, MD
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Facility */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Facility <span className="text-(--danger-title)">*</span>
              </label>
              <div className="relative">
                <select
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) appearance-none cursor-pointer pr-8"
                >
                  <option value="Same Facility (General Hospital)">
                    Same Facility (General Hospital)
                  </option>
                  <option value="External Partner Facility">
                    External Partner Facility
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SECTION 3: CLINICAL INFORMATION */}
          <div className="flex flex-col gap-3.5 pt-1">
            <h3 className="text-xs font-bold text-(--primary) tracking-wider uppercase">
              Clinical Information
            </h3>

            {/* Reason for Referral */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Reason for Referral{" "}
                <span className="text-(--danger-title)">*</span>
              </label>
              <textarea
                rows={2}
                value={reasonForReferral}
                onChange={(e) => setReasonForReferral(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) resize-none"
              />
            </div>

            {/* Relevant History */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">Relevant History</label>
              <textarea
                rows={2}
                value={relevantHistory}
                onChange={(e) => setRelevantHistory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-(--border) rounded-md  focus:outline-none focus:border-(--shade) resize-none"
              />
            </div>

            {/* Relevant Attachments Action Button */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold ">
                Relevant Attachments
              </label>
              <button
                type="button"
                onClick={() => console.log("Attach files clicked")}
                className="w-full py-3 border border-dashed border-(--shade) rounded-md /50 hover: text-blue-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>+ Attach Lab Results, ECG or Imaging</span>
              </button>
            </div>

            {/* Info Notice Box */}
            <div className="relative flex items-start gap-2.5 bg-(--info-icon-bg) rounded-md p-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-(--info-title)" />
              <Info className="w-4 h-4 text-(--primary) shrink-0 mt-0.5" />
              <p className="text-[11px] text-(--info-title) leading-relaxed">
                Referral will be sent to the receiving department. You will be
                notified when it is accepted or if additional information is
                required.
              </p>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-(--border) mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card)  text-xs font-semibold rounded-md border border-(--border) hover:bg-(--card-hover) transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--button) text-(--button-text) text-xs font-bold rounded-md hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Submit Referral
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
