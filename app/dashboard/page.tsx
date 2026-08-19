// app/dashboard/page.tsx
"use client";

import { Users, Calendar, ShieldCheck, Wifi, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-xs font-medium text-green-700 border border-green-200 mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            System Secure & Encrypted (Offline Mode Active)
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, Dr. Bashir
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is your daily clinical overview and patient queue summary.
          </p>
        </div>

        {/* Quick Sync Status Badge */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          <div className="text-xs">
            <p className="font-semibold text-gray-900">IndexedDB Synced</p>
            <p className="text-gray-500">Local records up to date</p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">
              Total Patients Today
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
            <span className="text-xs text-green-600 font-medium">
              ↑ 12% from yesterday
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">
              Pending Appointments
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
            <span className="text-xs text-amber-600 font-medium">
              Next in 15 mins
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">
              Critical Reviews
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
            <span className="text-xs text-red-600 font-medium">
              Requires immediate action
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500">Offline Queue</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
            <span className="text-xs text-gray-500 font-medium">
              All changes uploaded
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Wifi className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Recent Activity Table Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Patient Records
          </h3>
          <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
            View All Patients →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 rounded-lg">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Patient Name</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-4 font-medium text-gray-900">
                  Amina Yusuf
                </td>
                <td className="px-4 py-4">Hypertension Check</td>
                <td className="px-4 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Stable
                  </span>
                </td>
                <td className="px-4 py-4">10 mins ago (Cached)</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-medium text-gray-900">
                  John Okafor
                </td>
                <td className="px-4 py-4">Type 2 Diabetes Review</td>
                <td className="px-4 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    Pending Lab Results
                  </span>
                </td>
                <td className="px-4 py-4">1 hour ago (Synced)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
