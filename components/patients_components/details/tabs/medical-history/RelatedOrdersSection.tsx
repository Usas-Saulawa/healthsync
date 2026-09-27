// src/components/patients_components/details/tabs/medical-history/RelatedOrdersSection.tsx
"use client";

import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";
import { useState } from "react";

const ordersData = [
  {
    id: 1,
    name: "HbA1c Test",
    category: "Laboratory",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "24th Oct 2024",
    time: "10:30 pm",
    status: "Unread",
    statusStyle: "bg-(--info-card) text-(--info-title)",
  },
  {
    id: 2,
    name: "Comprehensive Metabolic Panel",
    category: "Laboratory",
    hospital: "Turai Hospital",
    doctor: "Dr. Ahmad Musa",
    date: "2nd Sep 2024",
    time: "08:30 pm",
    status: "Completed",
    statusStyle: "bg-(--lab-timeline-bg) text-(--lab-timeline-text)",
  },
  {
    id: 3,
    name: "Annual Eye Exam Referral",
    category: "Consultation",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "24th Oct 2024",
    time: "10:30 pm",
    status: "Pending",
    statusStyle: "bg-(--warning-card) text-(--warning-title)",
  },
  {
    id: 4,
    name: "Lipid Profile Panel",
    category: "Laboratory",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "15th Aug 2024",
    time: "09:00 am",
    status: "Completed",
    statusStyle: "bg-(--lab-timeline-bg) text-(--lab-timeline-text)",
  },
  {
    id: 5,
    name: "Cardiology Stress Test",
    category: "Diagnostics",
    hospital: "Metro Cardiology Group",
    doctor: "Dr. Sarah Jenkins",
    date: "10th Jul 2024",
    time: "02:15 pm",
    status: "Pending",
    statusStyle: "bg-(--warning-card) text-(--warning-title) ",
  },
  {
    id: 6,
    name: "Renal Function Panel",
    category: "Laboratory",
    hospital: "Metro Endocrine Specialists",
    doctor: "Dr. Alan Marcus",
    date: "05. Jun 2024",
    time: "11:00 am",
    status: "Completed",
    statusStyle: "bg-(--lab-timeline-bg) text-(--lab-timeline-text)",
  },
  {
    id: 7,
    name: "Diabetic Foot Screening",
    category: "Examination",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "20th May 2024",
    time: "04:30 pm",
    status: "Unread",
    statusStyle: "bg-(--info-card) text-(--info-title)",
  },
];

export function RelatedOrdersSection() {
  const { orderColumns } = useColumns();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="sm:col-span-5 bg-(--card) rounded-xl p-5 space-y-3 h-full">
      <h3 className="text-lg font-bold">Related Orders</h3>

      {/* Scrollable Container capped strictly to 4 items */}
      <DataTable
        data={ordersData}
        columns={orderColumns}
        currentPage={currentPage}
        rowsPerPage={5}
        pagination={false}
        loading={loading}
        onPageChange={onPageChange}
        totalPages={Math.ceil(ordersData.length / 10)}
        selectable={false}
        rowKey="id"
        // onRowClick={(row) => router.push(`/dashboard/patients/${row.id}`)}
      />
      {/* Best-Practice Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}
