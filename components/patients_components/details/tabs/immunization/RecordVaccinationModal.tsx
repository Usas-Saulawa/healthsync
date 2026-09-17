// components/patients_components/details/tabs/immunization/RecordVaccinationModal.tsx
"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface RecordVaccinationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordVaccinationModal({
  isOpen,
  onClose,
}: RecordVaccinationModalProps) {
  const [vaccineName, setVaccineName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [doseNumber, setDoseNumber] = useState("Dose 1");
  const [lotNumber, setLotNumber] = useState("");
  const [dateAdministered, setDateAdministered] = useState("Oct 24, 2023");
  const [expirationDate, setExpirationDate] = useState("");
  const [administeredBy, setAdministeredBy] = useState("");
  const [administrationSite, setAdministrationSite] = useState("Left Deltoid");
  const [route, setRoute] = useState("Intramuscular");
  const [visDate, setVisDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Vaccination Record...", {
      vaccineName,
      manufacturer,
      doseNumber,
      lotNumber,
      dateAdministered,
      expirationDate,
      administeredBy,
      administrationSite,
      route,
      visDate,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-[580px] bg-(--card) rounded-[12px] shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Record Vaccination
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-red-200 text-red-500 bg-red-50/50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4 custom-scrollbar"
        >
          {/* Row 1: Vaccine Name & Manufacturer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vaccine Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Vaccine Name
              </label>
              <div className="relative">
                <select
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="" disabled>
                    Search vaccine...
                  </option>
                  <option value="Influenza (Fluzone HD)">
                    Influenza (Fluzone HD)
                  </option>
                  <option value="COVID-19 (Pfizer Bivalent)">
                    COVID-19 (Pfizer Bivalent)
                  </option>
                  <option value="Tdap (Adacel)">Tdap (Adacel)</option>
                  <option value="Pneumococcal (Prevnar 20)">
                    Pneumococcal (Prevnar 20)
                  </option>
                  <option value="Shingles (Shingrix)">
                    Shingles (Shingrix)
                  </option>
                  <option value="Hepatitis B (Heplisav-B)">
                    Hepatitis B (Heplisav-B)
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Manufacturer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Manufacturer
              </label>
              <input
                type="text"
                placeholder="e.g., Sanofi Pasteur"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Row 2: Dose Number & Lot Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dose Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Dose Number
              </label>
              <div className="relative">
                <select
                  value={doseNumber}
                  onChange={(e) => setDoseNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="Dose 1">Dose 1</option>
                  <option value="Dose 2">Dose 2</option>
                  <option value="Dose 3">Dose 3</option>
                  <option value="Booster 1">Booster 1</option>
                  <option value="Booster 2">Booster 2</option>
                  <option value="Booster 3">Booster 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Lot Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Lot Number
              </label>
              <input
                type="text"
                placeholder="e.g., FL2023-4521"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Row 3: Date Administered & Expiration Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date Administered */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Date Administered
              </label>
              <div className="relative">
                <select
                  value={dateAdministered}
                  onChange={(e) => setDateAdministered(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="Oct 24, 2023">Oct 24, 2023</option>
                  <option value="Oct 23, 2023">Oct 23, 2023</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Expiration Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Expiration Date
              </label>
              <div className="relative">
                <select
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="" disabled>
                    Select date...
                  </option>
                  <option value="Dec 31, 2025">Dec 31, 2025</option>
                  <option value="Jun 15, 2026">Jun 15, 2026</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 4: Administered By & Administration Site */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Administered By */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Administered By
              </label>
              <div className="relative">
                <select
                  value={administeredBy}
                  onChange={(e) => setAdministeredBy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="" disabled>
                    Select provider...
                  </option>
                  <option value="Dr. Sarah Jenkins, MD">
                    Dr. Sarah Jenkins, MD
                  </option>
                  <option value="Dr. James Rose, MD">Dr. James Rose, MD</option>
                  <option value="RN Maria Santos">RN Maria Santos</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Administration Site */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Administration Site
              </label>
              <div className="relative">
                <select
                  value={administrationSite}
                  onChange={(e) => setAdministrationSite(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="Left Deltoid">Left Deltoid</option>
                  <option value="Right Deltoid">Right Deltoid</option>
                  <option value="Left Thigh">Left Thigh</option>
                  <option value="Right Thigh">Right Thigh</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 5: Route & VIS Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Route */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Route
              </label>
              <div className="relative">
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="Intramuscular">Intramuscular</option>
                  <option value="Subcutaneous">Subcutaneous</option>
                  <option value="Intranasal">Intranasal</option>
                  <option value="Oral">Oral</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* VIS Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                VIS Date
              </label>
              <div className="relative">
                <select
                  value={visDate}
                  onChange={(e) => setVisDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer pr-8"
                >
                  <option value="" disabled>
                    Select date...
                  </option>
                  <option value="Aug 06, 2021">Aug 06, 2021</option>
                  <option value="Feb 20, 2023">Feb 20, 2023</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 6: Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              rows={3}
              placeholder="Additional notes about this vaccination..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-(--card) border border-slate-200 rounded-[8px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] resize-none"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card) text-slate-700 text-xs font-semibold rounded-[8px] border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-[8px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              Record Vaccination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
