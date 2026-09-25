// app/dashboard/patients/[id]/medical-history/page.tsx
"use client";

import { use, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Download, Plus } from "lucide-react";
import { Header } from "@/components/dashboard_components/Header";
import { ConditionCoreSection } from "@/components/patients_components/details/tabs/medical-history/ConditionCoreSection";
import { TreatmentAndHistorySection } from "@/components/patients_components/details/tabs/medical-history/TreatmentAndHistorySection";
import { RelatedOrdersSection } from "@/components/patients_components/details/tabs/medical-history/RelatedOrdersSection";
import { ActiveMedications } from "@/components/patients_components/details/tabs/medical-history/ActiveMedications";
import { VitalsAndTrendsSection } from "@/components/patients_components/details/tabs/medical-history/VitalsAndTrendsSection";
import { AddEncounterModal } from "@/components/patients_components/details/tabs/medical-history/add-encounter-modal/AddEncounterModal";
import VitalsCard from "@/components/patients_components/details/tabs/medical-history/VitalsCard";
import { DocumentsList } from "@/components/patients_components/details/tabs/medical-history/DocumentsList";

interface MedicalHistoryPageProps {
  params: Promise<{ id: string }>;
}

export default function MedicalHistoryPage({
  params,
}: MedicalHistoryPageProps) {
  const resolvedParams = use(params);
  const noteRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  // Modal open/close state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full space-y-3 py-3">
        {/* Top Navigation & Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-(--card) shadow-xs  hover:bg-(--card-hover) transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 stroke-2" />
            </button>
            <h1 className="text-lg font-bold tracking-tight">
              Medical History
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              ref={noteRef}
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1 py-2 pr-4 pl-3 rounded-md bg-(--button) text-(--button-text) text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span> Add Note</span>
            </button>
            <button
              type="button"
              style={{ width: noteRef?.current?.clientWidth }}
              className="flex items-center justify-center gap-1 py-2 pl-3 pr-4 rounded-md bg-(--card) text-sm sm:text-sm font-semibold hover:bg-(--card-hover) transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Master Two-Column Grid Layout matching the Figma Mockup sequence */}
        <div className="flex flex-col gap-3 items-start">
          {/* Left Main Column */}
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 space-y-3">
            <ConditionCoreSection />
            <VitalsCard />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 space-y-3 w-full">
            <TreatmentAndHistorySection />
            <div className="flex flex-col gap-3 h-full col-span-1 sm:col-span-2">
              <VitalsAndTrendsSection />
              <ActiveMedications />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 space-y-3 w-full">
            <RelatedOrdersSection />
            <DocumentsList />
          </div>

          {/* Right Side Column */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3"></div>
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
