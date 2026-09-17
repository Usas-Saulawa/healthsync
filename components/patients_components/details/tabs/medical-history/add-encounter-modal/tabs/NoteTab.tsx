// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/NoteTab.tsx
"use client";

import { useState } from "react";

export function NoteTab() {
  const [primaryReason, setPrimaryReason] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");
  const [subjectiveNarrative, setSubjectiveNarrative] = useState("");
  const [clinicalAssessment, setClinicalAssessment] = useState("");

  return (
    <div className="space-y-6">
      {/* Chief Complaint Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Chief Complaint
        </h3>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Patient&apos;s Primary Reason for Visit{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={primaryReason}
            onChange={(e) => setPrimaryReason(e.target.value)}
            placeholder="Enter chief complaint (e.g. Mild shortness of breath, routine follow-up)..."
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Objective / Examination Findings Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Objective / Examination Findings
        </h3>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Physical Exam & Vitals Review
          </label>
          <textarea
            rows={3}
            value={physicalExam}
            onChange={(e) => setPhysicalExam(e.target.value)}
            placeholder="Document objective findings, physical exam results, cardiovascular status, and system reviews..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>

      {/* Subjective / History of Present Illness (HPI) Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Subjective / History of Present Illness (HPI)
        </h3>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Subjective Narrative
          </label>
          <textarea
            rows={3}
            value={subjectiveNarrative}
            onChange={(e) => setSubjectiveNarrative(e.target.value)}
            placeholder="Document subjective findings, patient-reported symptoms, onset duration, and history of present illness..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>

      {/* Assessment & Plan Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Assessment & Plan
        </h3>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Clinical Assessment & Treatment Directives
          </label>
          <textarea
            rows={3}
            value={clinicalAssessment}
            onChange={(e) => setClinicalAssessment(e.target.value)}
            placeholder="Document clinical assessment, primary/secondary diagnoses, and progressive treatment plan..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}
