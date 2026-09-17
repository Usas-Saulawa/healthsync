// components/patients_components/details/PatientProfileHeader.tsx

"use client";

import { MoreVertical } from "lucide-react";

interface PatientProfile {
  name: string;
  patientId: string;
  age: number;
  sex: string;
  bloodGroup: string;
  height: string;
  primaryPhysician: string;
  admissionType: "In-Patient" | "Out-Patient";
  riskLevel: "High Risk" | "Low Risk";
  avatarUrl?: string; // Optional custom avatar path
}

interface PatientsProfileHeaderProps {
  patient?: PatientProfile;
}

const mockPatient: PatientProfile = {
  name: "Ahmad Abdulrazaq",
  patientId: "40600",
  age: 29,
  sex: "Male",
  bloodGroup: "O+",
  height: "180cm",
  primaryPhysician: "Dr. Sarah Jenkins",
  admissionType: "In-Patient",
  riskLevel: "High Risk",
  avatarUrl: "/images/profile.jpeg", // Using your project's profile image asset
};

export function PatientsProfileHeader({
  patient = mockPatient,
}: PatientsProfileHeaderProps) {
  return (
    /* Outer section wrapper using matching horizontal padding (px-4 sm:px-6) to align perfectly with the top navigation pill */
    <section className="w-full px-4 sm:px-6">
      <div className="relative flex h-[84px] w-full items-center rounded-[8px] bg-(--card) px-6 shadow-xs ">
        {/* Patient photo & Admission Badge Container */}
        <div className="relative flex shrink-0 items-center justify-center mr-4">
          <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-xl bg-[#FFF2A8] shadow-2xs">
            <img
              src={patient.avatarUrl || "/images/profile.jpeg"}
              alt={patient.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Admission type badge cleanly anchored below the avatar */}
          <span className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1769FF] px-2 py-0.5 text-[9px] font-semibold leading-none text-white shadow-xs">
            {patient.admissionType}
          </span>
        </div>

        {/* Patient information stack */}
        <div className="min-w-0 flex-1 flex flex-col justify-center gap-1.5">
          {/* Name and risk badge */}
          <div className="flex items-center gap-3">
            <h2 className="truncate text-base font-bold tracking-tight text-slate-900">
              {patient.name}
            </h2>

            <span className="inline-flex h-5 items-center rounded-md  bg-rose-50 px-2 text-[10px] font-semibold text-rose-600 shadow-2xs">
              {patient.riskLevel}
            </span>
          </div>

          {/* Patient metadata details row with refined typography colors */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">Patient ID:</span>
              <span className="font-semibold text-slate-700">
                {patient.patientId}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">Age:</span>
              <span className="font-semibold text-slate-700">
                {patient.age}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">Sex:</span>
              <span className="font-semibold text-slate-700">
                {patient.sex}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">Blood group:</span>
              <span className="font-semibold text-slate-700">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">Height:</span>
              <span className="font-semibold text-slate-700">
                {patient.height}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-normal text-slate-400">
                Primary Physician:
              </span>
              <span className="font-semibold text-slate-700">
                {patient.primaryPhysician}
              </span>
            </div>
          </div>
        </div>

        {/* More options button */}
        <button
          type="button"
          aria-label="Patient options"
          className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
        >
          <MoreVertical className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
