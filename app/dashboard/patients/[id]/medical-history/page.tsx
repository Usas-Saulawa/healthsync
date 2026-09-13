// app/dashboard/patients/[id]/medical-history/page.tsx
"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/dashboard_components/Header";
import { ConditionCoreSection } from "@/components/patients_components/details/tabs/medical-history/ConditionCoreSection";
import { TreatmentAndHistorySection } from "@/components/patients_components/details/tabs/medical-history/TreatmentAndHistorySection";
import { RelatedOrdersSection } from "@/components/patients_components/details/tabs/medical-history/RelatedOrdersSection";
import { ActiveMedicationsAndDocumentsSection } from "@/components/patients_components/details/tabs/medical-history/ActiveMedicationsAndDocumentsSection";
import { VitalsAndTrendsSection } from "@/components/patients_components/details/tabs/medical-history/VitalsAndTrendsSection";
import { AddEncounterModal } from "@/components/patients_components/details/tabs/medical-history/add-encounter-modal/AddEncounterModal";

interface MedicalHistoryPageProps {
  params: Promise<{ id: string }>;
}

export default function MedicalHistoryPage({
  params,
}: MedicalHistoryPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Modal open/close state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-app-bg pb-12 pt-6 space-y-6">
      <Header />

      <div className="w-full px-4 sm:px-6 space-y-6">
        {/* Top Navigation & Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0f172a] shadow-xs  hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2]" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
              Medical History
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <span>+ Add Note</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white text-slate-700 text-xs sm:text-sm font-semibold  shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Master Two-Column Grid Layout matching the Figma Mockup sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <ConditionCoreSection />
            <TreatmentAndHistorySection />
            <RelatedOrdersSection />
          </div>

          {/* Right Side Column */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <VitalsAndTrendsSection />
            <ActiveMedicationsAndDocumentsSection />
          </div>
        </div>
      </div>

      {/* Add Encounter Modal Component */}
      <AddEncounterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
