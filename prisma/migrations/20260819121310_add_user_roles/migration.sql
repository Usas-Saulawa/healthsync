-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DOCTOR', 'NURSE', 'LAB_TECHNICIAN', 'PHARMACIST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'NURSE';

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
