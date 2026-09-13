// components/patients_components/details/tabs/admission-and-discharge/AdmissionAndDischargeTab.tsx
"use client";

import { useState } from "react";
import { AdmissionRequestModal } from "./AdmissionRequestModal";
import { TransferPatientModal } from "./TransferPatientModal";
import { ReferPatientModal } from "./ReferPatientModal";

interface AdmissionItem {
  id: string;
  date: string;
  type: "Admission" | "Transfer" | "Referral";
  wardOrDepartment: string;
  provider: string;
  status: "Pending Approval" | "Declined" | "Discharged" | "Completed";
  statusType: "pending" | "declined" | "discharged" | "completed";
}

const mockAdmissions: AdmissionItem[] = [
  {
    id: "1",
    date: "Oct 24, 2023",
    type: "Admission",
    wardOrDepartment: "Cardiology A",
    provider: "Dr. Sarah Jenkins, MD",
    status: "Pending Approval",
    statusType: "pending",
  },
  {
    id: "2",
    date: "Oct 20, 2023",
    type: "Admission",
    wardOrDepartment: "ICU - Bed 3",
    provider: "Dr. James Rose, MD",
    status: "Declined",
    statusType: "declined",
  },
  {
    id: "3",
    date: "Oct 15, 2023",
    type: "Admission",
    wardOrDepartment: "Cardiology A - Bed 12",
    provider: "Dr. Sarah Jenkins, MD",
    status: "Discharged",
    statusType: "discharged",
  },
  {
    id: "4",
    date: "Jun 22, 2023",
    type: "Admission",
    wardOrDepartment: "General Medicine - Bed 5",
    provider: "Dr. James Rose, MD",
    status: "Discharged",
    statusType: "discharged",
  },
  {
    id: "5",
    date: "Mar 10, 2023",
    type: "Transfer",
    wardOrDepartment: "Orthopedics → Cardiology A",
    provider: "Dr. Clara Sterling, MD",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "6",
    date: "Jan 05, 2023",
    type: "Referral",
    wardOrDepartment: "Endocrinology",
    provider: "Dr. Alan Marcus, MD",
    status: "Completed",
    statusType: "completed",
  },
];

export function AdmissionAndDischargeTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-[8px] px-10 py-5 shadow-xs flex flex-col gap-5">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full h-[64px]">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
            Admission & Discharge
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage patient admissions, discharges, transfers, and referrals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAdmissionModalOpen(true)}
            className="inline-flex items-center px-4 py-2.5 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <span>Admission Request</span>
          </button>
          <button
            type="button"
            onClick={() => setIsTransferModalOpen(true)}
            className="inline-flex items-center px-4 py-2.5 bg-app-bg text-slate-700 border border-slate-200 text-xs font-bold rounded-[6px] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Transfer Request</span>
          </button>
          <button
            type="button"
            onClick={() => setIsReferralModalOpen(true)}
            className="inline-flex items-center px-4 py-2.5 bg-app-bg text-slate-700 border border-slate-200 text-xs font-bold rounded-[6px] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Refer Patient</span>
          </button>
        </div>
      </div>

      {/* Table Container with gap-[4px] */}
      <div className="w-full rounded-[6px] overflow-hidden bg-white shadow-2xs flex flex-col gap-[4px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-slate-50/80 px-4 py-3 text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b border-slate-100">
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-4">Ward / Department</div>
          <div className="col-span-3">Provider</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col bg-white gap-[4px]">
          {mockAdmissions.map((item) => {
            let statusStyle = "";
            if (item.statusType === "pending") {
              statusStyle =
                "bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold inline-block whitespace-nowrap shadow-2xs";
            } else if (item.statusType === "declined") {
              statusStyle =
                "bg-red-100 text-red-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
            } else if (item.statusType === "discharged") {
              statusStyle =
                "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
            } else if (item.statusType === "completed") {
              statusStyle =
                "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
            }

            return (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center px-4 py-3.5 bg-app-bg border-b border-slate-100 text-xs text-slate-900 hover:bg-slate-100/60 transition-colors"
              >
                <div className="col-span-2 font-medium text-slate-700">
                  {item.date}
                </div>
                <div className="col-span-2 font-bold text-[#1C64F2]">
                  {item.type}
                </div>
                <div className="col-span-4 font-medium text-slate-800">
                  {item.wardOrDepartment}
                </div>
                <div className="col-span-3 font-medium text-slate-600">
                  {item.provider}
                </div>
                <div className="col-span-1 text-right">
                  <span className={statusStyle}>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 h-[46px]">
        <span className="text-xs text-slate-500 font-medium">
          Showing 1-5 of 24 patients
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer flex items-center justify-center ${
              currentPage === 1
                ? "bg-[#1C64F2] text-white shadow-xs"
                : "bg-app-bg text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer flex items-center justify-center ${
              currentPage === 2
                ? "bg-[#1C64F2] text-white shadow-xs"
                : "bg-app-bg text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 2))}
            className="px-3 py-1.5 bg-app-bg text-slate-700 text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
          >
            Next
          </button>
        </div>
      </div>

      {/* Admission Request Modal */}
      <AdmissionRequestModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
      />

      {/* Transfer Patient Modal */}
      <TransferPatientModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />

      {/* Refer Patient Modal */}
      <ReferPatientModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />
    </div>
  );
}
