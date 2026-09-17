// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/PrescriptionTab.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export function PrescriptionTab() {
  const [isAllPrescriptionsOpen, setIsAllPrescriptionsOpen] = useState(false);
  const [medicationSearch, setMedicationSearch] = useState("");
  const [dosage, setDosage] = useState("");
  const [route, setRoute] = useState("Oral");
  const [frequency, setFrequency] = useState("Once Daily");
  const [durationNumber, setDurationNumber] = useState("7");
  const [durationUnit, setDurationUnit] = useState("Days");
  const [quantity, setQuantity] = useState("30");
  const [refills, setRefills] = useState("0");
  const [pharmacyNotes, setPharmacyNotes] = useState("");

  return (
    <div className="space-y-6">
      {/* ALL PRESCRIPTIONS Foldable Section */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-(--card)">
        <button
          type="button"
          onClick={() => setIsAllPrescriptionsOpen(!isAllPrescriptionsOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
            All Prescriptions
          </span>
          {isAllPrescriptionsOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-500" />
          )}
        </button>

        {isAllPrescriptionsOpen && (
          <div className="p-4 border-t border-slate-200 text-xs text-slate-500 text-center">
            No past prescriptions recorded for this encounter.
          </div>
        )}
      </div>

      {/* ADD PRESCRIPTION Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Add Prescription
        </h3>

        {/* Medication Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Medication Name
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={medicationSearch}
              onChange={(e) => setMedicationSearch(e.target.value)}
              placeholder="Search medications..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Dosage & Route Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dosage */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Dosage
            </label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g., 500mg"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Route */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Route
            </label>
            <div className="relative">
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="Oral">Oral</option>
                <option value="Intravenous">Intravenous</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Topical">Topical</option>
                <option value="Sublingual">Sublingual</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Frequency & Duration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frequency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Frequency
            </label>
            <div className="relative">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="Once Daily">Once Daily</option>
                <option value="Twice Daily">Twice Daily</option>
                <option value="Three Times Daily">Three Times Daily</option>
                <option value="Four Times Daily">Four Times Daily</option>
                <option value="As Needed">As Needed (PRN)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Duration
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={durationNumber}
                onChange={(e) => setDurationNumber(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <div className="relative">
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="Days">Days</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Quantity & Refills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Quantity
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Refills */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Refills
            </label>
            <input
              type="text"
              value={refills}
              onChange={(e) => setRefills(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Pharmacy Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Pharmacy Notes
          </label>
          <textarea
            rows={3}
            value={pharmacyNotes}
            onChange={(e) => setPharmacyNotes(e.target.value)}
            placeholder="Additional notes for the pharmacy..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}
