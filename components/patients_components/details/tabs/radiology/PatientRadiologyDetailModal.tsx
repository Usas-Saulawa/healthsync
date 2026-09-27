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
        className={`relative w-140 h-screen bg-(--card) shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          borderRadius: "6px 0 0 6px",
          boxShadow: "0px 10px 15px -3px #0000001A, 0px 4px 6px 0px #0000000D",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between w-140 h-16.25 px-6 py-5 border-b border-(--border) shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-(--info-icon-bg) text-(--info-title) flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold ">Imaging Study Detail</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-(--shade-text) hover:text-(--shade-text) transition-colors cursor-pointer p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body with Custom Scrollbar */}
        <div className="w-140 h-200 p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
          {/* Study Information Section */}
          <div className="w-lg h-52.5 bg-(--background) rounded-md p-4 flex flex-col gap-3 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-(--shade-text) uppercase">
              STUDY INFORMATION
            </span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Study Type
                </span>
                <span className="font-bold  mt-0.5 block">
                  {data.studyType}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Modality
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.modality}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Ordered By
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.orderedBy}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Facility
                </span>
                <span className="font-semibold  mt-0.5 block truncate">
                  {data.facility}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Radiologist
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.radiologist}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Body Part
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.bodyPart}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Date Ordered
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.dateOrdered}
                </span>
              </div>
              <div>
                <span className="text-(--shade-text) block text-[11px]">
                  Date Completed
                </span>
                <span className="font-semibold  mt-0.5 block">
                  {data.dateCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Key Finding Hero Box */}
          <div
            className="w-lg h-32.25 rounded-md p-5 flex items-center justify-between shrink-0"
            style={{ backgroundColor: "var(--info-card)" }}
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-(--primary) uppercase">
                KEY FINDING
              </span>
              <h3 className="text-2xl font-extrabold  mt-1 tracking-tight">
                {data.keyFinding}
              </h3>
              <span className="text-xs text-(--shade-text) mt-1 block">
                Clinical correlation: {data.clinicalCorrelation}
              </span>
            </div>
            {/* Flag Pill Hero Button */}
            <div
              className="flex items-center justify-center text-(--button-text) font-bold text-[11px] tracking-wide shrink-0"
              style={{
                width: "82px",
                height: "27px",
                borderRadius: "20px",
                backgroundColor: "var(--button)",
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
          <div className="w-lg h-35 bg-(--background) rounded-md p-4 flex flex-col gap-2 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-(--shade-text) uppercase">
              RADIOLOGIST NOTES/ CLINICAL FINDINGS
            </span>
            <p className="text-[11px]  leading-relaxed overflow-y-auto custom-scrollbar">
              {data.radiologistNotes}
            </p>
          </div>

          {/* Impression Block with Accent Bar */}
          <div
            className="w-lg h-25 rounded-md p-4 flex items-center gap-3 shrink-0"
            style={{
              backgroundColor: "var(--warning-card)",
            }}
          >
            {/* Accent Bar */}
            <div
              className="shrink-0"
              style={{
                width: "4px",
                height: "68px",
                borderRadius: "2px",
                backgroundColor: "var(--warning-title)",
              }}
            />
            {/* Impression Text Content */}
            <div className="flex flex-col gap-1 overflow-y-auto">
              <span className="text-[10px] font-bold tracking-wider text-(--warning-title) uppercase">
                IMPRESSION
              </span>
              <p className="text-xs font-medium  leading-snug">
                {data.impression}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="w-140 h-24 border-t border-(--border) px-6 py-4 flex flex-col justify-between shrink-0 bg-(--card)">
          <div className="w-lg h-4 flex items-center justify-between text-[11px] text-(--shade-text)">
            <span>Reviewed by: {data.reviewedBy}</span>
            <span>Acknowledged by Physician: {data.acknowledgedBy}</span>
          </div>

          <div className="w-lg h-9 flex items-center gap-2">
            <button
              type="button"
              onClick={() => console.log("Adding clinical note...")}
              className="flex-1 h-full bg-(--background)  text-xs font-semibold rounded-md hover:bg-(--card-hover) transition-colors cursor-pointer"
            >
              Add Clinical Note
            </button>
            <button
              type="button"
              onClick={() => console.log("Printing report...")}
              className="flex-1 h-full bg-(--background)  text-xs font-semibold rounded-md hover:bg-(--card-hover) transition-colors cursor-pointer"
            >
              Print Report
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Launching DICOM viewer...");
                onClose();
              }}
              className="flex-1 h-full bg-(--button) text-(--button-text) text-xs font-semibold rounded-md hover:bg-(--primary) transition-colors cursor-pointer shadow-xs"
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
