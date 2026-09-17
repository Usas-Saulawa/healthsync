// components/patients_components/details/tabs/oder-and-followUps/OrderOrFollowUpModal.tsx

"use client";

import { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderOrFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "order" | "follow-up";
  onSubmit: (data: any) => void;
}

export function OrderOrFollowUpModal({
  isOpen,
  onClose,
  mode,
  onSubmit,
}: OrderOrFollowUpModalProps) {
  // Form states adaptable to both modes
  const [formData, setFormData] = useState({
    type: mode === "order" ? "Laboratory" : "Office Visit",
    nameOrTest: "",
    department: "Cardiology",
    provider: "Dr. Sarah Jenkins, MD",
    priority: "Routine" as "Routine" | "Urgent" | "STAT" | "ASAP",
    clinicalIndication: "",
    specialInstructions: "",
    frequency: "Once",
    date: "Oct 24, 2023",
    time: "10:00 AM",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
        {/* Modal Box with Custom Scrollbar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-[560px] max-h-[90vh] bg-(--card) rounded-[12px] shadow-xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {mode === "order" ? "Add Order" : "Schedule Follow-Up"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body Container */}
          <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5 custom-scrollbar">
            <form
              id="unified-modal-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Field 1: Order Type / Follow-Up Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {mode === "order" ? "Order Type" : "Follow-Up Type"}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                >
                  {mode === "order" ? (
                    <>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Nursing">Nursing</option>
                      <option value="Medication">Medication</option>
                      <option value="Procedure">Procedure</option>
                    </>
                  ) : (
                    <>
                      <option value="Office Visit">Office Visit</option>
                      <option value="Post-Discharge Cardiology">
                        Post-Discharge Cardiology
                      </option>
                      <option value="Lab Recheck">Lab Recheck</option>
                      <option value="Endocrinology Consult">
                        Endocrinology Consult
                      </option>
                      <option value="Physical Therapy">Physical Therapy</option>
                    </>
                  )}
                </select>
              </div>

              {/* Conditional Field: Department (Mainly for Follow-Up) */}
              {mode === "follow-up" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Endocrinology">Endocrinology</option>
                  </select>
                </div>
              )}

              {/* Field 2: Order Name / Provider Selection */}
              {mode === "order" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Order Name / Test
                  </label>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={formData.nameOrTest}
                    onChange={(e) =>
                      setFormData({ ...formData, nameOrTest: e.target.value })
                    }
                    className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Provider
                  </label>
                  <select
                    value={formData.provider}
                    onChange={(e) =>
                      setFormData({ ...formData, provider: e.target.value })
                    }
                    className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                  >
                    <option value="Dr. Sarah Jenkins, MD">
                      Dr. Sarah Jenkins, MD
                    </option>
                    <option value="Dr. Robert Vance, MD">
                      Dr. Robert Vance, MD
                    </option>
                    <option value="Dr. James Ross, MD">
                      Dr. James Ross, MD
                    </option>
                    <option value="RN Maria Santos">RN Maria Santos</option>
                  </select>
                </div>
              )}

              {/* Priority Selector Pills */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Priority
                </label>
                <div className="flex items-center gap-2">
                  {(
                    [
                      "Routine",
                      "Urgent",
                      "STAT",
                      mode === "order" ? "ASAP" : "ASAP",
                    ] as const
                  ).map((prio) => {
                    const isSelected = formData.priority === prio;
                    return (
                      <button
                        key={prio}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, priority: prio })
                        }
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-blue-50 text-[#1C64F2] border-blue-200 shadow-2xs"
                            : "bg-(--card) text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {prio}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {mode === "order"
                      ? "Scheduled Date & Time"
                      : "Preferred Date"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full h-10 pl-3 pr-9 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                    />
                    <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {mode === "order" ? "Frequency" : "Preferred Time"}
                  </label>
                  {mode === "order" ? (
                    <select
                      value={formData.frequency}
                      onChange={(e) =>
                        setFormData({ ...formData, frequency: e.target.value })
                      }
                      className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                    >
                      <option value="Once">Once</option>
                      <option value="BID">BID (Twice daily)</option>
                      <option value="TID">TID (Three times daily)</option>
                      <option value="Continuous">Continuous</option>
                    </select>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full h-10 pl-3 pr-9 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                      />
                      <Clock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  )}
                </div>
              </div>

              {/* Clinical Indication / Reason */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {mode === "order"
                    ? "Clinical Indication"
                    : "Reason for Follow-Up"}
                </label>
                <input
                  type="text"
                  placeholder={
                    mode === "order"
                      ? "Enter clinical reason for order..."
                      : "Enter reason for follow-up visit..."
                  }
                  value={formData.clinicalIndication}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clinicalIndication: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2]"
                />
              </div>

              {/* Special Instructions / Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Special Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    mode === "order"
                      ? "Additional instructions for the order..."
                      : "Additional instructions or notes..."
                  }
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialInstructions: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-(--card) border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1C64F2] resize-none"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50/75 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-(--card) text-slate-700 border border-slate-200 text-xs font-semibold rounded-[6px] hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="unified-modal-form"
              className="px-5 py-2.5 bg-[#1C64F2] text-white text-xs font-bold rounded-[6px] hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              {mode === "order" ? "Submit Order" : "Schedule Follow-Up"}
            </button>
          </div>
        </motion.div>

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
    </AnimatePresence>
  );
}
