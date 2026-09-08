// app/dashboard/patients/[id]/page.tsx
"use client";

import { use, useState } from "react";
import { Header } from "@/components/dashboard_components/Header";
import { PatientsProfileHeader } from "@/components/patients_components/details/PatientProfileHeader";
import { PatientProfileTabs } from "@/components/patients_components/details/PatientDetailTabs";
import { PatientOverviewTab } from "@/components/patients_components/details/tabs/overview/PatientOverviewTab";
import { PatientMedicationTab } from "@/components/patients_components/details/tabs/medications/PatientMedicationTab";
import { mockPatientsList } from "@/mock/mockDashboardData";

interface PatientDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

type TabType =
  | "Overview"
  | "Medical History"
  | "Vitals"
  | "Medications"
  | "Encounter Notes"
  | "Lab Results"
  | "Radiology"
  | "Order & Follow Ups"
  | "Admission & Discharge"
  | "Immunization";

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const resolvedParams = use(params);
  const patientId = resolvedParams.id;

  // Track active tab state here
  const [activeTab, setActiveTab] = useState<TabType>("Overview");

  // Find the exact patient matching the dynamic ID in the URL route
  const foundPatient =
    mockPatientsList.find((p) => String(p.id) === patientId) ||
    mockPatientsList[0];

  const patientProfileData = {
    name: foundPatient.name,
    patientId: String(foundPatient.id),
    age: 29,
    sex: "Male",
    bloodGroup: "O+",
    height: "180cm",
    primaryPhysician: "Dr. Sarah Jenkins",
    admissionType: "In-Patient" as const,
    riskLevel: "High Risk" as const,
  };

  return (
    <div className="w-full min-h-screen bg-[#eef4fb] pb-10 pt-6 space-y-5">
      <Header showGreeting={false} />

      {/* Pinned Patient Profile Header */}
      <PatientsProfileHeader patient={patientProfileData} />

      {/* Edge-to-edge Tab Switcher */}
      <PatientProfileTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as TabType)}
      />

      {/* Dynamic Tab Content Renderer Container */}
      <div className="w-full px-4 sm:px-6">
        {activeTab === "Overview" && <PatientOverviewTab />}

        {activeTab === "Medical History" && (
          <PatientMedicationTab patientId={patientId} />
        )}

        {activeTab === "Vitals" && (
          <div className="bg-white rounded-2xl p-6 text-slate-500 shadow-xs border border-blue-100/60">
            Vitals module coming up next...
          </div>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== "Overview" &&
          activeTab !== "Medical History" &&
          activeTab !== "Vitals" && (
            <div className="bg-white rounded-2xl p-6 text-slate-500 shadow-xs border border-blue-100/60">
              {activeTab} module under development.
            </div>
          )}
      </div>
    </div>
  );
}
