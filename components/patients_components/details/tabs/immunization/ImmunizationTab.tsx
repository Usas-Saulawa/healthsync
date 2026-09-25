// components/patients_components/details/tabs/immunization/ImmunizationTab.tsx
"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { RecordVaccinationModal } from "./RecordVaccinationModal";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

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
  const { immunizationColumns } = useColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }
  return (
    <div className="w-full bg-(--card) rounded-xl p-5 flex flex-col gap-6">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Immunization</h2>
          <p className="text-xs text-(--shade) mt-1">
            Manage patient admissions, discharges, transfers, and referrals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRecordModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-(--button) text-(--button-text) border border-(--button) text-sm rounded-md hover:bg-(--primary) transition-colors cursor-pointer"
          >
            <span>Record vaccination</span>
          </button>
          <button
            type="button"
            onClick={() => console.log("View CDC Schedule clicked")}
            className="inline-flex items-center px-4 py-2  border border-(--border) text-sm rounded-md hover:bg-(--card-hover) transition-colors cursor-pointer"
          >
            <span>View CDC Schedule</span>
          </button>
        </div>
      </div>

      <DataTable
        data={mockImmunizations}
        columns={immunizationColumns}
        currentPage={currentPage}
        rowsPerPage={5}
        pagination={true}
        loading={false}
        onPageChange={onPageChange}
        totalPages={Math.ceil(mockImmunizations.length / 5)}
        selectable={false}
        rowKey="id"
        // onRowClick={handleRowClick}
      />

      {/* Record Vaccination Modal */}
      <RecordVaccinationModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />
    </div>
  );
}
