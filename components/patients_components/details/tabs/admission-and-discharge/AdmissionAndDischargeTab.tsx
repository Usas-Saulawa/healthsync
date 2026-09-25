// components/patients_components/details/tabs/admission-and-discharge/AdmissionAndDischargeTab.tsx
"use client";

import { useState } from "react";
import { AdmissionRequestModal } from "./AdmissionRequestModal";
import { TransferPatientModal } from "./TransferPatientModal";
import { ReferPatientModal } from "./ReferPatientModal";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

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
  const { admissionColumns } = useColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }
  return (
    <div className="w-full bg-(--card) rounded-xl p-5 flex flex-col gap-6">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Admission & Discharge
          </h2>
          <p className="text-xs text-(--shade) mt-1">
            Manage patient admissions, discharges, transfers, and referrals
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAdmissionModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-(--button) border border-(--button) text-(--button-text) text-sm rounded-md hover:bg-(--primary) transition-colors cursor-pointer"
          >
            <span>Admission Request</span>
          </button>
          <button
            type="button"
            onClick={() => setIsTransferModalOpen(true)}
            className="inline-flex items-center px-4 py-2  border border-(--border) text-sm rounded-md hover:bg-(--card-hover) transition-colors cursor-pointer"
          >
            <span>Transfer Request</span>
          </button>
          <button
            type="button"
            onClick={() => setIsReferralModalOpen(true)}
            className="inline-flex items-center px-4 py-2  border border-(--border) text-sm rounded-md hover:bg-(--card-hover) transition-colors cursor-pointer"
          >
            <span>Refer Patient</span>
          </button>
        </div>
      </div>

      <DataTable
        data={mockAdmissions}
        columns={admissionColumns}
        currentPage={currentPage}
        rowsPerPage={5}
        pagination={true}
        loading={false}
        onPageChange={onPageChange}
        totalPages={Math.ceil(mockAdmissions.length / 5)}
        selectable={false}
        rowKey="id"
        // onRowClick={handleRowClick}
      />

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
