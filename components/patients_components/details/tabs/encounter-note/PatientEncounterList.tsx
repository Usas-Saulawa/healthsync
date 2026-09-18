// components/patients_components/details/tabs/encounter-note/PatientEncounterList.tsx

"use client";

import { useState } from "react";
import { ArrowUpDown, Search, ChevronDown, Plus } from "lucide-react";

export interface EncounterRow {
  id: string;
  date: string;
  time: string;
  encounterType: "Inpatient" | "Emergency" | "Telehealth";
  title: string;
  provider: string;
  status: "Signed" | "Draft";
}

interface PatientEncounterListProps {
  data: EncounterRow[];
  currentPage: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  onNewEncounter: () => void;
}

export function PatientEncounterList({
  data,
  currentPage,
  onPageChange,
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  onNewEncounter,
}: PatientEncounterListProps) {
  return (
    <div className="bg-(--card) rounded-[8px] p-6 shadow-xs space-y-6">
      {/* Header Row (h: 50px, space-between) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
            Encounter History & Progress Notes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review and manage clinical documentation from current and past
            admissions
          </p>
        </div>

        {/* Actions Bar (width: 601px, gap: 12px) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Search (w: 220px, h: 34px, bg-(--background)) */}
          <div className="relative w-[220px] h-[34px]">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search encounter..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-full pl-8 pr-3 bg-(--background)  rounded-[6px] text-xs  focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Filter Dropdown (w: 196px, h: 34px, bg-(--background)) */}
          <div className="relative w-[196px] h-[34px]">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full h-full appearance-none px-3 bg-(--background) ] rounded-[6px] text-xs  focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
            >
              <option value="all">Encounter Type: All</option>
              <option value="Inpatient">Encounter Type: Inpatient</option>
              <option value="Emergency">Encounter Type: Emergency</option>
              <option value="Telehealth">Encounter Type: Telehealth</option>
            </select>
            <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* New Encounter Note Button */}
          <button
            type="button"
            onClick={onNewEncounter}
            className="inline-flex items-center gap-1.5 px-3.5 h-[34px] rounded-[6px] bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Encounter Note</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto   rounded-[8px]">
        <table className="w-full text-left border-separate border-spacing-y-[5px] p-2">
          {/* Table Header (bg: #F9FAFB, h: 59px) */}
          <thead>
            <tr className="bg-[#F9FAFB] text-[11px] font-bold text-(--shade) uppercase tracking-wider ">
              <th className="py-3 px-4">
                <div className="flex items-center gap-1.5 cursor-pointer hover:">
                  Date / Time
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Encounter Type</th>
              <th className="py-3 px-4">Title / Subject</th>
              <th className="py-3 px-4">Provider</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-xs ">
            {data.map((row) => {
              // Type badge styles matching screenshot
              let typeBadgeStyles = "";
              if (row.encounterType === "Inpatient") {
                typeBadgeStyles =
                  "bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full";
              } else if (row.encounterType === "Emergency") {
                typeBadgeStyles =
                  "bg-red-50 text-red-500 font-semibold px-3 py-1 rounded-full";
              } else if (row.encounterType === "Telehealth") {
                typeBadgeStyles =
                  "bg-purple-50 text-purple-600 font-semibold px-3 py-1 rounded-full";
              }

              // Status badge styles matching screenshot
              let statusBadgeStyles = "";
              if (row.status === "Signed") {
                statusBadgeStyles =
                  "bg-emerald-50 text-emerald-600 font-semibold px-3 py-1 rounded-full";
              } else if (row.status === "Draft") {
                statusBadgeStyles =
                  "bg-amber-50 text-amber-600 font-semibold px-3 py-1 rounded-full";
              }

              return (
                <tr
                  key={row.id}
                  className="bg-(--background) hover:bg-slate-100/60 transition-colors cursor-pointer  h-[68px]"
                >
                  {/* Date / Time */}
                  <td className="py-3 px-4 rounded-l-[6px]">
                    <div className="font-bold ">{row.date}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {row.time}
                    </div>
                  </td>

                  {/* Encounter Type */}
                  <td className="py-3 px-4">
                    <span
                      className={`${typeBadgeStyles} text-[11px] inline-block`}
                    >
                      {row.encounterType}
                    </span>
                  </td>

                  {/* Title / Subject */}
                  <td className="py-3 px-4 font-bold ">{row.title}</td>

                  {/* Provider */}
                  <td className="py-3 px-4  font-medium">{row.provider}</td>

                  {/* Status */}
                  <td className="py-3 px-4 rounded-r-[6px]">
                    <span
                      className={`${statusBadgeStyles} text-[11px] inline-block`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Table Pagination (bg: #F9FAFB, h: 49px, border-top: 1px solid #E5E7EB) */}
        <div className="flex items-center justify-between px-4 py-3  text-xs text-(--shade)">
          <p>
            Showing 1-{data.length} of {data.length} notes
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="px-3 py-1 rounded-[6px] bg-(--background)  font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="w-7 h-7 rounded-[6px] bg-[#2563EB] text-white font-bold flex items-center justify-center cursor-pointer shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(1, currentPage + 1))}
              className="px-3 py-1 rounded-[6px] bg-(--background)  font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
