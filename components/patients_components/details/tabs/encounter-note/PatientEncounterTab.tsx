"use client";

import { useState } from "react";
import { PatientEncounterList, EncounterRow } from "./PatientEncounterList";

const mockEncountersData: EncounterRow[] = [
  {
    id: "1",
    date: "Oct 23, 2023",
    time: "02:15 PM",
    encounterType: "Inpatient",
    title: "Discharge Planning Assessment",
    provider: "Dr. Robert Owens, MD",
    status: "Signed",
  },
  {
    id: "2",
    date: "Oct 23, 2023",
    time: "08:30 AM",
    encounterType: "Inpatient",
    title: "Daily Progress Note – Day 3",
    provider: "Dr. Sarah Jenkins, MD",
    status: "Signed",
  },
  {
    id: "3",
    date: "Oct 21, 2023",
    time: "11:45 PM",
    encounterType: "Emergency",
    title: "ED Admission Note",
    provider: "Dr. James Ross, MD",
    status: "Signed",
  },
  {
    id: "4",
    date: "Oct 20, 2023",
    time: "03:00 PM",
    encounterType: "Telehealth",
    title: "Pre-Admission Telehealth Consult",
    provider: "Dr. Robert Vance, MD",
    status: "Draft",
  },
  {
    id: "5",
    date: "Oct 20, 2023",
    time: "03:00 PM",
    encounterType: "Telehealth",
    title: "Pre-Admission Telehealth Consult",
    provider: "Dr. Robert Vance, MD",
    status: "Draft",
  },
];

export function PatientEncounterTab() {
  const [encounters] = useState<EncounterRow[]>(mockEncountersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const handleNewEncounter = () => {
    console.log("Opening new encounter note creator...");
  };

  // Filter logic based on search and type dropdown
  const filteredEncounters = encounters.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || item.encounterType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full bg-white rounded-[8px] p-6 shadow-xs">
      <PatientEncounterList
        data={filteredEncounters}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onNewEncounter={handleNewEncounter}
      />
    </div>
  );
}
