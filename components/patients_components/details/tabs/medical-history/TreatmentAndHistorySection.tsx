// src/components/patients_components/details/tabs/medical-history/TreatmentAndHistorySection.tsx
"use client";

import { FileText } from "lucide-react";

const encounterData = [
  {
    id: 1,
    date: "Oct 23, 2023",
    time: "02:15 PM",
    title: "Initial Diagnosis & Treatment",
    doctor: "Dr. Sarah Jenkins, MD",
    group: "Metro Cardiology Group",
    description:
      "Fasting glucose 142 mg/dL, HbA1c 7.2%. Started Metformin 500mg BID. Dietary counseling provided.",
    badge: "1",
  },
  {
    id: 2,
    date: "Nov 14, 2023",
    time: "10:30 AM",
    title: "Endocrinology Consultation",
    doctor: "Dr. Alan Marcus, MD",
    group: "Metro Endocrine Specialists",
    description:
      "HbA1c improved to 6.8%. Fasting glucose 118 mg/dL. Metformin well tolerated. Continue current regimen.",
  },
  {
    id: 3,
    date: "Jan 10, 2024",
    time: "01:00 PM",
    title: "Follow-up & Lab Review",
    doctor: "Dr. Sarah Jenkins, MD",
    group: "Metro Cardiology Group",
    description:
      "Patient reports consistent medication adherence. Blood pressure remains stable at 120/80 mmHg.",
  },
  {
    id: 4,
    date: "Feb 22, 2024",
    time: "03:45 PM",
    title: "Dietary & Lifestyle Review",
    doctor: "Nurse Grace Obi",
    group: "Metro Wellness Clinic",
    description:
      "Reviewed low-glycemic meal planning and home blood glucose logbook. Encouraged regular physical activity.",
  },
  {
    id: 5,
    date: "Apr 05, 2024",
    time: "11:15 AM",
    title: "Quarterly Comprehensive Evaluation",
    doctor: "Dr. Alan Marcus, MD",
    group: "Metro Endocrine Specialists",
    description:
      "HbA1c stabilized at 6.7%. Renal function panels within normal limits. Maintain current treatment plan.",
  },
];

export function TreatmentAndHistorySection() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      <h3 className="text-lg font-bold text-[#0f172a]">
        Treatment & Encounter History
      </h3>

      {/* Scrollable Container with Optimized Custom Scrollbar */}
      <div className="max-h-[420px] overflow-y-auto pr-3 custom-scrollbar">
        {/* Timeline Container */}
        <div className="relative pl-2 space-y-8 py-2">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[112px] top-4 bottom-4 w-0.5 bg-slate-200" />

          {encounterData.map((item) => (
            <div key={item.id} className="relative flex items-start gap-6">
              {/* Date & Time Column */}
              <div className="w-24 pt-2 text-right shrink-0">
                <p className="text-xs font-bold text-[#0f172a]">{item.date}</p>
                <p className="text-[11px] font-medium text-slate-400">
                  {item.time}
                </p>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 shrink-0 mt-1 shadow-xs">
                <FileText className="w-4 h-4" />
              </div>

              {/* Content Card with Increased Blue Tint (~50% richer: bg-blue-50/90 and border-blue-200/80) */}
              <div className="flex-1 relative rounded-2xl bg-blue-50/90 hover:bg-blue-100/60   p-5 space-y-2 transition-colors shadow-2xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-blue-700 mt-0.5">
                      {item.doctor}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {item.group}
                    </p>
                  </div>
                  {item.badge && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 pt-1 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best-Practice Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}
