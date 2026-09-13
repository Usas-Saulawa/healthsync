// components/patients_components/details/tabs/immunization/ImmunizationTab.tsx
"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { RecordVaccinationModal } from "./RecordVaccinationModal";

interface ImmunizationItem {
  id: string;
  vaccineName: string;
  brand: string;
  dose: string;
  dateAdministered: string;
  administeredBy: string;
  lotNumber: string;
  site: string;
  status: "Completed" | "Pending" | "Due";
}

const mockImmunizations: ImmunizationItem[] = [
  {
    id: "1",
    vaccineName: "Influenza (Fluzone HD)",
    brand: "Sanofi Pasteur",
    dose: "Dose 1",
    dateAdministered: "Oct 15, 2023",
    administeredBy: "Dr. Sarah Jenkins, MD",
    lotNumber: "FL2023-4521",
    site: "Left Deltoid",
    status: "Completed",
  },
  {
    id: "2",
    vaccineName: "COVID-19 (Pfizer Bivalent)",
    brand: "Comirnaty",
    dose: "Booster 3",
    dateAdministered: "Sep 20, 2023",
    administeredBy: "RN Maria Santos",
    lotNumber: "PF-BA2309",
    site: "Right Deltoid",
    status: "Completed",
  },
  {
    id: "3",
    vaccineName: "Tdap (Adacel)",
    brand: "Sanofi Pasteur",
    dose: "Dose 1",
    dateAdministered: "Aug 05, 2023",
    administeredBy: "Dr. Robert Vance, MD",
    lotNumber: "TD2023-112",
    site: "Left Deltoid",
    status: "Completed",
  },
  {
    id: "4",
    vaccineName: "Pneumococcal (Prevnar 20)",
    brand: "Pfizer",
    dose: "Dose 1",
    dateAdministered: "Jul 12, 2023",
    administeredBy: "Dr. Alan Marcus, MD",
    lotNumber: "PV20-8834",
    site: "Left Deltoid",
    status: "Completed",
  },
  {
    id: "5",
    vaccineName: "Shingles (Shingrix)",
    brand: "GSK",
    dose: "Dose 2",
    dateAdministered: "Jun 01, 2023",
    administeredBy: "RN Maria Santos",
    lotNumber: "SH2023-667",
    site: "Right Deltoid",
    status: "Completed",
  },
  {
    id: "6",
    vaccineName: "Shingles (Shingrix)",
    brand: "GSK",
    dose: "Dose 1",
    dateAdministered: "Apr 15, 2023",
    administeredBy: "RN Maria Santos",
    lotNumber: "SH2023-401",
    site: "Right Deltoid",
    status: "Completed",
  },
  {
    id: "7",
    vaccineName: "Hepatitis B (Heplisav-B)",
    brand: "Dynavax",
    dose: "Dose 3",
    dateAdministered: "Jan 20, 2023",
    administeredBy: "Dr. Sarah Jenkins, MD",
    lotNumber: "HB2023-092",
    site: "Left Deltoid",
    status: "Completed",
  },
];

export function PatientImmunizationTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-[8px] px-10 py-5 shadow-xs flex flex-col gap-5">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full h-[64px]">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
            Immunization
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage patient admissions, discharges, transfers, and referrals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRecordModalOpen(true)}
            className="inline-flex items-center px-4 py-2.5 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <span>Record vaccination</span>
          </button>
          <button
            type="button"
            onClick={() => console.log("View CDC Schedule clicked")}
            className="inline-flex items-center px-4 py-2.5 bg-white text-slate-700 border border-slate-200 text-xs font-bold rounded-[6px] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>View CDC Schedule</span>
          </button>
        </div>
      </div>

      {/* Table Container with gap-[4px] */}
      <div className="w-full rounded-[6px] overflow-hidden bg-white shadow-2xs flex flex-col gap-[4px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-slate-50/80 px-4 py-3 text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b border-slate-100 items-center">
          <div className="col-span-3 flex items-center gap-1.5 cursor-pointer hover:text-slate-700">
            <span>Vaccine Name</span>
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
          </div>
          <div className="col-span-1">Dose #</div>
          <div className="col-span-2">Date Administered</div>
          <div className="col-span-2">Administered By</div>
          <div className="col-span-2">Lot Number</div>
          <div className="col-span-1">Site</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col bg-white gap-[4px]">
          {mockImmunizations.map((item) => {
            const statusStyle =
              item.status === "Completed"
                ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs"
                : "bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold inline-block whitespace-nowrap shadow-2xs";

            return (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center px-4 py-3.5 bg-app-bg border-b border-slate-100 text-xs text-slate-900 hover:bg-slate-100/60 transition-colors"
              >
                {/* Vaccine Name & Brand */}
                <div className="col-span-3 flex flex-col gap-0.5">
                  <span className="font-bold text-slate-900">
                    {item.vaccineName}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Brand: {item.brand}
                  </span>
                </div>

                {/* Dose # */}
                <div className="col-span-1 font-bold text-[#1C64F2]">
                  {item.dose}
                </div>

                {/* Date Administered */}
                <div className="col-span-2 font-medium text-slate-700">
                  {item.dateAdministered}
                </div>

                {/* Administered By */}
                <div className="col-span-2 font-medium text-slate-800">
                  {item.administeredBy}
                </div>

                {/* Lot Number */}
                <div className="col-span-2 font-medium text-slate-600 font-mono text-[11px]">
                  {item.lotNumber}
                </div>

                {/* Site */}
                <div className="col-span-1 font-medium text-slate-600">
                  {item.site}
                </div>

                {/* Status */}
                <div className="col-span-1 text-right">
                  <span className={statusStyle}>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 h-[46px]">
        <span className="text-xs text-slate-500 font-medium">
          Showing 1-5 of 24 patients
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer flex items-center justify-center ${
              currentPage === 1
                ? "bg-[#1C64F2] text-white shadow-xs"
                : "bg-app-bg text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer flex items-center justify-center ${
              currentPage === 2
                ? "bg-[#1C64F2] text-white shadow-xs"
                : "bg-app-bg text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 2))}
            className="px-3 py-1.5 bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
          >
            Next
          </button>
        </div>
      </div>

      {/* Record Vaccination Modal */}
      <RecordVaccinationModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />
    </div>
  );
}
