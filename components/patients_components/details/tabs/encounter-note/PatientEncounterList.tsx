// components/patients_components/details/tabs/encounter-note/PatientEncounterList.tsx

"use client";

import { useState } from "react";
import { ArrowUpDown, Search, ChevronDown, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

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
  const { encounterColumns } = useColumns();
  return (
    <div className="bg-(--card) space-y-6">
      {/* Header Row (h: 50px, space-between) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Encounter History & Progress Notes
          </h2>
          <p className="text-xs text-(--shade-text) mt-1">
            Review and manage clinical documentation from current and past
            admissions
          </p>
        </div>

        <div className="flex flex-wrap items-stretch gap-3">
          <div className="relative flex gap-2 items-center rounded-md bg-(--background) p-2 border border-(--background) focus-within:border-(--border)">
            <span className="inset-y-0 left-0 flex items-center pointer-events-none text-(--shade-text)">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder="Search Encounter..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-full  bg-transparent text-xs placeholder:text-(--shade-text) outline-0"
            />
          </div>

          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="h-full appearance-none p-2 bg-(--background) rounded-md text-xs outline-none border border-(--background) focus:border-(--border) cursor-pointer"
            >
              <option selected value="all">
                Encounter Type: All
              </option>
              <option value="Inpatient">Encounter Type: Inpatient</option>
              <option value="Emergency">Encounter Type: Emergency</option>
              <option value="Telehealth">Encounter Type: Telehealth</option>
            </select>
            <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-(--shade)">
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </div>

          <button
            type="button"
            onClick={onNewEncounter}
            className="flex items-center gap-1 py-2 pr-4 pl-3 rounded-md bg-(--button) text-(--button-text) text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Encounter Note</span>
          </button>
        </div>
      </div>

      <DataTable
        data={data}
        columns={encounterColumns}
        currentPage={currentPage}
        rowsPerPage={5}
        pagination={true}
        loading={false}
        onPageChange={onPageChange}
        totalPages={Math.ceil(data.length / 5)}
        selectable={false}
        rowKey="id"
        // onRowClick={handleRowClick}
      />
    </div>
  );
}
