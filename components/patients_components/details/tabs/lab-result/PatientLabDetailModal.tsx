// components/patients_components/details/tabs/lab-result/PatientLabDetailModal.tsx
"use client";

import { useEffect, useState } from "react";
import { X, FileText, AlertTriangle, Download, Loader2 } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

interface LabDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  labData?: {
    testName: string;
    category: string;
    orderedBy: string;
    labTechnician: string;
    facility: string;
    dateCollected: string;
    result: string;
    units: string;
    referenceRange: string;
    flag: string;
    scientistNotes: string;
    reviewedByLab: string;
    acknowledgedByPhysician: string;
  };
}

// ----------------------------------------------------------------------
// React-PDF Styles Mapped to Modal Layout Dimensions & Colors
// ----------------------------------------------------------------------
const pdfStyles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalContainer: {
    flexDirection: "column",
    width: "100%",
  },
  // Modal Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 20,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIconBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  // Test Information Section
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#9CA3AF",
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItemHalf: {
    width: "50%",
    marginBottom: 12,
  },
  infoItemFull: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#1F2937",
  },
  valueBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  // Result Hero Box
  resultCard: {
    backgroundColor: "#FFEDD5",
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultCategoryText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#C2410C",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resultValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginTop: 4,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: "extrabold",
    color: "#111827",
  },
  resultUnit: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#374151",
  },
  referenceRangeText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
  flagBadge: {
    width: 94,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#EA580C",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  flagBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  // Clinical Notes Section
  notesCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  notesBody: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
  },
  // History Section
  historyContainer: {
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  historyDateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  historyLabelText: {
    fontSize: 11,
    color: "#9CA3AF",
    marginLeft: 8,
  },
  historyValueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  historyFlagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#FFEDD5",
    borderRadius: 4,
  },
  historyFlagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#C2410C",
  },
  // Modal Footer Info
  pdfFooter: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pdfFooterText: {
    fontSize: 11,
    color: "#6B7280",
  },
});

