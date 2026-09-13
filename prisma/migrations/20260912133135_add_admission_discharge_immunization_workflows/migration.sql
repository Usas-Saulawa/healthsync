-- CreateEnum
CREATE TYPE "AdmissionRequestStatus" AS ENUM ('REQUESTED', 'PENDING_APPROVAL', 'APPROVED', 'DECLINED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AdmissionPriority" AS ENUM ('ROUTINE', 'URGENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "BedType" AS ENUM ('STANDARD', 'ICU', 'SEMI_PRIVATE', 'PRIVATE');

-- CreateEnum
CREATE TYPE "TransferRequestStatus" AS ENUM ('REQUESTED', 'PENDING_APPROVAL', 'APPROVED', 'DECLINED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReferralStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'DECLINED', 'NEEDS_INFORMATION', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReferralUrgency" AS ENUM ('ROUTINE', 'URGENT', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "DischargeType" AS ENUM ('HOME', 'TRANSFER', 'FACILITY', 'DECEASED', 'OTHER');

-- CreateEnum
CREATE TYPE "ImmunizationStatus" AS ENUM ('ADMINISTERED', 'INVALIDATED');

-- CreateTable
CREATE TABLE "AdmissionRequest" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "admittingProviderId" TEXT,
    "referringProviderId" TEXT,
    "preferredDepartmentId" TEXT,
    "admissionType" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL,
    "diagnosisName" TEXT,
    "icd10Code" TEXT,
    "reason" TEXT NOT NULL,
    "priority" "AdmissionPriority" NOT NULL DEFAULT 'ROUTINE',
    "preferredBedType" "BedType" NOT NULL DEFAULT 'STANDARD',
    "specialRequirements" TEXT,
    "status" "AdmissionRequestStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "decisionActorId" TEXT,
    "decidedAt" TIMESTAMP(3),
    "decisionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdmissionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferRequest" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "currentWardId" TEXT,
    "currentBedId" TEXT,
    "destinationDepartmentId" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "transferSummary" TEXT,
    "specialRequirements" TEXT,
    "preferredBedType" "BedType" NOT NULL DEFAULT 'STANDARD',
    "status" "TransferRequestStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "decisionActorId" TEXT,
    "decidedAt" TIMESTAMP(3),
    "decisionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransferRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "referringProviderId" TEXT NOT NULL,
    "destinationDepartmentId" TEXT,
    "preferredProviderId" TEXT,
    "facility" TEXT,
    "referralType" TEXT NOT NULL,
    "urgency" "ReferralUrgency" NOT NULL DEFAULT 'ROUTINE',
    "referralDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "relevantHistory" TEXT,
    "status" "ReferralStatus" NOT NULL DEFAULT 'REQUESTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralAttachment" (
    "id" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "labResultId" TEXT,
    "imagingStudyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discharge" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "admissionId" TEXT,
    "attendingProviderId" TEXT NOT NULL,
    "dischargedAt" TIMESTAMP(3) NOT NULL,
    "dischargeType" "DischargeType" NOT NULL,
    "primaryDiagnosis" TEXT NOT NULL,
    "primaryIcd10Code" TEXT,
    "secondaryDiagnoses" TEXT,
    "patientInstructions" TEXT NOT NULL,
    "activityRestrictions" TEXT,
    "dietaryInstructions" TEXT,
    "followUpAppointment" TIMESTAMP(3),
    "followUpProviderId" TEXT,
    "followUpDepartmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DischargePrescription" (
    "dischargeId" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,

    CONSTRAINT "DischargePrescription_pkey" PRIMARY KEY ("dischargeId","prescriptionId")
);

-- CreateTable
CREATE TABLE "Immunization" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "vaccineName" TEXT NOT NULL,
    "vaccineType" TEXT,
    "manufacturer" TEXT,
    "ndc" TEXT,
    "doseNumber" INTEGER NOT NULL,
    "dateAdministered" TIMESTAMP(3) NOT NULL,
    "administeredById" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "administrationSite" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "visDate" TIMESTAMP(3),
    "visGivenDate" TIMESTAMP(3),
    "notes" TEXT,
    "adverseReaction" TEXT,
    "status" "ImmunizationStatus" NOT NULL DEFAULT 'ADMINISTERED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Immunization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdmissionRequest_patientId_createdAt_idx" ON "AdmissionRequest"("patientId", "createdAt");

-- CreateIndex
CREATE INDEX "AdmissionRequest_hospitalId_status_idx" ON "AdmissionRequest"("hospitalId", "status");

-- CreateIndex
CREATE INDEX "TransferRequest_patientId_createdAt_idx" ON "TransferRequest"("patientId", "createdAt");

-- CreateIndex
CREATE INDEX "TransferRequest_hospitalId_status_idx" ON "TransferRequest"("hospitalId", "status");

-- CreateIndex
CREATE INDEX "Referral_patientId_referralDate_idx" ON "Referral"("patientId", "referralDate");

-- CreateIndex
CREATE INDEX "Referral_hospitalId_status_idx" ON "Referral"("hospitalId", "status");

-- CreateIndex
CREATE INDEX "ReferralAttachment_referralId_idx" ON "ReferralAttachment"("referralId");

-- CreateIndex
CREATE INDEX "Discharge_patientId_dischargedAt_idx" ON "Discharge"("patientId", "dischargedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Discharge_admissionId_key" ON "Discharge"("admissionId");

-- CreateIndex
CREATE INDEX "Immunization_patientId_dateAdministered_idx" ON "Immunization"("patientId", "dateAdministered");

-- CreateIndex
CREATE INDEX "Immunization_hospitalId_status_idx" ON "Immunization"("hospitalId", "status");

-- CreateIndex
CREATE INDEX "Immunization_vaccineName_idx" ON "Immunization"("vaccineName");

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_admittingProviderId_fkey" FOREIGN KEY ("admittingProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_referringProviderId_fkey" FOREIGN KEY ("referringProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_preferredDepartmentId_fkey" FOREIGN KEY ("preferredDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionRequest" ADD CONSTRAINT "AdmissionRequest_decisionActorId_fkey" FOREIGN KEY ("decisionActorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_currentWardId_fkey" FOREIGN KEY ("currentWardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_currentBedId_fkey" FOREIGN KEY ("currentBedId") REFERENCES "Bed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_destinationDepartmentId_fkey" FOREIGN KEY ("destinationDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferRequest" ADD CONSTRAINT "TransferRequest_decisionActorId_fkey" FOREIGN KEY ("decisionActorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referringProviderId_fkey" FOREIGN KEY ("referringProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_destinationDepartmentId_fkey" FOREIGN KEY ("destinationDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_preferredProviderId_fkey" FOREIGN KEY ("preferredProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralAttachment" ADD CONSTRAINT "ReferralAttachment_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralAttachment" ADD CONSTRAINT "ReferralAttachment_labResultId_fkey" FOREIGN KEY ("labResultId") REFERENCES "LabResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralAttachment" ADD CONSTRAINT "ReferralAttachment_imagingStudyId_fkey" FOREIGN KEY ("imagingStudyId") REFERENCES "ImagingStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_admissionId_fkey" FOREIGN KEY ("admissionId") REFERENCES "PatientAdmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_attendingProviderId_fkey" FOREIGN KEY ("attendingProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_followUpProviderId_fkey" FOREIGN KEY ("followUpProviderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discharge" ADD CONSTRAINT "Discharge_followUpDepartmentId_fkey" FOREIGN KEY ("followUpDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DischargePrescription" ADD CONSTRAINT "DischargePrescription_dischargeId_fkey" FOREIGN KEY ("dischargeId") REFERENCES "Discharge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DischargePrescription" ADD CONSTRAINT "DischargePrescription_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immunization" ADD CONSTRAINT "Immunization_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immunization" ADD CONSTRAINT "Immunization_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immunization" ADD CONSTRAINT "Immunization_administeredById_fkey" FOREIGN KEY ("administeredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
