// components/patients_components/details/tabs/oder-and-followUps/OrderAndFollowUpsTab.tsx

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { OrderOrFollowUpModal } from "./OrderOrFollowUpModal";

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

  return (
    <div className="w-full bg-(--card) rounded-[8px] p-10 shadow-xs flex flex-col gap-5">
      {/* Title Row */}
      <div className="flex items-center justify-between w-full h-[64px]">
        <div>
          <h2 className="text-xl font-bold text-[#2563EB] tracking-tight">
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
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4 font-bold" />
          <span>{activeSubTab === "orders" ? "New Order" : "Follow-up"}</span>
        </button>
      </div>

      {/* Sub-tabs Header */}
      <div className="flex items-center gap-2 pb-[1px] relative">
        <button
          type="button"
          onClick={() => setActiveSubTab("orders")}
          className={`relative px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === "orders"
              ? "text-[#1C64F2]"
              : "text-(--shade) hover:"
          }`}
        >
          Orders
          {activeSubTab === "orders" && (
            <motion.div
              layoutId="activeSubTabIndicator"
              className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1C64F2]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("follow-up")}
          className={`relative px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
            activeSubTab === "follow-up"
              ? "text-[#1C64F2]"
              : "text-(--shade) hover:"
          }`}
        >
          Follow-up History
          {activeSubTab === "follow-up" && (
            <motion.div
              layoutId="activeSubTabIndicator"
              className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#1C64F2]"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {activeSubTab === "orders" ? (
        <div className="flex flex-col gap-4">
          <div className="w-full rounded-[6px] overflow-hidden bg-(--card) shadow-2xs">
            <div className="grid grid-cols-12 bg-slate-50/80 px-4 py-3 text-[11px] font-bold text-(--shade) tracking-wider uppercase">
              <div className="col-span-4">Order Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Ordered By</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-1 text-right">Status</div>
            </div>

            <div className="flex flex-col gap-[4px] p-1 bg-(--card)">
              {orders.map((item) => {
                let priorityStyle = "bg-slate-100 ";
                if (item.priority === "STAT")
                  priorityStyle = "bg-red-100 text-red-600 font-bold";
                if (item.priority === "Urgent")
                  priorityStyle = "bg-amber-100 text-amber-700 font-bold";
                if (item.priority === "Routine")
                  priorityStyle = "bg-slate-200  font-semibold";

                let statusStyle = "text-blue-600 font-bold";
                if (item.statusType === "completed") {
                  statusStyle =
                    "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.statusType === "completed-progress") {
                  statusStyle =
                    "bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.statusType === "pending") {
                  statusStyle =
                    "bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.statusType === "pending-approval") {
                  statusStyle =
                    "bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold inline-block whitespace-nowrap shadow-2xs";
                }

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center px-4 py-3.5 bg-(--background) rounded-[6px] text-xs  hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="col-span-4 font-bold ">
                      {item.orderName}
                    </div>
                    <div className="col-span-2 text-slate-600">
                      {item.category}
                    </div>
                    <div className="col-span-2 text-slate-600">
                      {item.orderedBy}
                    </div>
                    <div className="col-span-2 text-slate-600">{item.date}</div>
                    <div className="col-span-1">
                      <span
                        className={`px-2 py-0.5 rounded-[4px] text-[11px] inline-block ${priorityStyle}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className={statusStyle}>{item.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-(--shade) font-medium">
              Showing 1-{orders.length} of {orders.length} orders
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1.5 bg-(--card)  text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="w-8 h-8 text-xs font-semibold rounded-[6px] bg-[#1C64F2] text-white shadow-xs flex items-center justify-center cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className="px-3 py-1.5 bg-(--card)  text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="w-full rounded-[6px] overflow-hidden bg-(--card) shadow-2xs">
            <div className="grid grid-cols-12 bg-slate-50/85 px-4 py-3 text-[11px] font-bold text-(--shade) tracking-wider uppercase">
              <div className="col-span-3">Follow-up Type</div>
              <div className="col-span-2">Scheduled Date</div>
              <div className="col-span-2">Provider</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Notes</div>
            </div>

            <div className="flex flex-col gap-[4px] p-1 bg-(--card)">
              {followUps.map((item) => {
                let statusStyle =
                  "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                if (item.status === "Completed") {
                  statusStyle =
                    "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.status === "Attended") {
                  statusStyle =
                    "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.status === "Missed") {
                  statusStyle =
                    "bg-red-100 text-red-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.status === "Scheduled") {
                  statusStyle =
                    "bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.status === "Cancelled") {
                  statusStyle =
                    "bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                } else if (item.status === "Upcoming") {
                  statusStyle =
                    "bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[11px] font-bold inline-block whitespace-nowrap shadow-2xs";
                }

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center px-4 py-3.5 bg-(--background) rounded-[6px] text-xs  hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="col-span-3 font-bold ">
                      {item.followUpType}
                    </div>
                    <div className="col-span-2 text-slate-600">
                      {item.scheduledDate}
                    </div>
                    <div className="col-span-2 text-slate-600">
                      {item.provider}
                    </div>
                    <div className="col-span-2 text-slate-600">
                      {item.department}
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={statusStyle}>{item.status}</span>
                    </div>
                    <div className="col-span-2 text-right text-(--shade) truncate pl-2">
                      {item.notes}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-(--shade) font-medium">
              Showing 1-{followUps.length} of {followUps.length} follow-ups
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1.5 bg-(--card)  text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="w-8 h-8 text-xs font-semibold rounded-[6px] bg-[#1C64F2] text-white shadow-xs flex items-center justify-center cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, 1))}
                className="px-3 py-1.5 bg-(--card)  text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs border border-slate-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
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
