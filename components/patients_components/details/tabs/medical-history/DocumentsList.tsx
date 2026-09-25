// src/components/patients_components/details/tabs/medical-history/ActiveMedicationsAndDocumentsSection.tsx
"use client";

import Image from "next/image";
import { Eye, Download } from "lucide-react";

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

export function DocumentsList() {
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
    <div className="col-span-1 sm:col-span-2 bg-(--card) rounded-xl p-5 space-y-3">
      <h3 className="text-lg font-bold">Key Documents</h3>

      <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
        {keyDocuments.map((doc) => (
          <div key={doc.id} className="flex items-stretch gap-3">
            {/* Unified Left Container: Document Title & Icon */}
            <div className="flex items-center gap-2 bg-(--info-card) hover:bg-(--table-card-hover) transition-colors rounded-md px-2 py-2 min-w-0 flex-1">
              <div className="flex items-center justify-center w-6 h-6  text-white overflow-hidden">
                <Image
                  src="/icon/pdfIcon.svg"
                  alt="PDF Icon"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="text-xs font-semibold truncate">
                {doc.title}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-stretch gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleViewPdf(doc.fileUrl)}
                className="flex items-center justify-center rounded-md bg-(--info-card) hover:bg-(--table-card-hover) px-3  transition-colors cursor-pointer shadow-2xs"
                aria-label="View document"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPdf(doc.fileUrl, doc.title)}
                className="flex items-center justify-center rounded-md bg-(--info-card) hover:bg-(--table-card-hover) px-3  transition-colors cursor-pointer shadow-2xs"
                aria-label="Download document"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
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
