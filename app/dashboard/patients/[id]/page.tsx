// app/dashboard/patients/[id]/page.tsx
"use client";

import { use, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/dashboard_components/Header";
import { PatientsProfileHeader } from "@/components/patients_components/details/PatientProfileHeader";
import { PatientProfileTabs } from "@/components/patients_components/details/PatientDetailTabs";
import { PatientOverviewTab } from "@/components/patients_components/details/tabs/overview/PatientOverviewTab";
import { PatientMedicalHistoryTab } from "@/components/patients_components/details/tabs/medical-history/PatientMedicationTab";
import { PatientVitalTab } from "@/components/patients_components/details/tabs/vitals/PatientVitalTab";
import { PatientMedicationsTab } from "@/components/patients_components/details/tabs/medications/PatientMedicationsTab";
import { PatientEncounterTab } from "@/components/patients_components/details/tabs/encounter-note/PatientEncounterTab";
import { PatientLabResultTab } from "@/components/patients_components/details/tabs/lab-result/PatientLabResultTab";
import { PatientRadiologyTab } from "@/components/patients_components/details/tabs/radiology/PatientRadiologyTab";
import { PatientOrderAndFollowUpsTab } from "@/components/patients_components/details/tabs/oder-and-followUps/OrderAndFollowUpsTab";
import { AdmissionAndDischargeTab } from "@/components/patients_components/details/tabs/admission-and-discharge/AdmissionAndDischargeTab";
import { PatientImmunizationTab } from "@/components/patients_components/details/tabs/immunization/ImmunizationTab";
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

function PatientDetailContent({ params }: PatientDetailPageProps) {
  const resolvedParams = use(params);
  const patientId = resolvedParams.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read active tab directly from URL search params, default to "Overview"
  const tabParam = searchParams.get("tab") as TabType;
  const activeTab: TabType = tabParam || "Overview";

  const handleTabChange = (tab: TabType) => {
    const paramsObj = new URLSearchParams(searchParams.toString());
    paramsObj.set("tab", tab);
    router.replace(`?${paramsObj.toString()}`, { scroll: false });
  };

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
    <div className="w-full min-h-screen bg-(--background) pt-3 space-y-3">
      {/* Pinned Patient Profile Header */}
      <PatientsProfileHeader patient={patientProfileData} />

      {/* Edge-to-edge Tab Switcher */}
      <PatientProfileTabs
        activeTab={activeTab}
        onTabChange={(tab) => handleTabChange(tab as TabType)}
      />

      {/* Dynamic Tab Content Renderer Container */}
      <div className="w-full px-4 sm:px-6">
        {{
          Overview: <PatientOverviewTab />,
          "Medical History": <PatientMedicalHistoryTab patientId={patientId} />,
          Vitals: <PatientVitalTab />,
          Medications: <PatientMedicationsTab />,
          "Encounter Notes": <PatientEncounterTab />,
          "Lab Results": <PatientLabResultTab />,
          Radiology: <PatientRadiologyTab />,
          "Order & Follow Ups": <PatientOrderAndFollowUpsTab />,
          "Admission & Discharge": <AdmissionAndDischargeTab />,
          Immunization: <PatientImmunizationTab />,
        }[activeTab] ?? (
          <div className="bg-(--card) rounded-2xl p-6 text-(--shade) shadow-xs ">
            {activeTab} module under development.
          </div>
        )}
      </div>
    </div>
  );
}

export default function PatientDetailPage(props: PatientDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-(--shade)">
          Loading patient details...
        </div>
      }
    >
      <PatientDetailContent {...props} />
    </Suspense>
  );
}
