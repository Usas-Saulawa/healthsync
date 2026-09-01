-- CreateEnum
CREATE TYPE "AllergyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RESOLVED');

-- CreateEnum
CREATE TYPE "AllergySeverity" AS ENUM ('MILD', 'MODERATE', 'SEVERE', 'CRITICAL');

-- CreateEnum
CREATE TYPE "PrescriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DISCONTINUED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "LabTestType" AS ENUM ('HBA1C', 'GLUCOSE', 'BLOOD_PRESSURE', 'CHOLESTEROL', 'CBC', 'METABOLIC_PANEL', 'LIVER_FUNCTION', 'KIDNEY_FUNCTION', 'URINALYSIS', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('LAB_REPORT', 'IMAGING_REPORT', 'DISCHARGE_SUMMARY', 'OPERATIVE_REPORT', 'MEDICAL_RECORD', 'PRESCRIPTION', 'CONSULTATION_NOTE', 'OTHER');

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "substance" TEXT NOT NULL,
    "reaction" TEXT,
    "severity" "AllergySeverity" NOT NULL DEFAULT 'MODERATE',
    "status" "AllergyStatus" NOT NULL DEFAULT 'ACTIVE',
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT,
    "diagnosisId" TEXT,
    "medicationName" TEXT NOT NULL,
    "dosage" TEXT,
    "frequency" TEXT,
    "route" TEXT,
    "status" "PrescriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "prescribedBy" TEXT,
    "reason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabResult" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT,
    "testType" "LabTestType" NOT NULL,
    "testName" TEXT NOT NULL,
    "value" TEXT,
    "valueNumeric" DOUBLE PRECISION,
    "unit" TEXT,
    "referenceRange" TEXT,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "performedAt" TIMESTAMP(3) NOT NULL,
    "resultedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "encounterId" TEXT,
    "fileName" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL DEFAULT 'OTHER',
    "description" TEXT,
    "url" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Allergy_patientId_idx" ON "Allergy"("patientId");

-- CreateIndex
CREATE INDEX "Allergy_status_idx" ON "Allergy"("status");

-- CreateIndex
CREATE INDEX "Allergy_severity_idx" ON "Allergy"("severity");

-- CreateIndex
CREATE INDEX "Allergy_recordedAt_idx" ON "Allergy"("recordedAt");

-- CreateIndex
CREATE INDEX "Prescription_patientId_idx" ON "Prescription"("patientId");

-- CreateIndex
CREATE INDEX "Prescription_encounterId_idx" ON "Prescription"("encounterId");

-- CreateIndex
CREATE INDEX "Prescription_diagnosisId_idx" ON "Prescription"("diagnosisId");

-- CreateIndex
CREATE INDEX "Prescription_status_idx" ON "Prescription"("status");

-- CreateIndex
CREATE INDEX "Prescription_startDate_idx" ON "Prescription"("startDate");

-- CreateIndex
CREATE INDEX "Prescription_medicationName_idx" ON "Prescription"("medicationName");

-- CreateIndex
CREATE INDEX "LabResult_patientId_idx" ON "LabResult"("patientId");

-- CreateIndex
CREATE INDEX "LabResult_encounterId_idx" ON "LabResult"("encounterId");

-- CreateIndex
CREATE INDEX "LabResult_testType_idx" ON "LabResult"("testType");

-- CreateIndex
CREATE INDEX "LabResult_performedAt_idx" ON "LabResult"("performedAt");

-- CreateIndex
CREATE INDEX "LabResult_testName_idx" ON "LabResult"("testName");

-- CreateIndex
CREATE INDEX "Document_patientId_idx" ON "Document"("patientId");

-- CreateIndex
CREATE INDEX "Document_encounterId_idx" ON "Document"("encounterId");

-- CreateIndex
CREATE INDEX "Document_documentType_idx" ON "Document"("documentType");

-- CreateIndex
CREATE INDEX "Document_uploadedAt_idx" ON "Document"("uploadedAt");

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
