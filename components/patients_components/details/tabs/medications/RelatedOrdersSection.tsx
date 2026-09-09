// src/components/patients_components/details/tabs/medications/RelatedOrdersSection.tsx
"use client";

export function RelatedOrdersSection() {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
      <h3 className="text-lg font-bold text-[#0f172a]">Related Orders</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
              <th className="pb-3 pl-2">Order Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Ordered By</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 pr-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {/* Row 1 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 pl-2 font-bold text-[#0f172a]">HbA1c Test</td>
              <td className="py-4 text-slate-500 font-medium">Laboratory</td>
              <td className="py-4">
                <p className="font-semibold text-[#0f172a]">General Hospital</p>
                <p className="text-[11px] text-slate-400">Dr. Bashir Musa</p>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                24th Oct 2024
                <br />
                <span className="text-[10px] text-slate-400">10:30 pm</span>
              </td>
              <td className="py-4 pr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-600 border border-sky-100">
                  Unread
                </span>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 pl-2 font-bold text-[#0f172a]">
                Comprehensive Metabolic Panel
              </td>
              <td className="py-4 text-slate-500 font-medium">Laboratory</td>
              <td className="py-4">
                <p className="font-semibold text-[#0f172a]">Turai Hospital</p>
                <p className="text-[11px] text-slate-400">Dr. Ahmad Musa</p>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                2nd Sep 2024
                <br />
                <span className="text-[10px] text-slate-400">08:30 pm</span>
              </td>
              <td className="py-4 pr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Completed
                </span>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 pl-2 font-bold text-[#0f172a]">
                Annual Eye Exam Referral
              </td>
              <td className="py-4 text-slate-500 font-medium">Consultation</td>
              <td className="py-4">
                <p className="font-semibold text-[#0f172a]">General Hospital</p>
                <p className="text-[11px] text-slate-400">Dr. Bashir Musa</p>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                24th Oct 2024
                <br />
                <span className="text-[10px] text-slate-400">10:30 pm</span>
              </td>
              <td className="py-4 pr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                  Pending
                </span>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 pl-2 font-bold text-[#0f172a]">
                Annual Eye Exam Referral
              </td>
              <td className="py-4 text-slate-500 font-medium">Consultation</td>
              <td className="py-4">
                <p className="font-semibold text-[#0f172a]">General Hospital</p>
                <p className="text-[11px] text-slate-400">Dr. Bashir Musa</p>
              </td>
              <td className="py-4 text-slate-500 font-medium">
                24th Oct 2024
                <br />
                <span className="text-[10px] text-slate-400">10:30 pm</span>
              </td>
              <td className="py-4 pr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
