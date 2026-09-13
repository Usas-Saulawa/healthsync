import { randomInt } from "crypto";

import { prisma } from "@/lib/prisma";

const ROLE_PREFIX = {
  ADMIN: "ADM",
  DOCTOR: "DOC",
  NURSE: "NUR",
  LAB_TECHNICIAN: "LAB",
  PHARMACIST: "PHA",
} as const;

type StaffRole = keyof typeof ROLE_PREFIX;

export async function generateStaffId(role: StaffRole) {
  const prefix = ROLE_PREFIX[role];

  for (let attempt = 0; attempt < 20; attempt++) {
    const number = randomInt(10000, 100000);
    const staffId = `${prefix}-${number}`;

    const existingUser = await prisma.user.findUnique({
      where: {
        staffId,
      },
      select: {
        id: true,
      },
    });

    if (!existingUser) {
      return staffId;
    }
  }

  throw new Error("Unable to generate a unique staff ID");
}
