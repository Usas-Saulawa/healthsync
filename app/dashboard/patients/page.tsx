// app/dashboard/patients/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/dashboard_components/Header";
import { PatientFiltersHeader } from "@/components/patients_components/headers/PatientFiltersHeader";
import { PatientTable } from "@/components/patients_components/table/PatientTable";
import { mockPatientsList } from "@/mock/mockDashboardData";

function PatientsContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const [activeTab, setActiveTab] = useState<"out-patient" | "in-patient">(
    "out-patient",
  );
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
    <div className="min-h-screen bg-app-bg flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full py-6 space-y-6">
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

        <PatientTable
          patients={filteredPatients}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPatients.length / 10) || 1}
          totalPatients={filteredPatients.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          isOutPatient={activeTab === "out-patient"}
        />
      </main>
    </div>
  );
}

export default function PatientsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-app-bg" />}>
      <PatientsContent />
    </Suspense>
  );
}
