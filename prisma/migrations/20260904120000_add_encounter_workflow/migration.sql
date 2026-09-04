-- CreateEnum
CREATE TYPE "FollowUpPriority" AS ENUM ('ROUTINE', 'URGENT', 'ASAP');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('LABORATORY', 'DIAGNOSTIC', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('ROUTINE', 'URGENT', 'STAT', 'ASAP');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('REQUESTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterEnum
ALTER TYPE "EncounterStatus" ADD VALUE 'LOCKED';

-- AlterTable
ALTER TABLE "Encounter"
ADD COLUMN "chiefComplaint" TEXT,
ADD COLUMN "objective" TEXT,
ADD COLUMN "subjective" TEXT,
ADD COLUMN "assessmentPlan" TEXT,
ADD COLUMN "lockedAt" TIMESTAMP(3),
ADD COLUMN "lockedById" TEXT;

ALTER TABLE "FollowUp"
ADD COLUMN "encounterId" TEXT,
ADD COLUMN "departmentId" TEXT,
ADD COLUMN "type" TEXT,
ADD COLUMN "priority" "FollowUpPriority" NOT NULL DEFAULT 'ROUTINE',
ADD COLUMN "specialInstructions" TEXT;

ALTER TABLE "Prescription"
ADD COLUMN "duration" INTEGER,
ADD COLUMN "durationUnit" TEXT,
ADD COLUMN "quantity" INTEGER,
ADD COLUMN "refills" INTEGER;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "orderedById" TEXT NOT NULL,
    "type" "OrderType" NOT NULL DEFAULT 'LABORATORY',
    "name" TEXT NOT NULL,
    "priority" "OrderPriority" NOT NULL DEFAULT 'ROUTINE',
    "indication" TEXT,
    "instructions" TEXT,
    "frequency" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT 'REQUESTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NurseNote" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "NurseNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Encounter_status_idx" ON "Encounter"("status");
CREATE INDEX "Encounter_lockedById_idx" ON "Encounter"("lockedById");
CREATE INDEX "FollowUp_encounterId_idx" ON "FollowUp"("encounterId");
CREATE INDEX "FollowUp_departmentId_idx" ON "FollowUp"("departmentId");
CREATE INDEX "Order_patientId_idx" ON "Order"("patientId");
CREATE INDEX "Order_encounterId_idx" ON "Order"("encounterId");
CREATE INDEX "Order_hospitalId_idx" ON "Order"("hospitalId");
CREATE INDEX "Order_orderedById_idx" ON "Order"("orderedById");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "NurseNote_patientId_idx" ON "NurseNote"("patientId");
CREATE INDEX "NurseNote_encounterId_idx" ON "NurseNote"("encounterId");
CREATE INDEX "NurseNote_hospitalId_idx" ON "NurseNote"("hospitalId");
CREATE INDEX "NurseNote_authorId_idx" ON "NurseNote"("authorId");
CREATE INDEX "NurseNote_createdAt_idx" ON "NurseNote"("createdAt");

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_lockedById_fkey" FOREIGN KEY ("lockedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_prescribedBy_fkey" FOREIGN KEY ("prescribedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderedById_fkey" FOREIGN KEY ("orderedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NurseNote" ADD CONSTRAINT "NurseNote_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NurseNote" ADD CONSTRAINT "NurseNote_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NurseNote" ADD CONSTRAINT "NurseNote_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NurseNote" ADD CONSTRAINT "NurseNote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
