// src/components/patients_components/details/tabs/medical-history/ConditionCoreSection.tsx
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
    <div className="sm:col-span-5 flex flex-col gap-3 h-full">
      {/* Card 1: Condition Header & Details Metadata Card */}
      <div className="w-full bg-(--card) rounded-xl shadow-xs p-5 space-y-3">
        {/* Title and Badges row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Updated heading size to text-lg font-bold to perfectly match the Vitals card scale */}
          <h2 className="text-lg font-bold tracking-tight">{conditionName}</h2>
          <div className="flex items-center gap-2">
            {/* Diagnosis */}
            <span className="inline-flex p-1 items-center rounded-full bg-(--info-icon-bg) px-2 text-xs font-semibold leading-none text-(--info-title)">
              {diagnosisType}
            </span>

            {/* Active */}
            <span className="inline-flex p-1 items-center rounded-full bg-(--lab-timeline-bg) px-2 text-xs font-semibold leading-none text-(--lab-timeline-text)">
              {status}
            </span>

            {/* Moderate */}
            <span className="inline-flex p-1 items-center rounded-full bg-(--warning-card) px-2 text-xs font-semibold leading-none text-(--warning-text)">
              {severity}
            </span>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full h-px bg-(--border)" />

        {/* Metadata Grid (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-9 text-sm">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                Date Diagnosed
              </p>
              <p className="mt-0.5 font-semibold">{dateDiagnosed}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                Facility
              </p>
              <p className="mt-0.5 font-semibold">{facility}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                Onset Type
              </p>
              <p className="mt-0.5 font-semibold">{onsetType}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                Diagnosing Provider
              </p>
              <p className="mt-0.5 font-semibold">{diagnosingProvider}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                ICD-10 Code
              </p>
              <p className="mt-0.5 font-semibold">{icd10Code}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-(--shade-text)">
                Body System
              </p>
              <p className="mt-0.5 font-semibold">{bodySystem}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Clinical Notes Card */}
      <div className="w-full flex-1 bg-(--card) rounded-xl shadow-xs p-5 space-y-3">
        <h3 className="text-base sm:text-lg font-bold">Clinical Notes</h3>
        <p className="text-xs sm:text-sm leading-relaxed font-normal">
          {clinicalNotes}
        </p>
      </div>
    </div>
  );
}
