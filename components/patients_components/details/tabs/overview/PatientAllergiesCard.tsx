// components/patients_components/details/tabs/overview/PatientAllergiesCard.tsx
"use client";

interface MedicationItem {
  name: string;
  route: string;
  category: string;
}

interface PatientAllergiesCardProps {
  allergies?: string;
  medications?: MedicationItem[];
}

const mockMedications: MedicationItem[] = [
  {
    name: "Coreg (Carvedilol) 12.5 mg BID",
    route: "Oral",
    category: "ACE Inhibitor",
  },
  {
    name: "Coreg (Carvedilol) 12.5 mg BID",
    route: "Oral",
    category: "ACE Inhibitor",
  },
  {
    name: "Coreg (Carvedilol) 12.5 mg BID",
    route: "Oral",
    category: "ACE Inhibitor",
  },
];

export function PatientAllergiesCard({
  allergies = "None",
  medications = mockMedications,
}: PatientAllergiesCardProps) {
  return (
    <section className="h-full w-full flex flex-col gap-3 overflow-hidden rounded-xl bg-(--card) p-5">
      {/* Allergies */}
      <div className="flex-1">
        <h3 className="text-[13px] font-normal leading-4.25 text-(--shade-text)">
          ALLERGIES
        </h3>

        {allergies !== "None" && (
          <p className="mt-1.75 text-[12px] font-medium leading-4]">
            {allergies}
          </p>
        )}
      </div>

      {/* Medications */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.25">
          {/* Medication icon */}
          <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" aria-hidden="true">
              {/* Blue capsule */}
              <g transform="rotate(-28 9 8)">
                <rect
                  x="4"
                  y="4"
                  width="10"
                  height="5"
                  rx="2.5"
                  fill="#CDEBFF"
                  stroke="#172033"
                  strokeWidth="0.8"
                />
                <path d="M9 4v5" stroke="#EF5A67" strokeWidth="0.8" />
              </g>

              {/* Pink tablet */}
              <g transform="rotate(25 14 15)">
                <rect
                  x="9"
                  y="12"
                  width="11"
                  height="6"
                  rx="3"
                  fill="#FF9CA6"
                  stroke="#172033"
                  strokeWidth="0.8"
                />
                <path d="M14.5 12.2v5.6" stroke="#172033" strokeWidth="0.7" />
              </g>

              {/* Small blue pill */}
              <ellipse
                cx="7"
                cy="16"
                rx="3.5"
                ry="2"
                fill="#A8D9FF"
                stroke="#172033"
                strokeWidth="0.8"
              />
            </svg>
          </div>

          <h3 className="text-[13px] font-normal leading-4.25 text-(--shade-text)">
            MEDICATIONS
          </h3>
        </div>

        {/* Medication list */}
        <div className="space-y-3">
          {medications.map((medication, index) => (
            <div
              key={`${medication.name}-${index}`}
              className="w-full rounded-md bg-(--info-card) px-4 py-3 space-y-1.5"
            >
              <p className="text-sm font-bold leading-4">{medication.name}</p>

              <p className="text-[10px] font-normal leading-3.25 text-(--shade-text)">
                Route: {medication.route} • {medication.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
