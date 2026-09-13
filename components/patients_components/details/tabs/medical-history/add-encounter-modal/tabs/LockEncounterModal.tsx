// components/patients_components/details/tabs/medical-history/add-encounter-modal/LockEncounterModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LockEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLock: () => void;
}

export function LockEncounterModal({
  isOpen,
  onClose,
  onConfirmLock,
}: LockEncounterModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lock-encounter-modal-root"
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-8 flex flex-col items-center text-center space-y-6"
          >
            {/* Patient Avatar / Icon */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center shadow-inner">
              {/* Replace with your patient avatar image source if available */}
              <div className="w-full h-full bg-[#fde047] flex items-center justify-center font-bold text-slate-800 text-xl">
                BM
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-[#0f172a]">
                Lock Encounter Note
              </h2>
              <p className="text-xs text-slate-500 max-w-sm">
                You are about to permanently lock this encounter note. This
                action cannot be undone.
              </p>
            </div>

            {/* Encounter Summary Card */}
            <div className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 text-left space-y-2">
              <h4 className="text-xs font-bold text-[#0f172a]">
                Discharge Planning Assessment
              </h4>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span>
                  Type:{" "}
                  <strong className="text-slate-700 font-medium">
                    Inpatient
                  </strong>
                </span>
                <span>
                  Date:{" "}
                  <strong className="text-slate-700 font-medium">
                    Oct 23, 2023
                  </strong>
                </span>
                <span>
                  Provider:{" "}
                  <strong className="text-slate-700 font-medium">
                    Dr. Robert Owens, MD
                  </strong>
                </span>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#2563EB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                Current Status: Signed
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-start gap-3 text-left cursor-pointer group">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-blue-500/20 cursor-pointer"
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 leading-relaxed">
                I confirm that this note is complete and accurate, and I
                understand it cannot be edited after locking.
              </span>
            </label>

            {/* Action Buttons */}
            <div className="flex items-center justify-between w-full pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isChecked}
                onClick={onConfirmLock}
                className={`px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors shadow-xs ${
                  isChecked
                    ? "bg-[#2563EB] hover:bg-blue-700 cursor-pointer"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Lock Note
              </button>
            </div>

            {/* Footer Compliance Notice */}
            <p className="text-[10px] text-slate-400 max-w-xs leading-normal">
              Locked notes become part of the permanent medical record and
              comply with regulatory retention requirements.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
