// components/patients_components/details/tabs/medical-history/add-encounter-modal/tabs/OrderTab.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Calendar, Clock } from "lucide-react";

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
    statusStyle: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    id: 2,
    name: "Annual Eye Exam Referral",
    category: "Consultation",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "24th Oct 2024",
    time: "10:30 pm",
    status: "Pending",
    statusStyle: "bg-amber-50 text-amber-600 border-amber-100",
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
    statusStyle: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export function OrderTab() {
  const [isAllOrdersOpen, setIsAllOrdersOpen] = useState(false);
  const [orderType, setOrderType] = useState("Laboratory");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Routine");
  const [clinicalIndication, setClinicalIndication] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [frequency, setFrequency] = useState("Once");
  const [scheduledDate, setScheduledDate] = useState("Oct 24, 2023");
  const [scheduledTime, setScheduledTime] = useState("10:00 AM");

  const priorities = ["Routine", "Urgent", "STAT", "ASAP"];

  return (
    <div className="space-y-6">
      {/* ALL ORDERS Foldable Section */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-(--card)">
        <button
          type="button"
          onClick={() => setIsAllOrdersOpen(!isAllOrdersOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-left"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
            All Orders
          </span>
          {isAllOrdersOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-500" />
          )}
        </button>

        {isAllOrdersOpen && (
          <div className="p-4 border-t border-slate-200 overflow-x-auto max-h-[240px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse bg-blue-50/90">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                  <th className="pb-3 pl-2">Order Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Ordered By</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {ordersData.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="py-3 pl-2 font-bold text-[#0f172a]">
                      {order.name}
                    </td>
                    <td className="py-3 text-slate-500 font-medium">
                      {order.category}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-[#0f172a]">
                        {order.hospital}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {order.doctor}
                      </p>
                    </td>
                    <td className="py-3 text-slate-500 font-medium">
                      {order.date}
                      <br />
                      <span className="text-[10px] text-slate-400">
                        {order.time}
                      </span>
                    </td>
                    <td className="py-3 pr-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${order.statusStyle}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD ORDER Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
          Add Order
        </h3>

        {/* Order Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Order Type
          </label>
          <div className="relative">
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Laboratory">Laboratory</option>
              <option value="Consultation">Consultation</option>
              <option value="Diagnostics">Diagnostics</option>
              <option value="Examination">Examination</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Order Name / Test */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Order Name / Test
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Priority Pills */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Priority
          </label>
          <div className="flex items-center gap-2">
            {priorities.map((priority) => {
              const isSelected = selectedPriority === priority;
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-blue-50 text-[#2563EB] border-blue-200 shadow-2xs"
                      : "bg-(--card) text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {priority}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clinical Indication */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Clinical Indication
          </label>
          <input
            type="text"
            value={clinicalIndication}
            onChange={(e) => setClinicalIndication(e.target.value)}
            placeholder="Enter clinical reason for order..."
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Special Instructions */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Special Instructions
          </label>
          <textarea
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Additional instructions for the order..."
            className="w-full p-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
          />
        </div>

        {/* Frequency & Scheduled Date & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frequency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Frequency
            </label>
            <div className="relative">
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-(--card) text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="Once">Once</option>
                <option value="Daily">Daily</option>
                <option value="Twice Daily">Twice Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Scheduled Date & Time Container */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Scheduled Date & Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Date Input */}
              <div className="relative">
                <input
                  type="text"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full h-11 pl-3 pr-9 rounded-xl border border-slate-200 bg-(--card) text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Time Input */}
              <div className="relative">
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full h-11 pl-3 pr-9 rounded-xl border border-slate-200 bg-(--card) text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
