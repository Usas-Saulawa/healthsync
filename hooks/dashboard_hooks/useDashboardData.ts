// hooks/dashboard_hooks/useDashboardData.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/offlineDB";
import {
  mockDashboardMetrics,
  mockPatientsList,
  mockFollowUps,
} from "@/mock/mockDashboardData";
import type {
  DashboardMetrics,
  PatientListItem,
  FollowUpItem,
} from "@/lib/validations/dashboard";

// Toggle flag: Set to true when your backend team ships the live dashboard endpoint
const USE_LIVE_API = false;
const LIVE_API_ENDPOINT = "/api/dashboard"; // Example endpoint path

interface DashboardDataResponse {
  metrics: DashboardMetrics;
  patients: PatientListItem[];
  followUps: FollowUpItem[];
}

/**
 * Fetches dashboard data following an offline-first strategy:
 * 1. Attempts to load from IndexedDB (Dexie) instantly.
 * 2. If USE_LIVE_API is true, attempts a network fetch.
 * 3. If live API fails or is disabled (USE_LIVE_API = false), gracefully falls back to mock data.
 * 4. Background syncs fresh data back to Dexie.
 */
async function fetchDashboardData(): Promise<DashboardDataResponse> {
  // Step 1: Check local IndexedDB cache first for offline capability
  try {
    const cachedMetrics = await db.dashboardMetrics.get("main_metrics");
    const cachedPatients = await db.patients.toArray();

    if (cachedMetrics && cachedPatients.length > 0) {
      console.log("📦 Loaded dashboard data from IndexedDB cache.");
    }
  } catch (err) {
    console.warn("⚠️ IndexedDB read warning:", err);
  }

  // Step 2: Handle Live API vs Mock Data toggle
  if (USE_LIVE_API) {
    try {
      const response = await fetch(LIVE_API_ENDPOINT);
      if (!response.ok) throw new Error("Network response was not ok");
      const liveData: DashboardDataResponse = await response.json();

      // Background persistence: write fresh live data back to Dexie
      await db.dashboardMetrics.put({
        ...liveData.metrics,
        id: "main_metrics",
        updatedAt: new Date().toISOString(),
      });
      // Clear and re-seed offline tables with fresh live data
      await db.patients.clear();
      await db.patients.bulkAdd(liveData.patients);
      await db.followUps.clear();
      await db.followUps.bulkAdd(liveData.followUps);

      return liveData;
    } catch (error) {
      console.warn(
        "⚠️ Live API fetch failed. Falling back to local/mock data...",
        error,
      );
    }
  }

  // Step 3: Fallback configuration (Mock Data + Dexie sync)
  const fallbackData: DashboardDataResponse = {
    metrics: mockDashboardMetrics,
    patients: mockPatientsList,
    followUps: mockFollowUps,
  };

  // Seed fallback data into Dexie on first load so offline mode is always populated
  try {
    await db.dashboardMetrics.put({
      ...fallbackData.metrics,
      id: "main_metrics",
      updatedAt: new Date().toISOString(),
    });
    const existingPatientsCount = await db.patients.count();
    if (existingPatientsCount === 0) {
      await db.patients.bulkAdd(fallbackData.patients);
    }
    const existingFollowUpsCount = await db.followUps.count();
    if (existingFollowUpsCount === 0) {
      await db.followUps.bulkAdd(fallbackData.followUps);
    }
  } catch (err) {
    console.warn("⚠️ Dexie fallback seeding warning:", err);
  }

  return fallbackData;
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-data", USE_LIVE_API],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
