// components/patients_components/details/tabs/vitals/PatientVitalDetailDrawer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2 } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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
}

// ----------------------------------------------------------------------
// React-PDF Document Styles (Corrected Header Layout)
// ----------------------------------------------------------------------
const pdfStyles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 15,
  },
  patientInfoContainer: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    width: "100%",
  },
  leftColumn: {
    width: 65,
    alignItems: "center",
    gap: 6,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FDE68A",
    overflow: "hidden",
  },
  avatarImage: {
    width: 52,
    height: 52,
    objectFit: "cover",
  },
  badge: {
    backgroundColor: "#2167F3",
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    textAlign: "center",
  },
  rightColumn: {
    flex: 1,
    flexDirection: "column",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 3,
  },
  patientMeta: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 3,
  },
  patientSubMeta: {
    fontSize: 8,
    color: "#9CA3AF",
    lineHeight: 1.3,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
    borderBottomColor: "#DCDEE0",
    marginVertical: 12,
  },
  vitalsCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
  },
  vitalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  vitalRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    fontSize: 9,
    color: "#9CA3AF",
  },
  value: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
  },
  notesSection: {
    marginTop: 15,
  },
  notesTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  notesBody: {
    fontSize: 9,
    color: "#4B5563",
    lineHeight: 1.4,
  },
});

// ----------------------------------------------------------------------
// PDF Template Component
// ----------------------------------------------------------------------
function VitalsPDFDocument({ vital }: { vital: VitalsLogRow }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header Section with Profile Avatar & Badge */}
        <View style={pdfStyles.headerRow}>
          <View style={pdfStyles.patientInfoContainer}>
            {/* Left Column: Avatar & Badge */}
            <View style={pdfStyles.leftColumn}>
              <View style={pdfStyles.avatarContainer}>
                <Image
                  src="/images/profile.jpeg"
                  style={pdfStyles.avatarImage}
                />
              </View>
              <Text style={pdfStyles.badge}>In-Patient</Text>
            </View>

            {/* Right Column: Text Details */}
            <View style={pdfStyles.rightColumn}>
              <Text style={pdfStyles.patientName}>Bashir Musa</Text>
              <Text style={pdfStyles.patientMeta}>
                Male, 10/11/1995 • {vital.timeOnly} • {vital.dateOnly}
              </Text>
              <Text style={pdfStyles.patientSubMeta}>
                Cardiology A - Bed 12 • Nurse Sarah Jenkins • Hospital: Medical
                Centre
              </Text>
            </View>
          </View>
        </View>

        <View style={pdfStyles.dashedLine} />

        {/* Vitals Data Container */}
        <View style={pdfStyles.vitalsCard}>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>References Number</Text>
            <Text style={pdfStyles.value}>{vital.referenceNumber}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>Date</Text>
            <Text style={pdfStyles.value}>{vital.dateOnly}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>Time</Text>
            <Text style={pdfStyles.value}>{vital.timeOnly}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>BP (mmHg)</Text>
            <Text style={pdfStyles.value}>{vital.bp}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>HR (bpm)</Text>
            <Text style={pdfStyles.value}>{vital.hr}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>Temp (°F)</Text>
            <Text style={pdfStyles.value}>{vital.temp}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>SpO2</Text>
            <Text style={pdfStyles.value}>{vital.spo2}</Text>
          </View>
          <View style={pdfStyles.vitalRow}>
            <Text style={pdfStyles.label}>RR (bpm)</Text>
            <Text style={pdfStyles.value}>{vital.rr}</Text>
          </View>
          <View style={pdfStyles.vitalRowLast}>
            <Text style={pdfStyles.label}>Weight (lbs)</Text>
            <Text style={pdfStyles.value}>{vital.weight}</Text>
          </View>
        </View>

        {/* Nurses Notes Section */}
        <View style={pdfStyles.notesSection}>
          <View style={pdfStyles.dashedLine} />
          <Text style={pdfStyles.notesTitle}>NURSES NOTES</Text>
          <Text style={pdfStyles.notesBody}>{vital.nursesNotes}</Text>
        </View>
      </Page>
    </Document>
  );
}

// ----------------------------------------------------------------------
// Main Drawer Component
// ----------------------------------------------------------------------
export function PatientVitalDetailDrawer({
  isOpen,
  onClose,
  vital,
}: PatientVitalDetailDrawerProps) {
  if (!vital) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Slide-over Content Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-[608px] h-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto"
          >
            {/* UI Content Wrapper */}
            <div className="bg-white flex flex-col flex-1">
              {/* Details Header */}
              <div className="px-9 pt-[45px] pb-4 flex items-start justify-between min-h-[126px]">
                <div className="flex items-start gap-3.5">
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

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dashed Border Separator */}
              <div className="mx-[38px] my-2 border-t border-dashed border-[#DCDEE0]" />

              {/* Inner Drawer Details Container */}
              <div className="mx-[36px] mt-4 w-[535px] bg-slate-50 rounded-[17px] p-[21px] shadow-2xs">
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
                    <span className="text-slate-400 font-normal">
                      BP (mmHg)
                    </span>
                    <span className="font-bold text-slate-900">{vital.bp}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-400 font-normal">HR (bpm)</span>
                    <span className="font-semibold text-slate-900">
                      {vital.hr}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60">
                    <span className="text-slate-400 font-normal">
                      Temp (°F)
                    </span>
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

              {/* Nurses Notes Section */}
              <div className="mx-[36px] my-6 space-y-6">
                <div className="border-t border-dashed border-[#DCDEE0]" />

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-900 tracking-wider">
                    NURSES NOTES
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {vital.nursesNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom PDF Export Action Button via React-PDF */}
            <div className="mx-[36px] mb-6">
              <PDFDownloadLink
                document={<VitalsPDFDocument vital={vital} />}
                fileName={`Vitals_Report_${vital.referenceNumber}.pdf`}
                className="w-full"
              >
                {({ loading }) => (
                  <button
                    type="button"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 bg-white text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 text-slate-500 animate-spin" />
                        Preparing PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 text-slate-500" />
                        Get PDF Vitals
                      </>
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
