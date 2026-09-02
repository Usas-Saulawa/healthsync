// app/dashboard/patients/[id]/page.tsx
"use client";

import { use } from "react";
import { Header } from "@/components/dashboard_components/Header";
import { PatientsProfileHeader } from "@/components/patients_components/details/PatientProfileHeader";
import { mockPatientsList } from "@/mock/mockDashboardData";

interface PatientDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  const patientId = resolvedParams.id;

  // Find the exact patient matching the dynamic ID in the URL route
  const foundPatient =
    mockPatientsList.find((p) => String(p.id) === patientId) ||
    mockPatientsList[0]; // Fallback to first patient if ID doesn't match

  // Map list item data to match the PatientProfile interface required by the header
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
    <div className="w-full min-h-screen bg-[#eef4fb] pb-10 px-7 pt-6 space-y-5">
      {/* Pinned Patient Profile Header with dynamic data */}
      <Header showGreeting={false} />
      <PatientsProfileHeader patient={patientProfileData} />

      {/* NEXT UP: We will place the Tab Switcher right here! */}
    </div>
  );
}
