import type { User } from "@/generated/prisma/client";

type EncounterOwner = {
  doctorId: string;
  status: string;
  lockedAt: Date | null;
};

export function canManageEncounter(user: User, encounter: EncounterOwner) {
  return user.role === "DOCTOR" && encounter.doctorId === user.id;
}

export function canCreateEncounter(user: User) {
  return user.role === "DOCTOR";
}

export function canWriteNurseNote(user: User) {
  return user.role === "NURSE";
}
