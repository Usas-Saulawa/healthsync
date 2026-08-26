// app/dashboard/patients/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard_components/Header";
import { PatientFiltersHeader } from "@/components/patients_components/PatientFiltersHeader";
import { PatientTable } from "@/components/patients_components/PatientTable";
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
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <Header showGreeting={false} />

      <main className="flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-[1440px] w-full mx-auto">
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

        {/* Patient Table Grid & Pagination Footer */}
        <PatientTable
          patients={formattedPatients}
          currentPage={currentPage}
          totalPages={2}
          totalPatients={24}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
