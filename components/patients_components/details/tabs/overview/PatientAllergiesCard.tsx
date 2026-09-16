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
    <section className="h-[425px] w-full max-w-[416px] overflow-hidden rounded-[14px] bg-white px-[27px] pt-[23px]">
      {/* Allergies */}
      <div>
        <h3 className="text-[13px] font-normal leading-[17px] text-[#64748B]">
          ALLERGIES
        </h3>

        {allergies !== "None" && (
          <p className="mt-[7px] text-[12px] font-medium leading-[16px] text-[#172033]">
            {allergies}
          </p>
        )}
      </div>

      {/* Medications */}
      <div className="mt-[125px]">
        <div className="flex items-center gap-[9px]">
          {/* Medication icon */}
          <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              aria-hidden="true"
            >
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

          <h3 className="text-[13px] font-normal leading-[17px] text-[#64748B]">
            MEDICATIONS
          </h3>
        </div>

        {/* Medication list */}
        <div className="mt-[5px] space-y-[6px]">
          {medications.map((medication, index) => (
            <div
              key={`${medication.name}-${index}`}
              className="h-[55px] w-full rounded-[10px] bg-[#EAF4FF] px-[10px] py-[10px]"
            >
              <p className="text-[13px] font-bold leading-[16px] text-[#172033]">
                {medication.name}
              </p>

              <p className="mt-[2px] text-[10px] font-normal leading-[13px] text-[#718096]">
                Route: {medication.route} • {medication.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
