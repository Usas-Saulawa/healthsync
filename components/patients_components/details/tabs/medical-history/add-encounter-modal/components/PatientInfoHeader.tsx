// components/patients_components/details/tabs/medical-history/add-encounter-modal/components/PatientInfoHeader.tsx
"use client";

interface PatientInfoHeaderProps {
  patientName?: string;
  gender?: string;
  dob?: string;
  time?: string;
  date?: string;
  location?: string;
  doctorName?: string;
  status?: string;
  avatarUrl?: string;
}

export function PatientInfoHeader({
  patientName = "Bashir Musa",
  gender = "Male",
  dob = "10/11/1995",
  time = "09:30 AM",
  date = "Oct 24, 2023",
  location = "Cardiology A - Bed 12",
  doctorName = "Dr. Sarah Jenkins, MD",
  status = "In-Patient",
  avatarUrl = "/images/profile.jpeg",
}: PatientInfoHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
      {/* Left side: Avatar + Status Pill + Details */}
      <div className="flex items-center gap-4">
        {/* Avatar Container with Status Badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#FFF3A6] shadow-xs">
            <img
              src={avatarUrl}
              alt={patientName}
              className="h-full w-full object-cover"
            />
          </div>
          <span
            className="
              px-3 
              py-1 
              rounded-full 
              bg-[#2563EB] 
              text-white 
              text-[11px] 
              font-semibold 
              tracking-wide 
              shadow-xs
              whitespace-nowrap
            "
          >
            {status}
          </span>
        </div>

        {/* Patient Details Metadata */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold tracking-tight text-[#111827]">
            {patientName}
          </h3>

          {/* Row 1: Demographics & Timestamps */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-[#4B5563]">
            <span>
              {gender}, {dob}
            </span>
            <span className="text-slate-300">•</span>
            <span>{time}</span>
            <span className="text-slate-300">•</span>
            <span>{date}</span>
          </div>

          {/* Row 2: Location & Doctor */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-[#4B5563]">
            <span className="text-[#1F2937] font-semibold">{location}</span>
            <span className="text-slate-300">•</span>
            <span>{doctorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
