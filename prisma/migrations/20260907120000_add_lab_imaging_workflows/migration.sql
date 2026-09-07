ALTER TABLE "Order"
ADD COLUMN "specimenType" TEXT,
ADD COLUMN "fastingRequired" BOOLEAN,
ADD COLUMN "bodyPart" TEXT,
ADD COLUMN "contrastRequired" BOOLEAN,
ADD COLUMN "sedationRequired" BOOLEAN;

ALTER TABLE "LabResult"
ADD COLUMN "hospitalId" TEXT,
ADD COLUMN "orderId" TEXT,
ADD COLUMN "acknowledgedAt" TIMESTAMP(3),
ADD COLUMN "acknowledgedById" TEXT;

CREATE TYPE "ImagingStatus" AS ENUM ('ORDERED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

UPDATE "LabResult" AS result
SET "hospitalId" = patient."hospitalId"
FROM "Patient" AS patient
WHERE result."patientId" = patient."id";

CREATE TABLE "ImagingStudy" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT,
    "hospitalId" TEXT NOT NULL,
    "orderId" TEXT,
    "studyType" TEXT NOT NULL,
    "modality" TEXT,
    "bodyPart" TEXT,
    "status" "ImagingStatus" NOT NULL DEFAULT 'ORDERED',
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "findings" TEXT,
    "impression" TEXT,
    "notes" TEXT,
    "acknowledgedAt" TIMESTAMP(3),
    "acknowledgedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ImagingStudy_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "LabResult_orderId_key" ON "LabResult"("orderId");
CREATE INDEX "LabResult_hospitalId_idx" ON "LabResult"("hospitalId");
CREATE INDEX "LabResult_acknowledgedById_idx" ON "LabResult"("acknowledgedById");
CREATE UNIQUE INDEX "ImagingStudy_orderId_key" ON "ImagingStudy"("orderId");
CREATE INDEX "ImagingStudy_patientId_idx" ON "ImagingStudy"("patientId");
CREATE INDEX "ImagingStudy_hospitalId_idx" ON "ImagingStudy"("hospitalId");
CREATE INDEX "ImagingStudy_orderedAt_idx" ON "ImagingStudy"("orderedAt");
CREATE INDEX "ImagingStudy_studyType_idx" ON "ImagingStudy"("studyType");
CREATE INDEX "ImagingStudy_modality_idx" ON "ImagingStudy"("modality");
CREATE INDEX "ImagingStudy_status_idx" ON "ImagingStudy"("status");

ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ImagingStudy" ADD CONSTRAINT "ImagingStudy_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;