// components/patients_components/details/tabs/oder-and-followUps/OrderAndFollowUpsTab.tsx

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { OrderOrFollowUpModal } from "./OrderOrFollowUpModal";
import { DataTable } from "@/components/ui/Table";
import useColumns from "@/hooks/addons/useColumns";

interface OrderItem {
  id: string;
  orderName: string;
  category: string;
  orderedBy: string;
  date: string;
  priority: "Routine" | "Urgent" | "STAT";
  status: string;
  statusType:
    | "completed-progress"
    | "completed"
    | "pending"
    | "pending-approval";
}

interface FollowUpItem {
  id: string;
  followUpType: string;
  scheduledDate: string;
  provider: string;
  department: string;
  status:
    | "Attended"
    | "Completed"
    | "Missed"
    | "Scheduled"
    | "Cancelled"
    | "Upcoming";
  notes: string;
}

const initialMockOrders: OrderItem[] = [
  {
    id: "1",
    orderName: "Wound Care Assessment",
    category: "Nursing",
    orderedBy: "Dr. Sarah Jenkins, MD",
    date: "Oct 24, 2023",
    priority: "Routine",
    status: "2/3 Completed",
    statusType: "completed-progress",
  },
  {
    id: "2",
    orderName: "Complete Blood Count (CBC)",
    category: "Laboratory",
    orderedBy: "Dr. Sarah Jenkins, MD",
    date: "Oct 24, 2023",
    priority: "STAT",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "3",
    orderName: "Chest X-Ray PA/Lateral",
    category: "Radiology",
    orderedBy: "Dr. Robert Vance, MD",
    date: "Oct 23, 2023",
    priority: "Urgent",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "4",
    orderName: "Metformin 500mg BID",
    category: "Medication",
    orderedBy: "Dr. Sarah Jenkins, MD",
    date: "Oct 24, 2023",
    priority: "Routine",
    status: "1/2 Completed",
    statusType: "completed-progress",
  },
  {
    id: "5",
    orderName: "Central Line Insertion",
    category: "Procedure",
    orderedBy: "Dr. James Ross, MD",
    date: "Oct 22, 2023",
    priority: "Urgent",
    status: "Completed",
    statusType: "completed",
  },
  {
    id: "6",
    orderName: "Cardiology Consult",
    category: "Consultation",
    orderedBy: "Dr. Robert Vance, MD",
    date: "Oct 23, 2023",
    priority: "Routine",
    status: "Pending",
    statusType: "pending",
  },
  {
    id: "7",
    orderName: "ICU to Step-Down Transfer",
    category: "Transfer",
    orderedBy: "Dr. Sarah Jenkins, MD",
    date: "Oct 23, 2023",
    priority: "Routine",
    status: "Pending Approval",
    statusType: "pending-approval",
  },
];

const initialMockFollowUps: FollowUpItem[] = [
  {
    id: "1",
    followUpType: "Post-Discharge Cardiology",
    scheduledDate: "Nov 07, 2023, 10:00 AM",
    provider: "Dr. Sarah Jenkins, MD",
    department: "Cardiology",
    status: "Attended",
    notes: "BP stable, continued current medica...",
  },
  {
    id: "2",
    followUpType: "Lab Recheck — Potassium",
    scheduledDate: "Nov 01, 2023, 8:30 AM",
    provider: "Dr. Robert Vance, MD",
    department: "Laboratory",
    status: "Completed",
    notes: "Potassium normalized at 4.1 mEq/L",
  },
  {
    id: "3",
    followUpType: "Wound Care Follow-up",
    scheduledDate: "Oct 30, 2023, 2:00 PM",
    provider: "RN Maria Santos",
    department: "Nursing",
    status: "Missed",
    notes: "Patient did not attend. Rescheduled...",
  },
  {
    id: "4",
    followUpType: "Endocrinology Consult",
    scheduledDate: "Nov 14, 2023, 11:00 AM",
    provider: "Dr. Alan Marcus, MD",
    department: "Endocrinology",
    status: "Scheduled",
    notes: "Diabetes management review",
  },
  {
    id: "5",
    followUpType: "Physical Therapy Session",
    scheduledDate: "Nov 10, 2023, 3:00 PM",
    provider: "PT David Chen",
    department: "Rehabilitation",
    status: "Scheduled",
    notes: "Post-knee arthroplasty rehab — ses...",
  },
  {
    id: "6",
    followUpType: "Surgical Follow-up",
    scheduledDate: "Oct 28, 2023, 9:00 AM",
    provider: "Dr. James Ross, MD",
    department: "Orthopedics",
    status: "Attended",
    notes: "Incision healing well. Sutures remov...",
  },
  {
    id: "7",
    followUpType: "Telehealth Check-in",
    scheduledDate: "Oct 25, 2023, 4:00 PM",
    provider: "Dr. Sarah Jenkins, MD",
    department: "Cardiology",
    status: "Cancelled",
    notes: "Cancelled by patient — rescheduled...",
  },
  {
    id: "8",
    followUpType: "Medication Review",
    scheduledDate: "Nov 21, 2023, 10:30 AM",
    provider: "Dr. Robert Vance, MD",
    department: "Internal Medicine",
    status: "Upcoming",
    notes: "Review Metformin dosage and lipid...",
  },
];

