// components/patients_components/details/tabs/vitals/PatientHistoricalVitalsLog.tsx
"use client";

import { useState } from "react";
import { ArrowUpDown, Download } from "lucide-react";
import {
  PatientVitalDetailDrawer,
  VitalsLogRow,
} from "./PatientVitalDetailDrawer";

const mockHistoricalVitalsData: VitalsLogRow[] = [
  {
    id: "1",
    dateTime: "Oct 23, 2:15 PM",
    dateOnly: "Oct 23, 2023",
    timeOnly: "02:15 PM",
    referenceNumber: "000085752257",
    bp: "128/82",
    hr: 72,
    temp: "98.6 °F",
    spo2: "98%",
    rr: 16,
    weight: "182.0 lbs",
    nursesNotes: "Patient hemodynamically stable. Discharge evaluation.",
  },
  {
    id: "2",
    dateTime: "Oct 22, 10:00 AM",
    dateOnly: "Oct 22, 2023",
    timeOnly: "10:00 AM",
    referenceNumber: "000085752258",
    bp: "130/84",
    hr: 75,
    temp: "98.4 °F",
    spo2: "97%",
    rr: 18,
    weight: "182.5 lbs",
    nursesNotes: "Post-infusion monitoring. Vitals stable.",
  },
  {
    id: "3",
    dateTime: "Oct 21, 9:00 AM",
    dateOnly: "Oct 21, 2023",
    timeOnly: "09:00 AM",
    referenceNumber: "000085752259",
    bp: "138/88",
    hr: 80,
    temp: "99.1 °F",
    spo2: "96%",
    rr: 18,
    weight: "183.1 lbs",
    nursesNotes: "Coreg increased due to elevated BP targets.",
  },
  {
    id: "4",
    dateTime: "Oct 20, 4:30 PM",
    dateOnly: "Oct 20, 2023",
    timeOnly: "04:30 PM",
    referenceNumber: "000085752260",
    bp: "142/90",
    hr: 85,
    temp: "98.9 °F",
    spo2: "95%",
    rr: 20,
    weight: "183.0 lbs",
    nursesNotes: "Initial admission baseline check.",
  },
];

export function PatientHistoricalVitalsLog() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedVital, setSelectedVital] = useState<VitalsLogRow | null>(null);

  // Toggle sorting order by date/time
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedVitalsData = [...mockHistoricalVitalsData].sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime();
    const dateB = new Date(b.dateTime).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const handleExportCSV = () => {
    console.log("Exporting historical vitals to CSV...");
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF vitals record...");
  };

  return (
    <>
      <div className="bg-white rounded-[16px] border border-slate-200/80 shadow-xs p-6 space-y-6">
        {/* Section Header & Export Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#2563EB]">
              Historical Vitals Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Longitudinal record of physical measurements and physiological
              statistics
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-50 bg-app-bg text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors  cursor-pointer w-full sm:w-auto"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            Export CSV
          </button>
        </div>

        {/* Responsive Data Table */}
        <div className="border border-slate-200/70 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th
                    onClick={toggleSortOrder}
                    className="py-3.5 px-4 cursor-pointer select-none hover:text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      Date / Time
                      <ArrowUpDown
                        className={`h-3 w-3 text-slate-400 transition-transform ${sortOrder === "asc" ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">BP (mmHg)</th>
                  <th className="py-3.5 px-4">HR (bpm)</th>
                  <th className="py-3.5 px-4">Temp (°F)</th>
                  <th className="py-3.5 px-4">SPO2</th>
                  <th className="py-3.5 px-4">RR (bpm)</th>
                  <th className="py-3.5 px-4">Weight (lbs)</th>
                  <th className="py-3.5 px-4">Nurses Notes</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {sortedVitalsData.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedVital(row)}
                      className="bg-app-bg hover:bg-blue-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 font-medium text-slate-900 whitespace-nowrap group-hover:text-[#2563EB]">
                        {row.dateTime}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {row.bp}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-600 whitespace-nowrap">
                        {row.hr}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-600 whitespace-nowrap">
                        {row.temp}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-600 whitespace-nowrap">
                        {row.spo2}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-600 whitespace-nowrap">
                        {row.rr}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-600 whitespace-nowrap">
                        {row.weight}
                      </td>
                      <td className="py-4 px-4 font-normal text-slate-500 max-w-xs leading-relaxed truncate">
                        {row.nursesNotes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Imported Framer Motion Animated Slide-over Component */}
      <PatientVitalDetailDrawer
        isOpen={!!selectedVital}
        onClose={() => setSelectedVital(null)}
        vital={selectedVital}
      />
    </>
  );
}
