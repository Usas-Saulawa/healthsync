// components/patients_components/details/tabs/radiology/PatientRadiologyTab.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PatientRadiologyDetailModal } from "./PatientRadiologyDetailModal";

interface RadiologyItem {
  id: string;
  date: string;
  time: string;
  testName: string;
  bodyPart: string;
  impression: string;
  flag: "Normal" | "Abnormal" | "Critical";
  recordedBy: string;
  status: "Completed" | "Pending" | "Draft";
  iconType: "document" | "pulse" | "layers";
}

const mockRadiologyResults: RadiologyItem[] = [
  {
    id: "1",
    date: "Oct 23, 2023",
    time: "02:15 PM",
    testName: "Chest X-Ray PA/Lat",
    bodyPart: "Chest",
    impression: "No acute cardiopulmonary disease.",
    flag: "Normal",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "document",
  },
  {
    id: "2",
    date: "Oct 22, 2023",
    time: "10:00 AM",
    testName: "Chest X-Ray PA/Lat",
    bodyPart: "Chest",
    impression: "No acute cardiopulmonary disease.",
    flag: "Normal",
    recordedBy: "Dr. Michael Chen",
    status: "Completed",
    iconType: "pulse",
  },
  {
    id: "3",
    date: "Oct 21, 2023",
    time: "09:00 AM",
    testName: "Chest X-Ray PA/Lat",
    bodyPart: "Chest",
    impression: "No acute cardiopulmonary disease.",
    flag: "Normal",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "layers",
  },
  {
    id: "4",
    date: "Oct 21, 2023",
    time: "09:00 AM",
    testName: "Chest X-Ray PA/Lat",
    bodyPart: "Chest",
    impression: "No acute cardiopulmonary disease.",
    flag: "Normal",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "pulse",
  },
];

export function PatientRadiologyTab() {
  // Set the 4th item expanded by default to match the reference screenshot
  const [expandedId, setExpandedId] = useState<string | null>("4");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedImaging, setSelectedImaging] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenModal = (item: RadiologyItem) => {
    // Map tab item fields to the structured format expected by PatientRadiologyDetailModal
    setSelectedImaging({
      studyType: item.testName,
      modality: "Radiography",
      orderedBy: item.recordedBy,
      facility: "MedEHR Central Imaging Center",
      radiologist: "Dr. Aisha",
      bodyPart: item.bodyPart,
      dateOrdered: item.date,
      dateCompleted: `${item.date} ${item.time}`,
      keyFinding:
        item.flag === "Normal"
          ? "No Acute Findings"
          : "Abnormal Findings Noted",
      flag: item.flag.toUpperCase(),
      clinicalCorrelation: `Clinical correlation: Stable scan status for ID #${item.id}`,
      radiologistNotes: `Lungs are clear without focal consolidation, pleural effusion, or new infiltrates. Examination performed on ${item.date} at ${item.time}. Status: ${item.status}. - Reviewed by: ${item.recordedBy}`,
      impression: `1. ${item.impression}`,
      reviewedBy: `Rad. ${item.date} 10:15 AM`,
      acknowledgedBy: "Pending",
    });
    setIsModalOpen(true);
  };

  const handleNewOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = (formData: any) => {
    console.log("New radiology imaging order submitted:", formData);
  };

  return (
    <div className="w-full bg-white rounded-[8px] p-6 shadow-xs ">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-6 ">
        <h2 className="text-lg font-bold text-[#2563EB] tracking-tight">
          Radiology/Imaging
        </h2>
        <button
          type="button"
          onClick={handleNewOrder}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer justify-center"
        >
          <Plus className="h-3.5 w-3.5 font-bold" />
          <span>New Order</span>
        </button>
      </div>

      {/* Main Content Layout with Timeline & Cards */}
      <div className="relative pt-6">
        <div className="space-y-6">
          {mockRadiologyResults.map((item, index) => {
            const isExpanded = expandedId === item.id;

            // Card background styling
            const cardBgStyle =
              index === 0
                ? "bg-app-bg border border-slate-200/60"
                : "bg-app-bg border border-slate-200/80 shadow-2xs";

            // Flag badge colors
            let flagBadgeColor = "text-blue-600 font-bold";
            if (item.flag === "Abnormal")
              flagBadgeColor = "text-amber-600 font-bold";
            if (item.flag === "Critical")
              flagBadgeColor = "text-red-600 font-bold";

            // Timeline icon node styling
            let timelineIconBg =
              "bg-blue-50 text-blue-600 border border-blue-100";
            if (item.iconType === "pulse")
              timelineIconBg =
                "bg-emerald-50 text-emerald-600 border border-emerald-100";
            if (item.iconType === "layers")
              timelineIconBg =
                "bg-amber-50 text-amber-600 border border-amber-100";

            return (
              <div key={item.id} className="relative flex items-start gap-6">
                {/* Timeline Column */}
                <div className="w-32 pt-3 flex-shrink-0 text-right">
                  <div className="text-xs font-bold text-slate-900">
                    {item.date}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.time}
                  </div>
                </div>

                {/* Timeline Center Indicator Node & Connecting Line */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-2xs ${timelineIconBg}`}
                  >
                    {item.iconType === "document" && (
                      <FileText className="h-4 w-4" />
                    )}
                    {item.iconType === "pulse" && (
                      <Activity className="h-4 w-4" />
                    )}
                    {item.iconType === "layers" && (
                      <Layers className="h-4 w-4" />
                    )}
                  </div>
                  {index < mockRadiologyResults.length - 1 && (
                    <div className="absolute top-8 bottom-[-24px] w-[2px] bg-slate-200" />
                  )}
                </div>

                {/* Radiology Report Card Content */}
                <div className="flex-grow">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className={`w-full rounded-lg p-4 transition-all cursor-pointer ${cardBgStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {item.testName}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          Body Part:{" "}
                          <span className="font-semibold text-slate-900">
                            {item.bodyPart}
                          </span>{" "}
                          | Impression: {item.impression} | Flag:{" "}
                          <span className={flagBadgeColor}>{item.flag}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Dropdown Details Area */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block text-slate-400">
                              Recorded by
                            </span>
                            <span className="font-semibold text-slate-800 mt-0.5 block">
                              {item.recordedBy}
                            </span>
                          </div>
                          <div>
                            <span className="block text-slate-400">Status</span>
                            <span className="font-semibold text-emerald-600 mt-0.5 block">
                              {item.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(item);
                            }}
                            className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-[6px] hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Downloading imaging for:", item.id);
                            }}
                            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-in Detail Drawer Modal */}
      <PatientRadiologyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imagingData={selectedImaging}
      />
    </div>
  );
}
