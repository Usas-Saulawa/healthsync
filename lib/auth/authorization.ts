import type { UserRole } from "@/generated/prisma/client";

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}

export function requireRole(userRole: UserRole, allowedRoles: UserRole[]) {
  if (!hasRole(userRole, allowedRoles)) {
    throw new Error("FORBIDDEN");
  }
}