// ----------------------------------------------------------------------
// PDF Template Component (Exact Modal Layout Mirror)
// ----------------------------------------------------------------------
function LabPDFDocument({ data }: { data: any }) {
  const historyRecords = [
    {
      date: "Oct 23, 2023",
      label: "Today's Assay",
      value: "165 mg/dL",
      flag: "High",
    },
    {
      date: "Oct 10, 2023",
      label: "Previous Assay",
      value: "152 mg/dL",
      flag: "High",
    },
    {
      date: "Sep 28, 2023",
      label: "Baseline Assay",
      value: "148 mg/dL",
      flag: "High",
    },
  ];

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.modalContainer}>
          {/* Modal Header */}
          <View style={pdfStyles.headerRow}>
            <View style={pdfStyles.headerTitleContainer}>
              <View style={pdfStyles.headerIconBox}>
                <Text
                  style={{ fontSize: 10, color: "#2563EB", fontWeight: "bold" }}
                >
                  📄
                </Text>
              </View>
              <Text style={pdfStyles.headerTitleText}>Lab Result Detail</Text>
            </View>
            <Text style={{ fontSize: 12, color: "#9CA3AF" }}>✕</Text>
          </View>

          {/* Test Information Section */}
          <Text style={pdfStyles.sectionTitle}>TEST INFORMATION</Text>
          <View style={pdfStyles.infoCard}>
            <View style={pdfStyles.infoGrid}>
              <View style={pdfStyles.infoItemHalf}>
                <Text style={pdfStyles.label}>Test Name</Text>
                <Text style={pdfStyles.valueBold}>{data.testName}</Text>
              </View>
              <View style={pdfStyles.infoItemHalf}>
                <Text style={pdfStyles.label}>Category</Text>
                <Text style={pdfStyles.value}>{data.category}</Text>
              </View>
              <View style={pdfStyles.infoItemHalf}>
                <Text style={pdfStyles.label}>Ordered By</Text>
                <Text style={pdfStyles.value}>{data.orderedBy}</Text>
              </View>
              <View style={pdfStyles.infoItemHalf}>
                <Text style={pdfStyles.label}>Lab Technician</Text>
                <Text style={pdfStyles.value}>{data.labTechnician}</Text>
              </View>
              <View style={pdfStyles.infoItemFull}>
                <Text style={pdfStyles.label}>Facility</Text>
                <Text style={pdfStyles.value}>{data.facility}</Text>
              </View>
              <View style={pdfStyles.infoItemFull}>
                <Text style={pdfStyles.label}>Date Collected</Text>
                <Text style={pdfStyles.value}>{data.dateCollected}</Text>
              </View>
            </View>
          </View>

          {/* Result Hero Box */}
          <View style={pdfStyles.resultCard}>
            <View>
              <Text style={pdfStyles.resultCategoryText}>ASSAY RESULT</Text>
              <View style={pdfStyles.resultValueContainer}>
                <Text style={pdfStyles.resultValue}>{data.result}</Text>
                <Text style={pdfStyles.resultUnit}>{data.units}</Text>
              </View>
              <Text style={pdfStyles.referenceRangeText}>
                Reference Range: {data.referenceRange}
              </Text>
            </View>
            <View style={pdfStyles.flagBadge}>
              <Text style={pdfStyles.flagBadgeText}>⚠️ HIGH</Text>
            </View>
          </View>

          {/* Clinical Notes */}
          <Text style={pdfStyles.sectionTitle}>LAB SCIENTIST NOTES</Text>
          <View style={pdfStyles.notesCard}>
            <Text style={pdfStyles.notesBody}>{data.scientistNotes}</Text>
          </View>

          {/* History Section */}
          <View style={pdfStyles.historyContainer}>
            <Text style={pdfStyles.sectionTitle}>
              FASTING GLUCOSE HISTORICAL TREND (LAST 3 ASSAYS)
            </Text>
            <View style={pdfStyles.historyCard}>
              {historyRecords.map((record, idx) => (
                <View
                  key={idx}
                  style={[
                    pdfStyles.historyRow,
                    idx === historyRecords.length - 1
                      ? { borderBottomWidth: 0 }
                      : {},
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={pdfStyles.historyDateText}>{record.date}</Text>
                    <Text style={pdfStyles.historyLabelText}>
                      {record.label}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Text style={pdfStyles.historyValueText}>
                      {record.value}
                    </Text>
                    <View style={pdfStyles.historyFlagBadge}>
                      <Text style={pdfStyles.historyFlagText}>
                        {record.flag}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Modal Footer Metadata */}
        <View style={pdfStyles.pdfFooter}>
          <Text style={pdfStyles.pdfFooterText}>
            Reviewed by Lab: {data.reviewedByLab}
          </Text>
          <Text style={pdfStyles.pdfFooterText}>
            Acknowledged by Physician: {data.acknowledgedByPhysician}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// ----------------------------------------------------------------------
// Main Modal Component
// ----------------------------------------------------------------------
export function PatientLabDetailModal({
  isOpen,
  onClose,
  labData,
}: LabDetailModalProps) {
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
    testName: "Glucose, Fasting",
    category: "Chemistry",
    orderedBy: "Dr. Sarah Jenkins, MD",
    labTechnician: "Adamu Bello, MLS",
    facility: "MedEHR Central Diagnostics Laboratory",
    dateCollected: "Oct 23, 2023 09:30 AM",
    result: "165",
    units: "mg/dL",
    referenceRange: "70 - 99 mg/dL",
    flag: "HIGH FLAG",
    scientistNotes:
      "Specimen collected fasting. Glucose level significantly elevated at 165 mg/dL. Recommend correlation with HbA1c levels. Sample quality: Good. No hemolysis or lipemia observed.\nReviewed by: Adamu Bello, MLS",
    reviewedByLab: "Oct 23, 2023 10:15 AM",
    acknowledgedByPhysician: "Pending",
  };

  const data = labData || defaultData;

  const historyRecords = [
    {
      date: "Oct 23, 2023",
      label: "Today's Assay",
      value: "165 mg/dL",
      flag: "High",
    },
    {
      date: "Oct 10, 2023",
      label: "Previous Assay",
      value: "152 mg/dL",
      flag: "High",
    },
    {
      date: "Sep 28, 2023",
      label: "Baseline Assay",
      value: "148 mg/dL",
      flag: "High",
    },
  ];

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
        className={`relative w-[560px] h-screen bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
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
              Lab Result Detail
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
          {/* Test Information Section */}
          <div className="w-[512px] h-[262px] bg-app-bg rounded-[8px] p-4 flex flex-col gap-3 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              TEST INFORMATION
            </span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Test Name
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {data.testName}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">
                  Category
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.category}
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
                  Lab Technician
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.labTechnician}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">
                  Facility
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                  {data.facility}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">
                  Date Collected
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {data.dateCollected}
                </span>
              </div>
            </div>
          </div>

          {/* Result Hero Box */}
          <div
            className="w-[512px] h-[129px] rounded-[8px] p-5 flex items-center justify-between shrink-0"
            style={{ backgroundColor: "#FFEDD5" }}
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-orange-700 uppercase">
                ASSAY RESULT
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {data.result}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {data.units}
                </span>
              </div>
              <span className="text-xs text-slate-600 mt-1 block">
                Reference Range: {data.referenceRange}
              </span>
            </div>
            {/* High Flag Badge */}
            <div
              className="flex items-center justify-center gap-1.5 text-white font-bold text-[11px] tracking-wide shrink-0"
              style={{
                width: "94px",
                height: "28px",
                borderRadius: "20px",
                backgroundColor: "#EA580C",
                paddingTop: "6px",
                paddingRight: "14px",
                paddingBottom: "6px",
                paddingLeft: "14px",
              }}
            >
              <AlertTriangle className="h-3 w-3" />
              <span>HIGH</span>
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="w-[512px] h-[136px] bg-app-bg rounded-[8px] p-4 flex flex-col gap-2 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              LAB SCIENTIST NOTES
            </span>
            <p className="text-[11px] text-slate-700 leading-relaxed overflow-hidden">
              {data.scientistNotes}
            </p>
          </div>

          {/* History Section */}
          <div className="w-[512px] h-[165px] flex flex-col gap-2 shrink-0">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              FASTING GLUCOSE HISTORICAL TREND (LAST 3 ASSAYS)
            </span>
            <div className="w-[512px] h-[141px] bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden flex flex-col justify-between">
              {historyRecords.map((record, idx) => (
                <div
                  key={idx}
                  className="w-[512px] h-[47px] px-3 flex items-center justify-between text-xs"
                  style={{
                    borderBottom:
                      idx < historyRecords.length - 1
                        ? "1px solid #E5E7EB"
                        : "none",
                  }}
                >
                  <div>
                    <span className="font-bold text-slate-900">
                      {record.date}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2">
                      {record.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">
                      {record.value}
                    </span>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded">
                      {record.flag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="w-[560px] h-[96px] border-t border-[#E5E7EB] px-6 py-4 flex flex-col justify-between shrink-0 bg-white">
          <div className="w-[512px] h-[16px] flex items-center justify-between text-[11px] text-slate-500">
            <span>Reviewed by Lab: {data.reviewedByLab}</span>
            <span>
              Acknowledged by Physician: {data.acknowledgedByPhysician}
            </span>
          </div>

          <div className="w-[512px] h-[36px] flex items-center gap-2">
            <button
              type="button"
              onClick={() => console.log("Adding clinical note...")}
              className="flex-1 h-full bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Add Clinical Note
            </button>

            {/* Print Result connected to PDFDownloadLink */}
            <PDFDownloadLink
              document={<LabPDFDocument data={data} />}
              fileName={`Lab_Report_${data.testName.replace(/\s+/g, "_")}.pdf`}
              className="flex-1 h-full"
            >
              {({ loading }) => (
                <button
                  type="button"
                  disabled={loading}
                  className="w-full h-full inline-flex items-center justify-center gap-1.5 bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-500" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5 text-slate-500" />
                      Print Result
                    </>
                  )}
                </button>
              )}
            </PDFDownloadLink>

            <button
              type="button"
              onClick={() => {
                console.log("Acknowledging result...");
                onClose();
              }}
              className="flex-1 h-full bg-[#2563EB] text-white text-xs font-semibold rounded-[6px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Acknowledge Result
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
