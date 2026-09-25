export default function VitalsCard() {
  return (
    <div className="col-span-1 sm:col-span-2 h-full bg-(--card) rounded-xl p-5 space-y-3">
      {/* Section Title */}
      <h3 className="text-lg font-bold">Vitals</h3>

      {/* Vitals Cards Container */}
      <div className="space-y-3">
        {/* Card A: Latest HbA1c */}
        <div className="w-full rounded-md bg-(--info-card)  p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-(--shade-text)">
              Latest HbA1c
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-(--lab-timeline-text)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--lab-timeline-text)" />
              <span>↓ Improving</span>
            </div>
          </div>
          <div className="">
            <p className="text-2xl font-extrabold text-(--lab-timeline-text) tracking-tight">
              6.7%
            </p>
            <p className="text-xs font-medium text-(--shade) mt-0.5">
              Target: &lt; 7.0%
            </p>
          </div>
        </div>

        {/* Card B: Fasting Glucose */}
        <div className="w-full rounded-md bg-(--info-card) p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-(--shade-text)">
              Fasting Glucose
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-(--lab-timeline-text)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--lab-timeline-text)" />
              <span>↓ Improving</span>
            </div>
          </div>
          <div className="">
            <p className="text-2xl font-extrabold tracking-tight">118 mg/dL</p>
            <p className="text-xs font-medium text-(--shade) mt-0.5">
              Normal: 70-99 mg/dL
            </p>
          </div>
        </div>

        {/* Card C: BMI */}
        <div className="w-full rounded-md bg-(--info-card)  p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-(--shade-text)">BMI</span>
            <span className="text-xs font-bold text-(--warning-text)">
              Overweight
            </span>
          </div>
          <div className="">
            <p className="text-2xl font-extrabold text-(--warning-text) tracking-tight">
              28.4
            </p>
            <p className="text-[11px] font-medium text-(--shade) mt-0.5">
              Target: &lt; 25.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
