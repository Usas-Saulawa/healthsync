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
}

interface PatientsProfileHeaderProps {
  patient?: PatientProfile;
}

const mockPatient: PatientProfile = {
  name: "Ahmad Abdulrazaq",
  patientId: "40600",
  age: 29,
  sex: "Male",
  bloodGroup: "Male",
  height: "180cm",
  primaryPhysician: "180cm",
  admissionType: "In-Patient",
  riskLevel: "High Risk",
};

export function PatientsProfileHeader({
  patient = mockPatient,
}: PatientsProfileHeaderProps) {
  return (
    <section className="w-full px-0">
      <div className="relative flex h-[76px] w-full items-center rounded-[8px] bg-white px-[16px]">
        {/* Patient photo */}
        <div className="relative flex h-[48px] w-[48px] shrink-0 items-center justify-center">
          <div className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[7px] bg-[#FFF3A8]">
            {/* Temporary patient avatar. Replace this with the real patient image later. */}
            <svg
              viewBox="0 0 48 48"
              className="h-[45px] w-[45px]"
              aria-hidden="true"
            >
              <circle cx="24" cy="17" r="9" fill="#321500" />
              <path
                d="M13 42c.7-9.1 5.2-14 11-14s10.3 4.9 11 14"
                fill="#321500"
              />
              <path
                d="M15.5 16.5c.4-6.2 4-10 8.8-10 5.3 0 8.7 4 8.7 9.5-.8-1.3-2.3-2.5-4.4-3.1-3.1 2.2-7.6 3.1-13.1 3.6Z"
                fill="#170B02"
              />
              <circle cx="20.5" cy="18" r="1" fill="#fff" />
              <circle cx="27.5" cy="18" r="1" fill="#fff" />
              <path
                d="M21 22.5c1.7 1.3 4.3 1.3 6 0"
                stroke="#170B02"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Admission type badge */}
          <span className="absolute -bottom-[4px] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#1769FF] px-[7px] py-[2px] text-[8px] font-medium leading-[10px] text-white">
            {patient.admissionType}
          </span>
        </div>

        {/* Patient information */}
        <div className="ml-[13px] min-w-0 flex-1 self-stretch py-[15px]">
          {/* Name and risk */}
          <div className="flex h-[21px] items-start gap-[10px]">
            <h2 className="truncate text-[14px] font-bold leading-[18px] text-[#111827]">
              {patient.name}
            </h2>

            <span className="mt-[1px] inline-flex h-[14px] shrink-0 items-center rounded-[3px] border border-[#F5C7C7] bg-[#FFF5F5] px-[6px] text-[7px] font-medium leading-none text-[#F04444]">
              {patient.riskLevel}
            </span>
          </div>

          {/* Patient details */}
          <div className="flex items-center gap-[10px] whitespace-nowrap text-[9px] leading-[13px]">
            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Patient ID:</span>
              <span className="font-medium text-[#5F6C7D]">
                {patient.patientId}
              </span>
            </div>

            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Age:</span>
              <span className="font-medium text-[#5F6C7D]">{patient.age}</span>
            </div>

            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Sex:</span>
              <span className="font-medium text-[#5F6C7D]">{patient.sex}</span>
            </div>

            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Blood group:</span>
              <span className="font-medium text-[#5F6C7D]">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Height:</span>
              <span className="font-medium text-[#5F6C7D]">
                {patient.height}
              </span>
            </div>

            <div className="flex items-center gap-[3px]">
              <span className="text-[#7B8798]">Primary Physician:</span>
              <span className="font-medium text-[#5F6C7D]">
                {patient.primaryPhysician}
              </span>
            </div>
          </div>
        </div>

        {/* More options */}
        <button
          type="button"
          aria-label="Patient options"
          className="ml-auto flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#F4F7FB] hover:text-[#334155]"
        >
          <MoreVertical className="h-[16px] w-[16px]" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
