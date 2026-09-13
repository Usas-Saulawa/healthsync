// components/patients_components/details/tabs/medical-history/add-encounter-modal/AddEncounterModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PatientInfoHeader } from "./components/PatientInfoHeader";
import { NoteTab } from "./tabs/NoteTab";
import { OrderTab } from "./tabs/OrderTab";
import { PrescriptionTab } from "./tabs/PrescriptionTab";
import { FollowUpTab } from "./tabs/FollowUpTab";
// import { NurseNotesTab } from "./tabs/NurseNotesTab";

interface AddEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "note" | "order" | "prescription" | "follow-up" | "nurse-notes";

export function AddEncounterModal({ isOpen, onClose }: AddEncounterModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("note");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="encounter-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container optimized to max-w-3xl */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-[#0f172a]">Add Note</h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors shadow-2xs cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" strokeWidth={2.6} />
              </button>
            </div>

            {/* Modal Body / Scrollable Content with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
              {/* Patient Info Header Component */}
              <PatientInfoHeader />

              {/* Tab Navigation Bar with Framer Motion Layout Indicator */}
              <div className="flex items-center gap-8 border-b border-slate-200 text-sm font-semibold">
                {[
                  { id: "note", label: "Note" },
                  { id: "order", label: "Order" },
                  { id: "prescription", label: "Prescription" },
                  { id: "follow-up", label: "Follow-Up" },
                  { id: "nurse-notes", label: "Nurse Notes" },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`pb-3 relative transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#2563EB]"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tab Content Area with Smooth Fade/Slide */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeTab === "note" && <NoteTab />}
                    {activeTab === "order" && <OrderTab />}
                    {activeTab === "prescription" && <PrescriptionTab />}
                    {activeTab === "follow-up" && <FollowUpTab />}
                    {/* {activeTab === "nurse-notes" && <NurseNotesTab />} */}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Modal Footer Actions - Dynamic based on active tab */}
            <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              >
                Cancel
              </button>

              {activeTab === "order" ? (
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Request Order
                </button>
              ) : activeTab === "prescription" ? (
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Submit Prescription
                </button>
              ) : activeTab === "follow-up" ? (
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Request Follow-Up
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                  >
                    Sign & Lock
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

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
    </AnimatePresence>
  );
}
