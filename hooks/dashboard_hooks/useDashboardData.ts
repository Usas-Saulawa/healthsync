// hooks/dashboard_hooks/useDashboardData.ts
"use client";

import { useState, useEffect } from "react";
import {
  mockDashboardMetrics,
  mockPatientsList,
  mockFollowUps,
} from "@/mock/mockDashboardData";

// TOGGLE FLAG: Set to true when your friend's backend API endpoints are live!
const USE_LIVE_API = false;

export function useDashboardData() {
  const [data, setData] = useState({
    metrics: mockDashboardMetrics,
    patients: mockPatientsList,
    followUps: mockFollowUps,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        if (USE_LIVE_API) {
          // --- REAL NEXT.JS API CALL ---
          const response = await fetch("/api/dashboard", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok)
            throw new Error("Failed to fetch live EHR server data.");
          const result = await response.json();
          setData(result);
        } else {
          // --- SIMULATED OFFLINE/MOCK DATA FALLBACK ---
          await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency
          setData({
            metrics: mockDashboardMetrics,
            patients: mockPatientsList,
            followUps: mockFollowUps,
          });
        }
      } catch (err: any) {
        console.error("Dashboard data sync error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return { data, isLoading, error, USE_LIVE_API };
}
