// db/offlineDB.ts
import Dexie, { type Table } from "dexie";
import type {
  DashboardMetrics,
  PatientListItem,
  FollowUpItem,
} from "@/lib/validations/dashboard";

// Define the interface for cached doctor sessions or profiles
export interface CachedUser {
  id?: number;
  email: string;
  token: string;
  lastLogin: string;
}

// Wrapper interface for dashboard cache with a primary key for Dexie
export interface CachedDashboardMetrics extends DashboardMetrics {
  id: string; // e.g., "main_metrics"
  updatedAt: string;
}

export interface CachedPatientItem extends PatientListItem {
  localId?: number; // Dexie auto-incremented key
}

export interface CachedFollowUpItem extends FollowUpItem {
  localId?: number; // Dexie auto-incremented key
}

export class HealthcareOfflineDB extends Dexie {
  users!: Table<CachedUser, number>;
  dashboardMetrics!: Table<CachedDashboardMetrics, string>;
  patients!: Table<CachedPatientItem, number>;
  followUps!: Table<CachedFollowUpItem, number>;

  constructor() {
    super("HealthcareOfflineDB");

    // Define database schema and versions
    this.version(1).stores({
      users: "++id, email, token", // Indexed fields
    });

    // Version 2: Add offline dashboard caching stores
    this.version(2).stores({
      users: "++id, email, token",
      dashboardMetrics: "id", // Primary key: "id"
      patients: "++localId, id, hospNo, status", // Auto-increment + indexed fields
      followUps: "++localId, id, status", // Auto-increment + indexed fields
    });
  }
}

// Export a singleton instance of the database
export const db = new HealthcareOfflineDB();
