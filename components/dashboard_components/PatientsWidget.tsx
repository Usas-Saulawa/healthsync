// components/dashboard_components/PatientsWidget.tsx
"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { PatientListItem } from "@/lib/validations/dashboard";
import { mockPatientsList } from "@/mock/mockDashboardData";

interface PatientsWidgetProps {
  patients?: PatientListItem[];
  className?: string; // Allows dynamic grid spanning when placed next to other widgets
}

export function PatientsWidget({
  patients = mockPatientsList,
  className = "",
}: PatientsWidgetProps) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-blue-100/50 space-y-6 ${className}`}
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
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Table-like Header Labels */}
      <div className="hidden lg:grid grid-cols-7 px-6 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
        <div className="col-span-1">Patient Name</div>
        <div>Hosp No</div>
        <div>Age/Sex</div>
        <div>Ward/Bed</div>
        <div>Primary Diagnosis</div>
        <div>Status</div>
        <div className="text-right pr-2">Insurance</div>
      </div>

      {/* Patients List Container as Separated Floating Row Cards */}
      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="grid grid-cols-1 lg:grid-cols-7 items-center bg-blue-50 hover:bg-blue-100/60 transition-all px-6 py-4 rounded-2xl gap-4 lg:gap-0 shadow-2xs border border-transparent hover:border-blue-200/50"
          >
            {/* Patient Name with Avatar */}
            <div className="col-span-1 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-amber-200/60 overflow-hidden flex-shrink-0 flex items-center justify-center border border-amber-300/40 shadow-xs">
                {/* Clean Avatar Graphic */}
                <svg
                  className="w-full h-full text-amber-800"
                  viewBox="0 0 36 36"
                  fill="currentColor"
                >
                  <path d="M18 16c3.313 0 6-2.687 6-6s-2.687-6-6-6-6 2.687-6 6 2.687 6 6 6zm0 3c-4.418 0-12 2.239-12 6.667V30h24v-4.333C30 21.239 22.418 19 18 19z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-sm whitespace-nowrap">
                {patient.name}
              </span>
            </div>

            {/* Hosp No */}
            <div className="text-sm text-slate-600 font-medium whitespace-nowrap">
              <span className="lg:hidden text-xs text-slate-400 font-semibold mr-2">
                Hosp No:
              </span>
              {patient.hospNo}
            </div>

            {/* Age/Sex */}
            <div className="text-sm text-slate-600 font-medium whitespace-nowrap">
              <span className="lg:hidden text-xs text-slate-400 font-semibold mr-2">
                Age/Sex:
              </span>
              {patient.ageSex}
            </div>

            {/* Ward/Bed */}
            <div className="text-sm text-slate-600 font-medium whitespace-nowrap">
              <span className="lg:hidden text-xs text-slate-400 font-semibold mr-2">
                Ward/Bed:
              </span>
              {patient.wardBed}
            </div>

            {/* Primary Diagnosis */}
            <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
              <span className="lg:hidden text-xs text-slate-400 font-semibold mr-2">
                Diagnosis:
              </span>
              {patient.diagnosis}
            </div>

            {/* Status Badge */}
            <div className="whitespace-nowrap">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#fff3cd] text-[#856404] border border-[#ffeeba] shadow-2xs">
                {patient.status}
              </span>
            </div>

            {/* Insurance */}
            <div className="text-sm text-slate-600 font-medium lg:text-right pr-2 whitespace-nowrap">
              <span className="lg:hidden text-xs text-slate-400 font-semibold mr-2">
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
