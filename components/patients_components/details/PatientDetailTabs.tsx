// components/patients_components/details/PatientDetailTabs.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  "Overview",
  "Medical History",
  "Vitals",
  "Medications",
  "Encounter Notes",
  "Lab Results",
  "Radiology",
  "Order & Follow Ups",
  "Admission & Discharge",
  "Immunization",
] as const;

type Tab = (typeof tabs)[number];

interface PatientProfileTabsProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function PatientProfileTabs({
  activeTab,
  onTabChange,
}: PatientProfileTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current tab from URL query parameter 'tab', fallback to props or 'Overview'
  const tabParam = searchParams.get("tab") as Tab;
  const currentTab = activeTab ?? tabParam ?? "Overview";

  const handleChange = (tab: Tab) => {
    onTabChange?.(tab);

    // Update URL search params dynamically without reloading the page
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full py-2 overflow-x-auto scrollbar-none">
      <div className="flex items-center justify-start gap-3 min-w-max">
        {tabs.map((tab) => {
          const isActive = currentTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleChange(tab)}
              className={[
                "px-4 py-3 whitespace-nowrap rounded-full flex-1 text-center",
                "text-xs font-semibold leading-none",
                "transition-all duration-200 ease-out cursor-pointer",
                isActive
                  ? "bg-(--button) text-(--button-text)"
                  : " bg-(--card) hover:bg-(--card-hover)",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
