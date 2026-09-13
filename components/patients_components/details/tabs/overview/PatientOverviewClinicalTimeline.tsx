// components/patients_components/details/tabs/overview/PatientOverviewClinicalTimeline.tsx
"use client";

import { Activity, FileText, Layers3 } from "lucide-react";

interface ClinicalTimelineItem {
  date: string;
  time: string;
  title: string;
  description: string;
  author: string;
  icon: "note" | "laboratory" | "medication";
  variant: "blue" | "green" | "yellow";
}

interface PatientOverviewClinicalTimelineProps {
  items?: ClinicalTimelineItem[];
}

const mockTimelineItems: ClinicalTimelineItem[] = [
  {
    date: "Oct 23, 2023",
    time: "02:15 PM",
    title: "Encounter Note - Discharge Planning",
    description:
      "Patient evaluated for transition to home health. Hemodynamics are optimized and stable on oral regimen.",
    author: "Dr. Robert Vance, MD",
    icon: "note",
    variant: "blue",
  },
  {
    date: "Oct 22, 2023",
    time: "10:00 AM",
    title: "Laboratory Result - Electrolyte Panel",
    description:
      "Serum Potassium reported at 3.2 mEq/L (Normalizing). Previous 2.9 critical low has resolved post-infusion.",
    author: "Core Laboratory System",
    icon: "laboratory",
    variant: "green",
  },
  {
    date: "Oct 21, 2023",
    time: "09:00 AM",
    title: "Medication Action - Coreg Dosage Adjusted",
    description:
      "Coreg increased from 6.25mg BID to 12.5mg BID due to blood pressure response targets.",
    author: "Dr. Sarah Jenkins, MD",
    icon: "medication",
    variant: "yellow",
  },
];

function TimelineIcon({
  type,
  variant,
}: {
  type: ClinicalTimelineItem["icon"];
  variant: ClinicalTimelineItem["variant"];
}) {
  const iconClasses = "h-[16px] w-[16px]";

  if (type === "note") {
    return (
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#E8F1FF]">
        <FileText className={`${iconClasses} text-[#2167F3]`} strokeWidth={2} />
      </div>
    );
  }

  if (type === "laboratory") {
    return (
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#DDF7EC]">
        <Activity className={`${iconClasses} text-[#13B981]`} strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#FFF2BD]">
      <Layers3 className={`${iconClasses} text-[#F5B800]`} strokeWidth={2} />
    </div>
  );
}

export function PatientOverviewClinicalTimeline({
  items = mockTimelineItems,
}: PatientOverviewClinicalTimelineProps) {
  return (
    <section className="w-full overflow-hidden rounded-[15px] bg-white px-[45px] pb-[27px] pt-[27px]">
      {/* Section title */}
      <h2 className="text-[15px] font-medium leading-[20px] text-[#111827]">
        Clinical Timeline
      </h2>

      {/* Timeline */}
      <div className="mt-[20px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div
              key={`${item.date}-${item.title}`}
              className={[
                "relative grid grid-cols-[126px_32px_minmax(0,1fr)]",
                "items-start",
                !isLast ? "pb-[20px]" : "",
              ].join(" ")}
            >
              {/* Date / time */}
              <div className="pt-[7px]">
                <p className="text-[12px] font-bold leading-[16px] text-[#172033]">
                  {item.date}
                </p>
                <p className="mt-[1px] text-[11px] font-normal leading-[15px] text-[#64748B]">
                  {item.time}
                </p>
              </div>

              {/* Timeline icon + connector */}
              <div className="relative flex h-full justify-center">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-[35px] h-[calc(100%+20px)] w-px -translate-x-1/2 bg-[#E4EAF2]"
                  />
                )}

                <div className="relative z-10">
                  <TimelineIcon type={item.icon} variant={item.variant} />
                </div>
              </div>

              {/* Event card */}
              <div
                className={[
                  "min-h-[66px] rounded-[7px] border px-[14px] py-[14px]",
                  index === 0
                    ? "border-transparent bg-[#EAF4FF]"
                    : "border-[#E2E7EE] bg-white",
                ].join(" ")}
              >
                {/* Event heading */}
                <div className="flex items-start justify-between gap-[20px]">
                  <h3 className="min-w-0 text-[13px] font-bold leading-[17px] text-[#172033]">
                    {item.title}
                  </h3>
                  <span className="shrink-0 pt-[1px] text-[11px] font-normal leading-[15px] text-[#64748B]">
                    {item.author}
                  </span>
                </div>

                {/* Event description */}
                <p className="mt-[6px] text-[11px] font-normal leading-[15px] text-[#64748B]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
