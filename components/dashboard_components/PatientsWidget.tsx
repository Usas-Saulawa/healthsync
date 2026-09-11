// components/dashboard_components/PatientsWidget.tsx
"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { PatientListItem } from "@/lib/validations/dashboard";
import { mockPatientsList } from "@/mock/mockDashboardData";

interface PatientsWidgetProps {
  patients?: PatientListItem[];
  className?: string;
}

export function PatientsWidget({
  patients = mockPatientsList,
  className = "",
}: PatientsWidgetProps) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-blue-100/50 space-y-6 overflow-hidden ${className}`}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3.5">
          <div className="h-10 w-10 rounded-full bg-blue-50/90 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 fill-blue-600 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Patients
          </h2>
        </div>
        <Link
          href="/dashboard/patients"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
        >
          View All
        </Link>
      </div>

      {/* Table-like Header Labels with proportional scaling columns */}
      <div className="hidden lg:grid grid-cols-[1.4fr_1fr_0.8fr_1.1fr_1.3fr_1fr_0.9fr] gap-3 px-5 text-[10px] xl:text-[11px] font-bold text-slate-400 tracking-wider uppercase">
        <div className="col-span-1">Patient Name</div>
        <div>Hosp No</div>
        <div>Age/Sex</div>
        <div>Ward/Bed</div>
        <div>Primary Diagnosis</div>
        <div>Status</div>
        <div className="text-right pr-2">Insurance</div>
      </div>

      {/* Patients List Container */}
      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr_1.1fr_1.3fr_1fr_0.9fr] items-center bg-blue-50 hover:bg-blue-100/60 transition-all px-5 py-3.5 rounded-2xl gap-3 lg:gap-3 shadow-2xs border border-transparent hover:border-blue-200/50"
          >
            {/* Patient Name with Avatar */}
            <div className="col-span-1 flex items-center space-x-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-amber-200/60 overflow-hidden shrink-0 flex items-center justify-center border border-amber-300/40 shadow-xs">
                <img
                  src="/images/profile.jpeg"
                  alt={patient.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-bold text-slate-900 text-[11px] xl:text-xs truncate">
                {patient.name}
              </span>
            </div>

            {/* Hosp No */}
            <div className="text-[11px] xl:text-xs text-slate-600 font-medium truncate">
              <span className="lg:hidden text-[10px] text-slate-400 font-semibold mr-2">
                Hosp No:
              </span>
              {patient.hospNo}
            </div>

            {/* Age/Sex */}
            <div className="text-[11px] xl:text-xs text-slate-600 font-medium truncate">
              <span className="lg:hidden text-[10px] text-slate-400 font-semibold mr-2">
                Age/Sex:
              </span>
              {patient.ageSex}
            </div>

            {/* Ward/Bed */}
            <div className="text-[11px] xl:text-xs text-slate-600 font-medium truncate">
              <span className="lg:hidden text-[10px] text-slate-400 font-semibold mr-2">
                Ward/Bed:
              </span>
              {patient.wardBed}
            </div>

            {/* Primary Diagnosis */}
            <div className="text-[11px] xl:text-xs font-semibold text-slate-900 truncate">
              <span className="lg:hidden text-[10px] text-slate-400 font-semibold mr-2">
                Diagnosis:
              </span>
              {patient.diagnosis}
            </div>

            {/* Status Badge */}
            <div className="truncate">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#fff3cd] text-[#856404] border border-[#ffeeba] shadow-2xs whitespace-nowrap">
                {patient.status}
              </span>
            </div>

            {/* Insurance */}
            <div className="text-[11px] xl:text-xs text-slate-600 font-medium lg:text-right pr-2 truncate">
              <span className="lg:hidden text-[10px] text-slate-400 font-semibold mr-2">
                Insurance:
              </span>
              {patient.insurance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
