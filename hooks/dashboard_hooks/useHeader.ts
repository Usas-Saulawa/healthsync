// hooks/dashboard_hooks/useHeader.ts
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { db } from "@/db/offlineDB";
import { decryptData } from "@/utils/encryption";

export function useHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [doctorEmail, setDoctorEmail] = useState("dr.bashir@healthcare.com"); // Fallback mock

  useEffect(() => {
    async function loadUserSession() {
      try {
        const users = await db.users.toArray();
        if (users.length > 0 && users[0].email) {
          const decryptedEmail = await decryptData(users[0].email);
          if (decryptedEmail) {
            setDoctorEmail(decryptedEmail);
          }
        }
      } catch (error) {
        console.error("Failed to load local doctor session for header:", error);
      }
    }

    loadUserSession();
  }, []);

  // Format email to a clean display name if needed (e.g. dr.bashir@healthcare.com -> Dr. Bashir)
  const formatDoctorName = (email: string) => {
    const namePart = email.split("@")[0].replace("dr.", "Dr. ");
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Patient", path: "/dashboard/patients" },
    { name: "Tools", path: "/dashboard/tools" },
  ];

  return {
    doctorEmail,
    doctorName: formatDoctorName(doctorEmail),
    currentPath: pathname,
    router,
    navItems,
  };
}
