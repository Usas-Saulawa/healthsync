// components/patients_components/details/tabs/radiology/PatientRadiologyDetailModal.tsx
"use client";

import { useEffect, useState } from "react";
import { X, FileText } from "lucide-react";

interface RadiologyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagingData?: {
    studyType: string;
    modality: string;
    orderedBy: string;
    facility: string;
    radiologist: string;
    bodyPart: string;
    dateOrdered: string;
    dateCompleted: string;
    keyFinding: string;
    flag: string;
    clinicalCorrelation: string;
    radiologistNotes: string;
    impression: string;
    reviewedBy: string;
    acknowledgedBy: string;
  };
}

export function PatientRadiologyDetailModal({
  isOpen,
  onClose,
  imagingData,
}: RadiologyDetailModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const defaultData = {
    studyType: "Chest X-Ray PA/Lateral",
    modality: "Radiography",
    orderedBy: "Dr. Sarah Jenkins, MD",
    facility: "MedEHR Central Imaging Center",
    radiologist: "Dr. Aisha",
    bodyPart: "Chest",
    dateOrdered: "Oct 22, 2023",
    dateCompleted: "Oct 22, 2023 10:41 AM",
    keyFinding: "No Acute Findings",
    flag: "NORMAL",
    clinicalCorrelation: "Stable chronic cardiomegaly",
    radiologistNotes:
      "Lungs are clear without focal consolidation, pleural effusion, or new infiltrates. Cardiomegaly is chronic and stable compared to previous diagnostic exams. Pulmonary vascularity is within normal limits. No acute bony abnormality detected. - Reviewed by: Dr. Sarah Jenkins, MD",
    impression:
      "1. No acute cardiopulmonary disease. 2. Stable, chronic cardiomegaly.",
    reviewedBy: "Rad. Oct 22, 2023 10:15 AM",
    acknowledgedBy: "Pending",
  };

  const data = imagingData || defaultData;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Deepened dark backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`relative w-[560px] h-screen bg-(--card) shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderRadius: "6px 0 0 6px",
          boxShadow: "0px 10px 15px -3px #0000001A, 0px 4px 6px 0px #0000000D",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between w-[560px] h-[65px] px-6 py-5 border-b border-[#E5E7EB] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Imaging Study Detail
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body with Custom Scrollbar */}
        <div className="w-[560px] h-[800px] p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
          {/* Study Information Section */}
          <div className="w-[512px] h-[210px] bg-(--background) rounded-[8px] p-4 flex flex-col gap-3 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              STUDY INFORMATION
            </span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Study Type
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {data.studyType}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Modality
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.modality}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Ordered By
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.orderedBy}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Facility
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                  {data.facility}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Radiologist
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.radiologist}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Body Part
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.bodyPart}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Date Ordered
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.dateOrdered}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Date Completed
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.dateCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Key Finding Hero Box */}
          <div
            className="w-[512px] h-[129px] rounded-[8px] p-5 flex items-center justify-between shrink-0"
            style={{ backgroundColor: "#E1EFFE" }}
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-blue-700 uppercase">
                KEY FINDING
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
                {data.keyFinding}
              </h3>
              <span className="text-xs text-slate-600 mt-1 block">
                Clinical correlation: {data.clinicalCorrelation}
              </span>
            </div>
            {/* Flag Pill Hero Button */}
            <div
              className="flex items-center justify-center text-white font-bold text-[11px] tracking-wide shrink-0"
              style={{
                width: "82px",
                height: "27px",
                borderRadius: "20px",
                backgroundColor: "#1A56DB",
                paddingTop: "6px",
                paddingRight: "14px",
                paddingBottom: "6px",
                paddingLeft: "14px",
              }}
            >
              <span>{data.flag}</span>
            </div>
          </div>

          {/* Radiologist Notes / Clinical Findings */}
          <div className="w-[512px] h-[140px] bg-(--background) rounded-[8px] p-4 flex flex-col gap-2 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              RADIOLOGIST NOTES/ CLINICAL FINDINGS
            </span>
            <p className="text-[11px] text-slate-700 leading-relaxed overflow-y-auto custom-scrollbar">
              {data.radiologistNotes}
            </p>
          </div>

          {/* Impression Block with Accent Bar */}
          <div
            className="w-[512px] h-[100px] rounded-[8px] p-4 flex items-center gap-3 shrink-0"
            style={{
              backgroundColor: "#FFF7ED",
              border: "1px solid #FCD6A8",
            }}
          >
            {/* Accent Bar */}
            <div
              className="shrink-0"
              style={{
                width: "4px",
                height: "68px",
                borderRadius: "2px",
                backgroundColor: "#F97316",
              }}
            />
            {/* Impression Text Content */}
            <div className="flex flex-col gap-1 overflow-y-auto">
              <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
                IMPRESSION
              </span>
              <p className="text-xs font-medium text-slate-900 leading-snug">
                {data.impression}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="w-[560px] h-[96px] border-t border-[#E5E7EB] px-6 py-4 flex flex-col justify-between shrink-0 bg-(--card)">
          <div className="w-[512px] h-[16px] flex items-center justify-between text-[11px] text-slate-500">
            <span>Reviewed by: {data.reviewedBy}</span>
            <span>Acknowledged by Physician: {data.acknowledgedBy}</span>
          </div>

          <div className="w-[512px] h-[36px] flex items-center gap-2">
            <button
              type="button"
              onClick={() => console.log("Adding clinical note...")}
              className="flex-1 h-full bg-(--background) text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Add Clinical Note
            </button>
            <button
              type="button"
              onClick={() => console.log("Printing report...")}
              className="flex-1 h-full bg-(--background) text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Print Report
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Launching DICOM viewer...");
                onClose();
              }}
              className="flex-1 h-full bg-[#2563EB] text-white text-xs font-semibold rounded-[6px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Launch DICOM Viewer
            </button>
          </div>
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
