import { prisma } from "@/lib/prisma";

import { generateStaffId } from "@/lib/auth/staff-id";

async function main() {
  const users = await prisma.user.findMany({
    where: {
      staffId: null,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  console.log(`Found ${users.length} users without staff IDs.`);

  for (const user of users) {
    const staffId = await generateStaffId(user.role);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        staffId,
      },
    });

    console.log(`${user.email} → ${staffId}`);
  }

  console.log("Staff ID backfill completed.");
}

main()
  .catch((error) => {
    console.error("Staff ID backfill failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
