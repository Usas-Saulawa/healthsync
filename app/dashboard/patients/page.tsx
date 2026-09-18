// app/dashboard/patients/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PatientFiltersHeader } from "@/components/patients_components/headers/PatientFiltersHeader";
import { PatientTable } from "@/components/patients_components/table/PatientTable";
import { mockPatientsList } from "@/mock/mockDashboardData";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";
import { useRouter } from "next/navigation";

function PatientsContent() {
  const router = useRouter();
  const { patientColumns, outPatientColumns } = useColumns();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const [activeTab, setActiveTab] = useState<"out-patient" | "in-patient">(
    "out-patient",
  );
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusParam || "");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Consolidated useEffect: handles both status and tab syncing together
  useEffect(() => {
    if (statusParam) {
      setSelectedStatus(statusParam);

      // If the incoming status is a follow-up, automatically flip to in-patient
      if (statusParam.toLowerCase().includes("follow")) {
        setActiveTab("in-patient");
      }
    }
  }, [statusParam]);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  // Filter logic based on search, status, and ward filters
  const filteredPatients = mockPatientsList.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.hospNo.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchValue.toLowerCase());

    const matchesWard = selectedWard
      ? patient.wardBed.toLowerCase().includes(selectedWard.toLowerCase())
      : true;

    const matchesStatus = selectedStatus
      ? patient.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;

    return matchesSearch && matchesWard && matchesStatus;
  });

  return (
    <main className="flex-1 w-full space-y-3">
      <PatientFiltersHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchValue={searchValue}
        onSearchChange={(e) => {
          setSearchValue(e.target.value);
          setCurrentPage(1);
        }}
        selectedWard={selectedWard}
        onWardSelect={(val) => {
          setSelectedWard(val);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusSelect={(val) => {
          setSelectedStatus(val);
          setCurrentPage(1);
        }}
        selectedDoctor={selectedDoctor}
        onDoctorSelect={(val) => {
          setSelectedDoctor(val);
          setCurrentPage(1);
        }}
        dateRange={dateRange}
        onDateRangeSelect={(val) => {
          setDateRange(val);
          setCurrentPage(1);
        }}
      />

      <div className="p-5 bg-(--card) rounded-xl">
        <DataTable
          data={filteredPatients}
          columns={
            { "in-patient": patientColumns, "out-patient": outPatientColumns }[
              activeTab as "out-patient" | "in-patient"
            ]
          }
          currentPage={currentPage}
          rowsPerPage={10}
          pagination
          loading={loading}
          onPageChange={onPageChange}
          totalPages={Math.ceil(filteredPatients.length / 10)}
          selectable
          rowKey="id"
          onRowClick={(row) => router.push(`/dashboard/patients/${row.id}`)}
        />
      </div>
    </main>
  );
}

export default function PatientsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-app-bg" />}>
      <PatientsContent />
    </Suspense>
  );
}
