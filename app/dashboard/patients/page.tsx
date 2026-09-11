// app/dashboard/patients/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard_components/Header";
import { PatientFiltersHeader } from "@/components/patients_components/headers/PatientFiltersHeader";
import { PatientTable } from "@/components/patients_components/table/PatientTable";
import { mockPatientsList } from "@/mock/mockDashboardData";

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState<"out-patient" | "in-patient">(
    "in-patient",
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedWard, setSelectedWard] = useState("All Wards");
  const [selectedStatus, setSelectedStatus] = useState("All Patients");
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Jenkins");
  const [dateRange, setDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Map mock data fields to match validation schema keys if necessary
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
    <div className="min-h-screen bg-app-bg flex flex-col font-sans">
      <Header showGreeting={false} />

      {/* Fluid width container matching your dashboard layout rules */}
      <main className="flex-1 w-full py-6 space-y-6">
        {/* Combined Header & Filter Toolbar */}
        <PatientFiltersHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
          selectedWard={selectedWard}
          onWardSelect={setSelectedWard}
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          selectedDoctor={selectedDoctor}
          onDoctorSelect={setSelectedDoctor}
          dateRange={dateRange}
          onDateRangeSelect={setDateRange}
        />

        {/* Patient Table Grid & Pagination Footer linked with the radio activeTab state */}
        <PatientTable
          patients={formattedPatients}
          currentPage={currentPage}
          totalPages={2}
          totalPatients={24}
          onPageChange={setCurrentPage}
          isOutPatient={activeTab === "out-patient"}
        />
      </main>
    </div>
  );
}
