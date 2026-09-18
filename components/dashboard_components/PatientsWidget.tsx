// components/dashboard_components/PatientsWidget.tsx
"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { PatientListItem } from "@/lib/validations/dashboard";
import { mockPatientsList } from "@/mock/mockDashboardData";
import { PatientTable } from "../patients_components/table/PatientTable";
import { useState } from "react";
import { DataTable } from "../ui/Table";
import useColumns from "@/hooks/addons/useColumns";
import { useRouter } from "next/navigation";

interface PatientsWidgetProps {
  patients?: PatientListItem[];
  className?: string;
}

export function PatientsWidget({
  patients = mockPatientsList,
  className = "",
}: PatientsWidgetProps) {
  const { patientColumns } = useColumns();
  const [activeTab, setActiveTab] = useState<"out-patient" | "in-patient">(
    "in-patient",
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  function onPageChange(page: number) {
    setCurrentPage(page);
  }
  const formattedPatients = mockPatientsList.map((p) => ({
    id: p.id,
    name: p.name,
    hospNo: p.hospNo,
    ageSex: p.ageSex,
    wardBed: p.wardBed,
    diagnosis: p.diagnosis,
    status: p.status,
    insurance: p.insurance,
  }));
  return (
    <div
      className={`bg-(--card) rounded-xl p-5 shadow-xs  space-y-5 overflow-hidden ${className}`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-(--info-icon-bg) flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-(--primary)" />
          </div>
          <h3 className="font-semibold text-(--card-title) text-sm whitespace-nowrap">
            Patients
          </h3>
        </div>
        <Link
          href="/dashboard/patients"
          className="text-sm font-semibold text-(--link-text) hover:text-(--primary) transition-colors shrink-0"
        >
          View All
        </Link>
      </div>

      {/* Patients List Container */}
      <DataTable
        data={formattedPatients}
        columns={patientColumns}
        currentPage={currentPage}
        rowsPerPage={3}
        pagination={false}
        loading={loading}
        onPageChange={onPageChange}
        selectable={false}
        rowKey="id"
        onRowClick={(row) => router.push(`/dashboard/patients/${row.id}`)}
      />
    </div>
  );
}
