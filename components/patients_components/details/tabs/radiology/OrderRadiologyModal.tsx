// components/patients_components/details/tabs/radiology/OrderRadiologyModal.tsx
"use client";

import { useEffect, useState } from "react";
import { X, Info, Search, Calendar, Clock, ChevronDown } from "lucide-react";

interface OrderRadiologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: any) => void;
}

export function OrderRadiologyModal({
  isOpen,
  onClose,
  onSubmit,
}: OrderRadiologyModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Form state tailored for Radiology
  const [studyCategory, setStudyCategory] = useState("Radiology");
  const [studyType, setStudyType] = useState("");
  const [bodyPart, setBodyPart] = useState("Chest");
  const [priority, setPriority] = useState("Routine");
  const [clinicalIndication, setClinicalIndication] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [contrastRequired, setContrastRequired] = useState(false);
  const [sedationRequired, setSedationRequired] = useState(false);
  const [frequency, setFrequency] = useState("Once");
  const [scheduledDate, setScheduledDate] = useState("2023-10-24");
  const [scheduledTime, setScheduledTime] = useState("10:00");

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  const priorities = ["Routine", "Urgent", "STAT", "ASAP"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        studyCategory,
        studyType,
        bodyPart,
        priority,
        clinicalIndication,
        specialInstructions,
        contrastRequired,
        sedationRequired,
        frequency,
        scheduledDate,
        scheduledTime,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Deepened dark backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-[580px] max-h-[90vh] bg-white shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          borderRadius: "16px",
          boxShadow:
            "0px 20px 25px -5px #0000001A, 0px 8px 10px -6px #0000001A",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Order Imaging Study
            </h2>
            <Info className="h-4 w-4 text-blue-600 cursor-pointer" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar flex-grow">
          {/* Field: Study Category */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Study Category
            </label>
            <div className="w-full h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3.5 flex items-center justify-between text-xs text-slate-900 cursor-pointer">
              <span>{studyCategory}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Field: Study Type */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Study Type
            </label>
            <div className="w-full h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3.5 flex items-center gap-2.5">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search imaging studies..."
                value={studyType}
                onChange={(e) => setStudyType(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Field: Body Part */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Body Part
            </label>
            <div className="w-full h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3.5 flex items-center justify-between text-xs text-slate-900 cursor-pointer">
              <span>{bodyPart}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Field: Priority */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Priority
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {priorities.map((item) => {
                const isSelected = priority === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPriority(item)}
                    style={{ height: "34px", borderRadius: "20px" }}
                    className={`px-4 flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field: Clinical Indication */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Clinical Indication
            </label>
            <div className="w-full h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3.5 flex items-center">
              <input
                type="text"
                placeholder="Enter clinical reason for ordering..."
                value={clinicalIndication}
                onChange={(e) => setClinicalIndication(e.target.value)}
                className="w-full text-xs text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Field: Special Instructions */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
              Special Instructions
            </label>
            <div className="w-full h-[70px] bg-white border border-[#D1D5DB] rounded-[8px] p-3">
              <textarea
                placeholder="Additional instructions for the radiologist..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full h-full text-xs text-slate-900 placeholder:text-slate-400 outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          {/* Grid: Contrast Required & Sedation Required Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Contrast Required */}
            <div className="flex flex-col justify-end gap-1.5">
              <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                Contrast Required
              </label>
              <div className="flex items-center gap-2.5 h-[42px]">
                <button
                  type="button"
                  onClick={() => setContrastRequired(!contrastRequired)}
                  className="w-[44px] h-[24px] rounded-[12px] p-[2px] transition-colors cursor-pointer flex items-center shrink-0"
                  style={{
                    backgroundColor: contrastRequired ? "#1C64F2" : "#CBD5E1",
                  }}
                >
                  <div
                    className="w-[20px] h-[20px] rounded-full bg-white shadow-md transform transition-transform duration-200"
                    style={{
                      transform: contrastRequired
                        ? "translateX(20px)"
                        : "translateX(0px)",
                    }}
                  />
                </button>
                <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                  {contrastRequired ? "Yes (ON)" : "No (OFF)"}
                </span>
              </div>
            </div>

            {/* Sedation Required */}
            <div className="flex flex-col justify-end gap-1.5">
              <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                Sedation Required
              </label>
              <div className="flex items-center gap-2.5 h-[42px]">
                <button
                  type="button"
                  onClick={() => setSedationRequired(!sedationRequired)}
                  className="w-[44px] h-[24px] rounded-[12px] p-[2px] transition-colors cursor-pointer flex items-center shrink-0"
                  style={{
                    backgroundColor: sedationRequired ? "#1C64F2" : "#CBD5E1",
                  }}
                >
                  <div
                    className="w-[20px] h-[20px] rounded-full bg-white shadow-md transform transition-transform duration-200"
                    style={{
                      transform: sedationRequired
                        ? "translateX(20px)"
                        : "translateX(0px)",
                    }}
                  />
                </button>
                <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                  {sedationRequired ? "Yes (ON)" : "No (OFF)"}
                </span>
              </div>
            </div>
          </div>

          {/* Grid: Frequency & Scheduled Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Frequency */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Frequency
              </label>
              <div className="w-full h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3.5 flex items-center justify-between text-xs text-slate-900 cursor-pointer">
                <span>{frequency}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Scheduled Date & Time with Reconciled Native Pickers */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Scheduled Date & Time
              </label>
              <div className="flex items-center gap-2">
                {/* Native Date Input Box */}
                <div className="relative flex-1 h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3 flex items-center text-xs text-slate-900">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-transparent outline-none cursor-pointer text-xs text-slate-900 pr-5 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5"
                  />
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0 pointer-events-none absolute right-3" />
                </div>

                {/* Native Time Input Box */}
                <div className="relative w-[110px] h-[42px] bg-white border border-[#D1D5DB] rounded-[8px] px-3 flex items-center text-xs text-slate-900">
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-transparent outline-none cursor-pointer text-xs text-slate-900 pr-5 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5"
                  />
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0 pointer-events-none absolute right-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between shrink-0 bg-white rounded-b-[16px]">
          <button
            type="button"
            onClick={onClose}
            className="w-[88px] h-[38px] bg-white border border-[#D1D5DB] text-slate-700 text-xs font-semibold rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[115px] h-[38px] bg-[#2563EB] text-white text-xs font-semibold rounded-[8px] hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
          >
            Submit Order
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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
