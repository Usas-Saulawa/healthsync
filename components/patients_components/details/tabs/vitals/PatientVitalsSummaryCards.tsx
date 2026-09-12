// components/patients_components/details/tabs/vitals/PatientVitalsSummaryCards.tsx
"use client";

const vitalsCardsData = [
  {
    id: "blood-pressure",
    title: "Blood Pressure",
    current: "150/95 mmHg",
    previous: "165/100 mmHg",
    improvement: "15-point improvement",
    textColor: "text-[#22c55e]",
    barColor: "bg-[#22c55e]",
    progressWidth: "w-4/5",
  },
  {
    id: "heart-rate",
    title: "Heart Rate",
    current: "92bpm",
    previous: "72bpm",
    improvement: "15-point improvement",
    textColor: "text-[#3b82f6]",
    barColor: "bg-[#3b82f6]",
    progressWidth: "w-3/4",
  },
  {
    id: "temperature",
    title: "Temperature",
    current: "98.6",
    previous: "75.5",
    improvement: "15-point improvement",
    textColor: "text-[#a855f7]",
    barColor: "bg-[#a855f7]",
    progressWidth: "w-2/3",
  },
  {
    id: "weight",
    title: "Weight",
    current: "150/95 mmHg",
    previous: "165/100 mmHg",
    improvement: "15-point improvement",
    textColor: "text-[#22c55e]",
    barColor: "bg-[#22c55e]",
    progressWidth: "w-4/5",
  },
];

export function PatientVitalsSummaryCards() {
  return (
    // Restored 4-column row layout across large screens to match the original Figma design
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {vitalsCardsData.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-[16px] shadow-xs p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
        >
          {/* Card Header: Vital Title */}
          <h3 className="text-sm font-bold text-[#0f172a] tracking-tight">
            {card.title}
          </h3>

          {/* Current & Previous Metrics Info */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-normal">Current</span>
              <span
                className={`font-bold text-xs sm:text-sm ${card.textColor}`}
              >
                {card.current}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-normal">Previous</span>
              <span className="text-slate-600 font-semibold text-xs">
                {card.previous}
              </span>
            </div>
          </div>

          {/* Progress Bar & Improvement Footer */}
          <div className="space-y-2 pt-0.5">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${card.barColor} ${card.progressWidth}`}
              />
            </div>
            <p
              className={`text-[10px] font-semibold text-center ${card.textColor}`}
            >
              {card.improvement}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
