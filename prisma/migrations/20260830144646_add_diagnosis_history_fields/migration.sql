-- CreateEnum
CREATE TYPE "DiagnosisStatus" AS ENUM ('ACTIVE', 'RESOLVED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DiagnosisOnsetType" AS ENUM ('ACUTE', 'GRADUAL', 'CHRONIC', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Diagnosis" ADD COLUMN     "bodySystem" TEXT,
ADD COLUMN     "onsetType" "DiagnosisOnsetType",
ADD COLUMN     "status" "DiagnosisStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Diagnosis_status_idx" ON "Diagnosis"("status");

-- CreateIndex
CREATE INDEX "Diagnosis_bodySystem_idx" ON "Diagnosis"("bodySystem");
