// components/patients_components/details/tabs/medications/AddPrescriptionModal.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown } from "lucide-react";

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddPrescriptionModal({
  isOpen,
  onClose,
  onSubmit,
}: AddPrescriptionModalProps) {
  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    route: "Oral",
    frequency: "Once Daily",
    durationNumber: "7",
    durationUnit: "Days",
    quantity: "30",
    refills: "0",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Centered Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[580px] bg-(--card) rounded-2xl shadow-xl overflow-hidden z-10 border border-slate-100"
          >
            {/* Modal Header (Figma specs: h: 61px, padding: 20px top, 24px sides, 16px bottom, border-bottom 1px solid #E5E7EB) */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#E5E7EB]">
              <h3 className="text-base font-bold text-slate-900">
                Add Prescription
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Medication Name Field (width: 532px inner / full container match) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Medication Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search medications..."
                    value={formData.medicationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicationName: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-4 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Grid Fields Group (2-column split for 258px width tokens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dosage */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500mg"
                    value={formData.dosage}
                    onChange={(e) =>
                      setFormData({ ...formData, dosage: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                {/* Route */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Route
                  </label>
                  <div className="relative">
                    <select
                      value={formData.route}
                      onChange={(e) =>
                        setFormData({ ...formData, route: e.target.value })
                      }
                      className="w-full appearance-none px-3.5 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer"
                    >
                      <option value="Oral">Oral</option>
                      <option value="Intravenous">Intravenous</option>
                      <option value="Topical">Topical</option>
                      <option value="Inhalation">Inhalation</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Frequency
                  </label>
                  <div className="relative">
                    <select
                      value={formData.frequency}
                      onChange={(e) =>
                        setFormData({ ...formData, frequency: e.target.value })
                      }
                      className="w-full appearance-none px-3.5 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer"
                    >
                      <option value="Once Daily">Once Daily</option>
                      <option value="Twice Daily">Twice Daily</option>
                      <option value="Thrice Daily">Thrice Daily</option>
                      <option value="As Needed">As Needed</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.durationNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                    <div className="relative">
                      <select
                        value={formData.durationUnit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            durationUnit: e.target.value,
                          })
                        }
                        className="w-full appearance-none px-3 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 cursor-pointer"
                      >
                        <option value="Days">Days</option>
                        <option value="Weeks">Weeks</option>
                        <option value="Months">Months</option>
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                {/* Refills */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Refills
                  </label>
                  <input
                    type="text"
                    value={formData.refills}
                    onChange={(e) =>
                      setFormData({ ...formData, refills: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Pharmacy Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Pharmacy Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Additional notes for the pharmacy..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full p-3 bg-(--card) border border-slate-200 rounded-[8px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none"
                />
              </div>

              {/* Footer Buttons with clean bottom padding and no border line */}
              <div className="flex items-center justify-end gap-3 pt-2 pb-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-[8px] border border-slate-200 bg-(--card) text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-[8px] bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  Submit Prescription
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
