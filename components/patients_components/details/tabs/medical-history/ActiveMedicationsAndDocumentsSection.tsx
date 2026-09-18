// src/components/patients_components/details/tabs/medical-history/ActiveMedicationsAndDocumentsSection.tsx
"use client";

import Image from "next/image";
import { Eye, Download } from "lucide-react";

const activeMedications = [
  {
    id: 1,
    name: "Metformin 500mg",
    details: "BID • Oral • Since Oct 12, 2023",
    status: "Active",
  },
  {
    id: 2,
    name: "Atorvastatin 20mg",
    details: "QHS • Oral • Since Oct 12, 2023",
    status: "Active",
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    details: "QD • Oral • Since Jan 15, 2024",
    status: "Active",
  },
  {
    id: 4,
    name: "Aspirin 81mg",
    details: "QD • Oral • Since Feb 10, 2024",
    status: "Active",
  },
];

const keyDocuments = [
  {
    id: 1,
    title: "Endocrinology Consult Note (Sep 20, 2023)",
    fileUrl: "/documents/sample.pdf",
  },
  {
    id: 2,
    title: "Cardiology Stress Test Results (Oct 12, 2023)",
    fileUrl: "/documents/sample.pdf",
  },
  {
    id: 3,
    title: "Annual Eye Exam Report (Nov 05, 2023)",
    fileUrl: "/documents/sample.pdf",
  },
  {
    id: 4,
    title: "Metabolic Panel Laboratory Results (Dec 14, 2023)",
    fileUrl: "/documents/sample.pdf",
  },
  {
    id: 5,
    title: "Dietary & Nutrition Plan Overview (Jan 10, 2024)",
    fileUrl: "/documents/sample.pdf",
  },
  {
    id: 6,
    title: "Endocrinology Follow-up Note (Feb 22, 2024)",
    fileUrl: "/documents/sample.pdf",
  },
];

export function ActiveMedicationsAndDocumentsSection() {
  // Handler to view the PDF in a new tab
  const handleViewPdf = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handler to trigger the download of the PDF
  const handleDownloadPdf = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: Active Medications (Borderless, soft blue tint, clean active label) */}
      <div className="w-full bg-(--card) rounded-2xl shadow-xs p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#0f172a]">
          Active Medications for This Condition
        </h3>

        <div className="max-h-[178px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {activeMedications.map((med) => (
            <div
              key={med.id}
              className="flex items-center justify-between rounded-2xl bg-blue-50/90 p-4 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0f172a]">{med.name}</h4>
                <p className="text-xs font-medium text-(--shade)">
                  {med.details}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                {med.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Key Documents (Borderless blue tinted rows and separate action buttons matching Figma) */}
      <div className="w-full bg-(--card) rounded-2xl  shadow-xs p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#0f172a]">Key Documents</h3>

        <div className="max-h-[268px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {keyDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center gap-2">
              {/* Unified Left Container: Document Title & Icon */}
              <div className="flex items-center gap-3 bg-blue-50/90 hover:bg-blue-50 transition-colors rounded-xl px-4 py-3 min-w-0 flex-1">
                <div className="flex items-center justify-center w-8 h-8  text-white overflow-hidden">
                  <Image
                    src="/icon/pdfIcon.svg"
                    alt="PDF Icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-[#0f172a] truncate">
                  {doc.title}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleViewPdf(doc.fileUrl)}
                  className="flex items-center justify-center h-[50px] w-[50px] rounded-xl bg-blue-50/90 hover:bg-blue-100  transition-colors cursor-pointer shadow-2xs"
                  aria-label="View document"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(doc.fileUrl, doc.title)}
                  className="flex items-center justify-center h-[50px] w-[50px] rounded-xl bg-blue-50/90 hover:bg-blue-100  transition-colors cursor-pointer shadow-2xs"
                  aria-label="Download document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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
