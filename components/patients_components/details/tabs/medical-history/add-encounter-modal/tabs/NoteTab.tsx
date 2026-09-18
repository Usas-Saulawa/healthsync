// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/NoteTab.tsx
"use client";

import { useState } from "react";

export function NoteTab() {
  const [note, setNote] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold ">Add Note</label>
        <textarea
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Document subjective findings, patient-reported symptoms, onset duration, and history of present illness..."
          className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        />
      </div>
    </div>
  );
}
