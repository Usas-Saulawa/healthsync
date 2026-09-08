// src/components/patients_components/details/tabs/medications/ConditionCoreSection.tsx
"use client";

import React from "react";

interface ConditionCoreSectionProps {
  conditionName?: string;
  diagnosisType?: string;
  status?: string;
  severity?: string;
  dateDiagnosed?: string;
  diagnosingProvider?: string;
  facility?: string;
  icd10Code?: string;
  onsetType?: string;
  bodySystem?: string;
  clinicalNotes?: string;
}

export function ConditionCoreSection({
  conditionName = "Type 2 Diabetes Mellitus",
  diagnosisType = "Diagnosis",
  status = "Active",
  severity = "Moderate",
  dateDiagnosed = "Oct 12, 2023",
  diagnosingProvider = "Dr. Sarah Jenkins, MD",
  facility = "Metro Cardiology Group",
  icd10Code = "E11.9",
  onsetType = "Gradual",
  bodySystem = "Endocrine",
  clinicalNotes = "First diagnosed during routine cardiology follow-up. Fasting glucose elevated at 142 mg/dL. HbA1c 7.2%. Patient has family history of diabetes (mother, maternal grandmother). BMI 28.4. Initiated Metformin 500mg BID. Patient counseled on dietary modifications, exercise regimen, and glucose self-monitoring. Referred to endocrinology for co-management.",
}: ConditionCoreSectionProps) {
  return (
    <div className="w-full space-y-4">
      {/* Card 1: Condition Header & Details Metadata Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
        {/* Title and Badges row */}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
            {conditionName}
          </h2>
          <div className="flex items-center gap-2.5">
            {/* Diagnosis Badge - Deep soft blue fill */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100/80 text-blue-700 border border-blue-200">
              {diagnosisType}
            </span>
            {/* Active Badge - Deep soft emerald fill */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-200">
              {status}
            </span>
            {/* Moderate Badge - Deep soft amber/orange fill */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100/80 text-amber-800 border border-amber-200">
              {severity}
            </span>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full h-px bg-slate-100" />

        {/* Metadata Grid (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-sm">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Date Diagnosed
              </p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">
                {dateDiagnosed}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Facility</p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">{facility}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Onset Type</p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">{onsetType}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Diagnosing Provider
              </p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">
                {diagnosingProvider}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">ICD-10 Code</p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">{icd10Code}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Body System</p>
              <p className="mt-0.5 font-semibold text-[#0f172a]">
                {bodySystem}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Clinical Notes Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
          Clinical Notes
        </h3>
        <p className="text-xs sm:text-sm text-[#0f172a] leading-relaxed font-normal">
          {clinicalNotes}
        </p>
      </div>
    </div>
  );
}
