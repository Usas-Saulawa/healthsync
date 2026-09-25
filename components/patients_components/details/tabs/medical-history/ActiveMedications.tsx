// src/components/patients_components/details/tabs/medical-history/ActiveMedicationsAndDocumentsSection.tsx
"use client";

const activeMedications = [
  {
    id: 1,
    name: "Metformin 500mg",
    details: "BID • Oral • Since Oct 12, 2023",
    status: "Active",
  },
  {
    id: 2,
    name: "Atorvastatin 20mg",
    details: "QHS • Oral • Since Oct 12, 2023",
    status: "Active",
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    details: "QD • Oral • Since Jan 15, 2024",
    status: "Active",
  },
  {
    id: 4,
    name: "Aspirin 81mg",
    details: "QD • Oral • Since Feb 10, 2024",
    status: "Active",
  },
];

export function ActiveMedications() {
  return (
    <div className="w-full flex-1 bg-(--card) rounded-xl p-5 space-y-3">
      <h3 className="text-lg font-bold">
        Active Medications for This Condition
      </h3>

      <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar">
        {activeMedications.map((med) => (
          <div
            key={med.id}
            className="flex items-center justify-between rounded-md bg-(--info-card) p-4 transition-colors"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-bold">{med.name}</h4>
              <p className="text-xs font-medium text-(--shade-text)">
                {med.details}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-(--primary) shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-(--primary) animate-pulse" />
              {med.status}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}
