-- CreateEnum
CREATE TYPE "DiagnosisSeverity" AS ENUM ('MILD', 'MODERATE', 'SEVERE', 'CRITICAL');

-- AlterEnum
ALTER TYPE "DiagnosisOnsetType" ADD VALUE 'SUBACUTE';

-- DropIndex
DROP INDEX "Diagnosis_bodySystem_idx";

-- AlterTable
ALTER TABLE "Diagnosis" ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "severity" "DiagnosisSeverity";
