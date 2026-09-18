// components/patients_components/table/PatientStatusBadge.tsx
"use client";

interface PatientStatusBadgeProps {
  status: string;
}

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const getStatusStyles = (statusVal: string) => {
    switch (statusVal?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-700 border border-red-200";
      case "follow up":
      case "follow-up":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "stable":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "recovering":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "under observation":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "pre-op":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200";
      default:
        return "bg-[#FFF0A6] text-[#D99A00]"; // Active Admitted default style
    }
  };

  return (
    <span
      className={`inline-flex h-[23px] items-center rounded-full px-[11px] text-[10px] font-bold leading-none whitespace-nowrap shadow-2xs ${getStatusStyles(
        status,
      )}`}
    >
      {status || "Active Admitted"}
    </span>
  );
}
