// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/NurseNotesTab.tsx
"use client";

interface NurseNotesTabProps {
  nurseNotes?: string;
}

export function NurseNotesTab({ nurseNotes }: NurseNotesTabProps) {
  const defaultNotes =
    "Patient stabilized after acute episode. Cardiac markers trending down but continuous monitor highly recommended.";

  const content = nurseNotes || defaultNotes;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold ">Nurse Notes</label>
        <div className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-sm  leading-relaxed select-text">
          {content}
        </div>
      </div>
    </div>
  );
}
