-- AlterTable
ALTER TABLE "Vital"
ADD COLUMN "respiratoryRate" INTEGER,
ADD COLUMN "recordedById" TEXT;

ALTER TABLE "NurseNote"
ADD COLUMN "vitalId" TEXT;

-- CreateIndex
CREATE INDEX "Vital_recordedById_idx" ON "Vital"("recordedById");
CREATE INDEX "NurseNote_vitalId_idx" ON "NurseNote"("vitalId");

-- AddForeignKey
ALTER TABLE "Vital" ADD CONSTRAINT "Vital_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "NurseNote" ADD CONSTRAINT "NurseNote_vitalId_fkey" FOREIGN KEY ("vitalId") REFERENCES "Vital"("id") ON DELETE SET NULL ON UPDATE CASCADE;
