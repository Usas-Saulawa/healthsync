// src/components/patients_components/details/tabs/medical-history/RelatedOrdersSection.tsx
"use client";

const ordersData = [
  {
    id: 1,
    name: "HbA1c Test",
    category: "Laboratory",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "24th Oct 2024",
    time: "10:30 pm",
    status: "Unread",
    statusStyle: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    id: 2,
    name: "Comprehensive Metabolic Panel",
    category: "Laboratory",
    hospital: "Turai Hospital",
    doctor: "Dr. Ahmad Musa",
    date: "2nd Sep 2024",
    time: "08:30 pm",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 3,
    name: "Annual Eye Exam Referral",
    category: "Consultation",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "24th Oct 2024",
    time: "10:30 pm",
    status: "Pending",
    statusStyle: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: 4,
    name: "Lipid Profile Panel",
    category: "Laboratory",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "15th Aug 2024",
    time: "09:00 am",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 5,
    name: "Cardiology Stress Test",
    category: "Diagnostics",
    hospital: "Metro Cardiology Group",
    doctor: "Dr. Sarah Jenkins",
    date: "10th Jul 2024",
    time: "02:15 pm",
    status: "Pending",
    statusStyle: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: 6,
    name: "Renal Function Panel",
    category: "Laboratory",
    hospital: "Metro Endocrine Specialists",
    doctor: "Dr. Alan Marcus",
    date: "05. Jun 2024",
    time: "11:00 am",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 7,
    name: "Diabetic Foot Screening",
    category: "Examination",
    hospital: "General Hospital",
    doctor: "Dr. Bashir Musa",
    date: "20th May 2024",
    time: "04:30 pm",
    status: "Unread",
    statusStyle: "bg-sky-50 text-sky-600 border-sky-100",
  },
];

export function RelatedOrdersSection() {
  return (
    <div className="w-full bg-(--card) rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
      <h3 className="text-lg font-bold text-[#0f172a]">Related Orders</h3>

      {/* Scrollable Container capped strictly to 4 items */}
      <div className="max-h-[295px] overflow-y-auto pr-2 custom-scrollbar">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-(--card) z-10">
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="pb-3 pl-2">Order Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Ordered By</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {ordersData.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="py-4 pl-2 font-bold text-[#0f172a]">
                    {order.name}
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                    {order.category}
                  </td>
                  <td className="py-4">
                    <p className="font-semibold text-[#0f172a]">
                      {order.hospital}
                    </p>
                    <p className="text-[11px] text-slate-400">{order.doctor}</p>
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                    {order.date}
                    <br />
                    <span className="text-[10px] text-slate-400">
                      {order.time}
                    </span>
                  </td>
                  <td className="py-4 pr-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${order.statusStyle}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
}
