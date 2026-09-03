import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import argon2 from "argon2";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await argon2.hash("ChangeMe123!");

  const hospital = await prisma.hospital.create({
    data: {
      name: "HealthSync Demo Hospital",
      code: "DEMO-001",
    },
  });

  const department = await prisma.department.create({
    data: {
      hospitalId: hospital.id,
      name: "Administration",
      code: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      hospitalId: hospital.id,
      departmentId: department.id,
      email: "aliyubinahmad2022@gmail.com",
      passwordHash,
      firstName: "System",
      lastName: "Administrator",
      role: "ADMIN",
    },
  });

  console.log("Development user created:", user.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });