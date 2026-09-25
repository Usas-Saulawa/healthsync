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
import { OrderRadiologyModal } from "./OrderRadiologyModal";

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
    <div className="w-full bg-(--card) rounded-lg p-5 ">
      {/* Header Row */}
      <div className="flex items-center justify-between ">
        <h2 className="text-lg font-bold tracking-tight">
          Radiology / Imaging
        </h2>
        <button
          type="button"
          onClick={handleNewOrder}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-(--button) text-(--button-text) text-xs font-bold rounded-md transition-colors shadow-xs cursor-pointer justify-center"
        >
          <Plus className="h-3.5 w-3.5 font-bold" />
          <span>New Order</span>
        </button>
      </div>

      {/* Main Content Layout with Timeline & Cards */}
      <div className="relative pt-5">
        <div className="space-y-3">
          {mockRadiologyResults.map((item, index) => {
            const isExpanded = expandedId === item.id;

            // Card background styling
            const cardBgStyle =
              index === 0 ? "bg-(--info-card)" : "bg-(--background)";

            // Flag badge colors
            let flagBadgeColor = "text-(info-title)";
            if (item.flag === "Abnormal")
              flagBadgeColor = "text-(--warning-text) font-semibold";
            if (item.flag === "Critical")
              flagBadgeColor = "text-(--danger-title) font-bold";

            // Timeline icon node styling
            let timelineIconBg = "bg-(--info-card) text-(--info-title)";
            if (item.iconType === "pulse")
              timelineIconBg =
                "bg-(--lab-timeline-bg) text-(--lab-timeline-text)";
            if (item.iconType === "layers")
              timelineIconBg = timelineIconBg =
                "bg-(--warning-card) text-(--warning-title)";

            return (
              <div key={item.id} className="relative flex items-stretch gap-6">
                {/* Timeline Column */}
                <div className="pt-3 shrink-0 text-right">
                  <div className="text-xs font-bold ">{item.date}</div>
                  <div className="text-[11px] text-(--shade-text) mt-0.5">
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
                    <div className="absolute top-8 -bottom-6 w-0.5 h-full bg-(--border)" />
                  )}
                </div>

                {/* Radiology Report Card Content */}
                <div className="grow">
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className={`w-full rounded-lg p-4 transition-all cursor-pointer ${cardBgStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold ">{item.testName}</h3>
                        <p className="text-xs text-(--shade) mt-1">
                          Body Part:{" "}
                          <span className="font-semibold ">
                            {item.bodyPart}
                          </span>{" "}
                          | Impression: {item.impression} | Flag:{" "}
                          <span className={flagBadgeColor}>{item.flag}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-(--shade-text) hover:text-(--shade) transition-colors p-1"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-(--shade)" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-(--shade-text)" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Dropdown Details Area */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-(--border) space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block text-(--shade-text)">
                              Recorded by
                            </span>
                            <span className="font-semibold  mt-0.5 block">
                              {item.recordedBy}
                            </span>
                          </div>
                          <div>
                            <span className="block text-(--shade-text)">
                              Status
                            </span>
                            <span className="font-semibold text-(--lab-timeline-text) mt-0.5 block">
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
                            className="px-4 py-2 bg-(--lab-timeline-bg) text-(--lab-timeline-text) text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Downloading imaging for:", item.id);
                            }}
                            className="px-4 py-2 bg-(--card-hover)  text-xs font-semibold rounded-sm transition-colors cursor-pointer"
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

      {/* New Imaging Order Modal */}
      <OrderRadiologyModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
