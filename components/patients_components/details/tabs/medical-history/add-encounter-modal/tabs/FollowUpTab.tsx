// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/FollowUpTab.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Calendar, Clock } from "lucide-react";

export function FollowUpTab() {
  const [followUpType, setFollowUpType] = useState("Office Visit");
  const [department, setDepartment] = useState("Cardiology");
  const [provider, setProvider] = useState("Dr. Sarah Jenkins, MD");
  const [selectedPriority, setSelectedPriority] = useState("Routine");
  const [preferredDate, setPreferredDate] = useState("Nov 7, 2023");
  const [preferredTime, setPreferredTime] = useState("10:00 AM");
  const [reason, setReason] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const priorities = ["Routine", "Urgent", "ASAP"];

  return (
    <div className="space-y-6">
      {/* Schedule Follow-Up Header Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Schedule Follow-Up
        </h3>

        {/* Follow-Up Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">Follow-Up Type</label>
          <div className="relative">
            <select
              value={followUpType}
              onChange={(e) => setFollowUpType(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Office Visit">Office Visit</option>
              <option value="Telehealth">Telehealth</option>
              <option value="Phone Consultation">Phone Consultation</option>
              <option value="Home Visit">Home Visit</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">Department</label>
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="General Practice">General Practice</option>
              <option value="Neurology">Neurology</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Provider */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">Provider</label>
          <div className="relative">
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Dr. Sarah Jenkins, MD">
                Dr. Sarah Jenkins, MD
              </option>
              <option value="Dr. Bashir Musa">Dr. Bashir Musa</option>
              <option value="Dr. Ahmad Musa">Dr. Ahmad Musa</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Priority Pills */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">Priority</label>
          <div className="flex items-center gap-2">
            {priorities.map((priority) => {
              const isSelected = selectedPriority === priority;
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-blue-50 text-[#2563EB] border-blue-200 shadow-2xs"
                      : "bg-(--card) text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {priority}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Date & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preferred Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold ">
              Preferred Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-(--card) text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Preferred Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold ">
              Preferred Time
            </label>
            <div className="relative">
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-200 bg-(--card) text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <Clock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reason for Follow-Up */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">
            Reason for Follow-Up
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for follow-up visit..."
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Special Instructions */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold ">
            Special Instructions
          </label>
          <textarea
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Additional, instructions or notes..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm  placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}
