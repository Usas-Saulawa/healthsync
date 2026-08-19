// db/offlineDB.ts
import Dexie, { type Table } from "dexie";

// Define the interface for cached doctor sessions or profiles
export interface CachedUser {
  id?: number;
  email: string;
  token: string;
  lastLogin: string;
}

export class HealthcareOfflineDB extends Dexie {
  users!: Table<CachedUser, number>;

  constructor() {
    super("HealthcareOfflineDB");

    // Define database schema and versions
    this.version(1).stores({
      users: "++id, email, token", // Indexed fields
    });
  }
}

// Export a singleton instance of the database
export const db = new HealthcareOfflineDB();
