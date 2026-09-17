// components/patients_components/details/tabs/lab-result/PatientLabResultTab.tsx
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
import { PatientLabDetailModal } from "./PatientLabDetailModal";
import { OrderLabTestModal } from "./OrderLabTestModal";

interface LabResultItem {
  id: string;
  date: string;
  time: string;
  testName: string;
  result: string;
  referenceRange: string;
  units: string;
  flag: "High" | "Critical" | "Normal";
  recordedBy: string;
  status: "Completed" | "Pending" | "Draft";
  iconType: "document" | "pulse" | "layers";
}

const mockLabResults: LabResultItem[] = [
  {
    id: "1",
    date: "Oct 23, 2023",
    time: "02:15 PM",
    testName: "Glucose , Fasting",
    result: "165",
    referenceRange: "70-99",
    units: "mg/dl",
    flag: "High",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "document",
  },
  {
    id: "2",
    date: "Oct 22, 2023",
    time: "10:00 AM",
    testName: "Troponin I",
    result: "0.08",
    referenceRange: "<0.04",
    units: "ng/mL",
    flag: "Critical",
    recordedBy: "Dr. Michael Chen",
    status: "Completed",
    iconType: "pulse",
  },
  {
    id: "3",
    date: "Oct 21, 2023",
    time: "09:00 AM",
    testName: "White Blood Cell Count (WBC)",
    result: "7.2",
    referenceRange: "4.5-11.0",
    units: "K/uL",
    flag: "Normal",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "layers",
  },
  {
    id: "4",
    date: "Oct 21, 2023",
    time: "09:00 AM",
    testName: "Glucose , Fasting",
    result: "165",
    referenceRange: "70-99",
    units: "mg/dl",
    flag: "High",
    recordedBy: "Dr. Sarah Johnson",
    status: "Completed",
    iconType: "pulse",
  },
];

export function PatientLabResultTab() {
  // Set the 4th item expanded by default to match the reference screenshot
  const [expandedId, setExpandedId] = useState<string | null>("4");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenModal = (item: LabResultItem) => {
    setSelectedLab({
      testName: item.testName,
      category: item.iconType === "pulse" ? "Cardiology" : "Chemistry",
      orderedBy: item.recordedBy,
      labTechnician: "Adamu Bello, MLS",
      facility: "MedEHR Central Diagnostics Laboratory",
      dateCollected: `${item.date} ${item.time}`,
      result: item.result,
      units: item.units,
      referenceRange: `${item.referenceRange} ${item.units}`,
      flag:
        item.flag === "High"
          ? "HIGH FLAG"
          : item.flag === "Critical"
            ? "CRITICAL FLAG"
            : "NORMAL",
      scientistNotes: `Specimen collected. Result logged at ${item.result} ${item.units}. Status: ${item.status}. Reviewed by: ${item.recordedBy}.`,
      reviewedByLab: `${item.date} 10:15 AM`,
      acknowledgedByPhysician: "Pending",
    });
    setIsModalOpen(true);
  };

  const handleNewOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = (formData: any) => {
    console.log("New lab test order submitted:", formData);
    // Here you can handle adding the new order to your mock list or backend state
  };

  return (
    <div className="w-full bg-(--card) rounded-2xl p-6 shadow-xs border border-slate-100">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-[#2563EB] tracking-tight">
          Lab Report
        </h2>
        <button
          type="button"
          onClick={handleNewOrder}
          className="inline-flex items-center gap-1.5 w-[104px] h-[32px] px-3 py-2 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer justify-center"
        >
          <Plus className="h-3 w-3 font-bold" />
          <span>New Order</span>
        </button>
      </div>

      {/* Main Content Layout with Timeline & Cards */}
      <div className="relative pt-6">
        <div className="space-y-6">
          {mockLabResults.map((item, index) => {
            const isExpanded = expandedId === item.id;

            // First card background is bg-(--background), others are pure white with border/shadow
            const cardBgStyle =
              index === 0
                ? "bg-(--background) border border-slate-200/60"
                : "bg-(--background) border border-slate-200/80 shadow-2xs";

            // Flag badge colors
            let flagBadgeColor = "text-blue-600";
            if (item.flag === "High")
              flagBadgeColor = "text-amber-600 font-semibold";
            if (item.flag === "Critical")
              flagBadgeColor = "text-red-600 font-bold";
            if (item.flag === "Normal")
              flagBadgeColor = "text-emerald-600 font-medium";

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
                  {index < mockLabResults.length - 1 && (
                    <div className="absolute top-8 bottom-[-24px] w-[2px] bg-slate-200" />
                  )}
                </div>

                {/* Lab Report Card Content */}
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
                          Result:{" "}
                          <span className="font-semibold text-slate-900">
                            {item.result}
                          </span>{" "}
                          | Reference Range: {item.referenceRange} | Units:{" "}
                          {item.units} | Flag:{" "}
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
                              console.log("Downloading report for:", item.id);
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
      <PatientLabDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        labData={selectedLab}
      />

      {/* Order Lab Test Modal */}
      <OrderLabTestModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
