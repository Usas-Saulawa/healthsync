// components/patients_components/details/tabs/vitals/PatientVitalDetailDrawer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

export interface VitalsLogRow {
  id: string;
  dateTime: string;
  dateOnly: string;
  timeOnly: string;
  referenceNumber: string;
  bp: string;
  hr: number;
  temp: string;
  spo2: string;
  rr: number;
  weight: string;
  nursesNotes: string;
}

interface PatientVitalDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vital: VitalsLogRow | null;
  onExportPDF?: () => void;
}

export function PatientVitalDetailDrawer({
  isOpen,
  onClose,
  vital,
  onExportPDF,
}: PatientVitalDetailDrawerProps) {
  if (!vital) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Solid Black Transparent Background (No Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Slide-over Content Drawer matching Figma width [608px] */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[608px] h-full bg-(--card) shadow-2xl flex flex-col z-10 overflow-y-auto"
          >
            {/* Details Header (height: 126px, top offset: 45px) */}
            <div className="px-9 pt-[45px] pb-4 flex items-start justify-between min-h-[126px]">
              <div className="flex items-start gap-3.5">
                {/* Patient Avatar & In-Patient Badge */}
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

                {/* Patient Meta Details */}
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#111827] tracking-tight">
                    Bashir Musa
                  </h4>
                  <p className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-1.5">
                    <span>Male, 10/11/1995</span>
                    <span>&bull;</span>
                    <span className="text-slate-800 font-semibold">
                      {vital.timeOnly}
                    </span>
                    <span>&bull;</span>
                    <span className="text-slate-800 font-semibold">
                      {vital.dateOnly}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Cardiology A - Bed 12 &bull; Nurse Sarah Jenkins &bull;
                    Hospital: Medical Centre
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Dashed Border Separator */}
            <div className="mx-[38px] my-2 border-t border-dashed border-[#DCDEE0]" />

            {/* Inner Drawer Details Container (Dynamic Height) */}
            <div className="mx-[36px] mt-4 w-[535px] bg-(--background) rounded-[17px] p-[21px] shadow-2xs">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">
                    References Number
                  </span>
                  <span className="font-semibold text-slate-900">
                    {vital.referenceNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">Date</span>
                  <span className="font-semibold text-slate-900">
                    {vital.dateOnly}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">Time</span>
                  <span className="font-semibold text-slate-900">
                    {vital.timeOnly}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">BP (mmHg)</span>
                  <span className="font-bold text-slate-900">{vital.bp}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">HR (bpm)</span>
                  <span className="font-semibold text-slate-900">
                    {vital.hr}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">Temp (°F)</span>
                  <span className="font-semibold text-slate-900">
                    {vital.temp}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">SpO2</span>
                  <span className="font-semibold text-slate-900">
                    {vital.spo2}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                  <span className="text-slate-400 font-normal">RR (bpm)</span>
                  <span className="font-semibold text-slate-900">
                    {vital.rr}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-400 font-normal">
                    Weight (lbs)
                  </span>
                  <span className="font-semibold text-slate-900">
                    {vital.weight}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Content: Nurses Notes & Custom PDF Button */}
            <div className="mx-[36px] my-6 space-y-6">
              {/* Dashed Border Separator */}
              <div className="border-t border-dashed border-[#DCDEE0]" />

              {/* Nurses Notes Section */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-900 tracking-wider">
                  NURSES NOTES
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {vital.nursesNotes}
                </p>
              </div>

              {/* PDF Export Action Button */}
              <button
                type="button"
                onClick={onExportPDF}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 bg-(--card) text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="h-4 w-4 text-slate-500" />
                Get PDF Vitals
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