export function PatientOrderAndFollowUpsTab() {
  const { orderTabColumns, followUpColumns } = useColumns();
  const [activeSubTab, setActiveSubTab] = useState<"orders" | "follow-up">(
    "orders",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [orders, setOrders] = useState<OrderItem[]>(initialMockOrders);
  const [followUps, setFollowUps] =
    useState<FollowUpItem[]>(initialMockFollowUps);

  const handleModalSubmit = (data: any) => {
    if (activeSubTab === "orders") {
      const newOrder: OrderItem = {
        id: String(orders.length + 1),
        orderName: data.nameOrTest || "New Clinical Order",
        category: data.type,
        orderedBy: "Dr. Current User, MD",
        date: data.date,
        priority: data.priority === "ASAP" ? "Urgent" : data.priority,
        status: "Pending",
        statusType: "pending",
      };
      setOrders([newOrder, ...orders]);
    } else {
      const newFollowUp: FollowUpItem = {
        id: String(followUps.length + 1),
        followUpType: data.type,
        scheduledDate: `${data.date}, ${data.time}`,
        provider: data.provider,
        department: data.department,
        status: "Scheduled",
        notes:
          data.clinicalIndication ||
          data.specialInstructions ||
          "Scheduled via portal",
      };
      setFollowUps([newFollowUp, ...followUps]);
    }
  };
  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="w-full bg-(--card) rounded-xl p-5 shadow-xs flex flex-col gap-5">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Orders & Follow-up
          </h2>
          <p className="text-xs text-(--shade) mt-1">
            Track and manage all clinical orders and patient follow-up
            appointments
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 py-2 pr-4 pl-3 rounded-md bg-(--button) text-(--button-text) text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4 font-bold" />
          <span>{activeSubTab === "orders" ? "New Order" : "Follow-up"}</span>
        </button>
      </div>

      {/* Sub-tabs Header */}
      <div className="flex items-center gap-2 pb-px relative">
        <button
          type="button"
          onClick={() => setActiveSubTab("orders")}
          className={`relative px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === "orders"
              ? "text-(--primary)"
              : "text-(--shade-text)"
          }`}
        >
          Orders
          {activeSubTab === "orders" && (
            <motion.div
              layoutId="activeSubTabIndicator"
              className="absolute -bottom-px left-0 right-0 h-0.5 bg-(--primary)"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("follow-up")}
          className={`relative px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === "follow-up"
              ? "text-(--primary)"
              : "text-(--shade-text)"
          }`}
        >
          Follow-up History
          {activeSubTab === "follow-up" && (
            <motion.div
              layoutId="activeSubTabIndicator"
              className="absolute -bottom-px left-0 right-0 h-0.5 bg-(--primary)"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {activeSubTab === "orders" ? (
        <DataTable
          data={orders}
          columns={orderTabColumns}
          currentPage={currentPage}
          rowsPerPage={5}
          pagination={true}
          loading={false}
          onPageChange={onPageChange}
          totalPages={Math.ceil(orders.length / 5)}
          selectable={false}
          rowKey="id"
          // onRowClick={handleRowClick}
        />
      ) : (
        <DataTable
          data={followUps}
          columns={followUpColumns}
          currentPage={currentPage}
          rowsPerPage={5}
          pagination={true}
          loading={false}
          onPageChange={onPageChange}
          totalPages={Math.ceil(orders.length / 5)}
          selectable={false}
          rowKey="id"
          // onRowClick={handleRowClick}
        />
      )}

      {/* Reusable Unified Modal Component */}
      <OrderOrFollowUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={activeSubTab === "orders" ? "order" : "follow-up"}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
